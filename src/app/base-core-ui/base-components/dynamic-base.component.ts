import {
  NgModule,
  EventEmitter,
  Injector,
  SimpleChanges,
  SimpleChange,
  OnChanges,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonBaseService } from '../services/service-base.service';
import { Subject, takeUntil } from 'rxjs';
import { ComponentData } from '../app.core.shared.interfaces';

type UserOutputs = Record<string, (event: any) => void>;
type UserInputs = Record<string, any>;
@Component({
  selector: 'app-dynamic-component',
  template: `<div #dynamicComponentContainer></div>`,
})
export default class DynamicComponent implements OnInit, OnChanges, OnDestroy {
  currentComponent: any = null;
  private subscription = new Subject();
  @Input() outputs?: UserOutputs = {};
  @Input() inputs?: UserInputs = {};
  @Output() OnComponentActions = new EventEmitter<any>();

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  @Input() componentData: ComponentData;

  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: true,
  })
  dynamicComponentContainer: ViewContainerRef;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.createComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.componentData === null || this.componentData === undefined) {
      throw new Error(`cannot be undefined or null`);
    }

    if (this.currentComponent === null || this.currentComponent === undefined) {
      this.createComponent();
    }

    let componentChanges: Record<string, SimpleChange>;
    const shouldCreateNewComponent =
      changes['controlType']?.previousValue !==
        changes['controlType']?.currentValue ||
      changes['injector']?.previousValue !== changes['injector']?.currentValue;

    if (shouldCreateNewComponent) {
      this.destroyComponent();
      this.createComponent();
      componentChanges = this.makeComponentChanges(changes['inputs'], true);
    }
    componentChanges ??= this.makeComponentChanges(changes['inputs'], false);

    this.validateOutputs(this.outputs ?? {}, this.currentComponent?.instance);
    this.validateInputs(this.inputs ?? {});
    if (changes['inputs']) {
      this.bindInputs(this.inputs ?? {}, this.currentComponent?.instance);
    }
    if (changes['outputs']) {
      this.subscription.next(null); // to remove old subscription
      this.bindOutputs(this.outputs ?? {}, this.currentComponent?.instance);
    }
    if (
      this.currentComponent &&
      (this.currentComponent.instance as OnChanges).ngOnChanges
    ) {
      this.currentComponent.instance.ngOnChanges(componentChanges);
    }
  }

  ngOnDestroy(): void {
    this.destroyComponent();
    this.subscription.next(void 0);
    this.subscription.complete();
  }

  private makeComponentChanges(
    inputsChange: SimpleChange,
    firstChange: boolean
  ): Record<string, SimpleChange> {
    const previuosInputs = inputsChange?.previousValue ?? {};
    const currentInputs = inputsChange?.currentValue ?? {};
    return Object.keys(currentInputs).reduce((acc, inputName) => {
      const currentInputValue = currentInputs[inputName];
      const previuosInputValue = previuosInputs[inputName];
      if (currentInputValue !== previuosInputValue) {
        acc[inputName] = new SimpleChange(
          firstChange ? undefined : previuosInputValue,
          currentInputValue,
          firstChange
        );
      }
      return acc;
    }, {} as Record<string, SimpleChange>);
  }

  private createComponent() {
    if (
      !this.componentData ||
      this.componentData.componentType === null ||
      this.componentData.componentType === undefined
    ) {
      return;
    }

    if (
      this.componentData.inputs === null ||
      this.componentData.inputs === undefined
    ) {
      this.componentData.inputs = {};
    }

    if (
      this.componentData.outputs === null ||
      this.componentData.outputs === undefined
    ) {
      this.componentData.outputs = {};
    }

    let valueInputs = this.componentData.inputs;
    const injector = Injector.create({
      providers: [
        {
          provide: CommonBaseService,
          useValue: {
            valueInputs,
          },
        },
      ],
      parent: this.componentData.injector,
    });

    let component = this.viewContainerRef.createComponent(
      this.componentData.componentType,
      {
        injector: injector,
      }
    );

    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);

    // We can destroy the old component is we like by calling destroy
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    if (component.instance.OnComponentActions) {
      component.instance.OnComponentActions.subscribe((action) => {
        this.OnComponentActions.emit(action);
      });
    }

    this.currentComponent = component;
  }

  private bindOutputs(userOutputs: UserInputs, componentInstance: any) {
    if (this.componentData.outputs && componentInstance) {
      Object.keys(this.componentData.outputs).forEach((output: any) => {
        (componentInstance[output.propName] as EventEmitter<any>)
          .pipe(takeUntil(this.subscription))
          .subscribe((event) => {
            const handler = userOutputs[output.templateName];
            if (handler) {
              // in case the output has not been provided at all
              handler(event);
            }
          });
      });
    }
  }

  private bindInputs(userInputs: UserInputs, componentInstance: any) {
    if (this.componentData.outputs && componentInstance) {
      this.componentData.inputs.forEach((input: any) => {
        const inputValue = userInputs[input.templateName];
        componentInstance[input.propName] = inputValue;
      });
    }
  }

  private validateOutputs(userOutputs: UserOutputs, componentInstance: any) {
    if (this.componentData.outputs && componentInstance) {
      Object.keys(this.componentData.outputs).forEach((output: any) => {
        if (!(componentInstance[output] instanceof EventEmitter)) {
          throw new Error(`Output ${output} must be a typeof EventEmitter`);
        }
      });
    }

    const outputsKeys = Object.keys(userOutputs);
    outputsKeys.forEach((key) => {
      const componentHaveThatOutput = this.componentData.outputs.some(
        (output: any) => output.templateName === key
      );
      if (!componentHaveThatOutput) {
        throw new Error(
          `Output ${key} is not ${this.componentData.componentType.name} output.`
        );
      }
      if (!(userOutputs[key] instanceof Function)) {
        throw new Error(`Output ${key} must be a function`);
      }
    });
  }

  private validateInputs(userInputs: UserInputs) {
    const userInputsKeys = Object.keys(userInputs);
    userInputsKeys.forEach((userInputKey) => {
      const componentHaveThatInput = this.componentData.inputs.some(
        (componentInput: any) => componentInput.templateName === userInputKey
      );
      if (!componentHaveThatInput) {
        throw new Error(
          `Input ${userInputKey} is not ${this.componentData.componentType.name} input.`
        );
      }
    });
  }

  private destroyComponent() {
    this.currentComponent?.destroy();
    this.viewContainerRef.clear();
  }
}

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, BrowserAnimationsModule],
  declarations: [DynamicComponent],
  exports: [DynamicComponent],
  bootstrap: [DynamicComponent],
})
export class AppFormModule_DynamicComponent {}
