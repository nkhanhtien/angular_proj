import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Injector,
  Input,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormCategory } from '../interfaces/form-interface';
import { ControlBase } from '../models/control-base-model';
import { DefineFormService } from '../services/define-form.service';
import { FormControlBusEvents } from '../services/form-bus.service';

@Component({
  selector: 'app-form-base-component',
  template: '',
})
export class FormBaseComponent
  implements
    OnInit,
    DoCheck,
    AfterViewInit,
    AfterContentInit,
    AfterContentChecked,
    OnDestroy
{
  @Input() controls: ControlBase<any>[] = [];
  @Input() validatorFn: any;
  @Input()
  asyncValidatorFn: any[];
  @Input() FormCategories: FormCategory[] = [];

  public form: FormGroup;

  //#region Services
  private fservice: DefineFormService;
  private fcservice: FormControlBusEvents;
  //#endregion

  //#region Events for Form
  @Output() OnFormOnChanges = new EventEmitter<any>();
  @Output() OnFormOnInit = new EventEmitter<any>();
  @Output() OnFormAfterViewInit = new EventEmitter<any>();
  @Output() OnFormAfterContentInit = new EventEmitter<any>();
  @Output() OnFormAfterContentChecked = new EventEmitter<any>();
  @Output() OnFormOnDestroy = new EventEmitter<any>();
  //#endregion

  //#region Events for Form Controls
  @Output() OnFormControlOnChanges = new EventEmitter<any>();
  @Output() OnFormControlOnInit = new EventEmitter<any>();
  @Output() OnFormControlAfterViewInit = new EventEmitter<any>();
  @Output() OnFormControlAfterContentInit = new EventEmitter<any>();
  @Output() OnFormControlAfterContentChecked = new EventEmitter<any>();
  @Output() OnFormControlOnDestroy = new EventEmitter<any>();
  @Output() OnFormControlStatusChanges = new EventEmitter<any>();

  SubscriptioinOnFormControlOnChanges: Subscription;
  SubscriptioinOnFormControlOnInit: Subscription;
  SubscriptioinOnFormControlAfterViewInit: Subscription;
  SubscriptioinOnFormControlAfterContentInit: Subscription;
  SubscriptioinOnFormControlAfterContentChecked: Subscription;
  SubscriptioinOnFormControlOnDestroy: Subscription;
  SubscriptioinOnFormControlOnStatusChanges: Subscription;
  //#endregion
  private differ: any;
  private differs: IterableDiffers | null;
  private cdr: ChangeDetectorRef;

  constructor(injector: Injector) {
    this.fservice = injector.get(DefineFormService);
    this.fcservice = injector.get(FormControlBusEvents);
    this.cdr = injector.get(ChangeDetectorRef);
    this.registryFormControlEvents();

    this.differs = injector.get(IterableDiffers, null);
    if (this.differs !== null) {
      this.differ = this.differs.find([]).create();
    }
  }

  ngOnInit() {
    if (this.controls && this.controls.length > 0) {
      this.form = this.fservice.createFormGroup(
        this.controls,
        this.validatorFn,
        this.asyncValidatorFn
      );

      if (this.FormCategories && this.FormCategories.length > 0) {
        this.FormCategories.forEach((d) => {
          d.controls = this.controls.filter(
            (c) => c.category === d.categoryKey
          );
        });
      }
    } else {
      this.form = new FormGroup({});
    }
    this.OnFormOnInit.emit(this.form);
  }

  ngDoCheck(): void {
    const change = this.differ.diff(this.controls);
    if (change) {
      this.form = this.fservice.createFormGroup(
        this.controls,
        this.validatorFn,
        this.asyncValidatorFn
      );
      this.FormCategories.forEach((d) => {
        d.controls = this.controls.filter((c) => c.category === d.categoryKey);
      });
    }
    this.OnFormOnChanges.emit(this.form);
  }

  ngAfterViewInit() {
    this.OnFormAfterViewInit.emit(this.form);
    this.cdr.detectChanges();
  }

  ngAfterContentInit() {
    this.OnFormAfterContentInit.emit(this.form);

    //your code to update the model
    this.cdr.detectChanges();
  }

  ngAfterContentChecked() {
    this.OnFormAfterContentChecked.emit(this.form);

    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    // console.log("ngOnDestroy- unsubscribe SubscriptioinOnFormControl");
    this.SubscriptioinOnFormControlAfterContentChecked.unsubscribe();
    this.SubscriptioinOnFormControlAfterContentInit.unsubscribe();
    this.SubscriptioinOnFormControlAfterViewInit.unsubscribe();
    this.SubscriptioinOnFormControlOnChanges.unsubscribe();
    this.SubscriptioinOnFormControlOnDestroy.unsubscribe();
    this.SubscriptioinOnFormControlOnInit.unsubscribe();
    this.SubscriptioinOnFormControlOnStatusChanges.unsubscribe();

    this.OnFormOnDestroy.emit(this.form);
  }

  registryFormControlEvents() {
    this.SubscriptioinOnFormControlOnInit =
      this.fcservice.OnFormControlOnInit.subscribe((d) => {
        this.OnFormControlOnInit.emit(d);
      });

    this.SubscriptioinOnFormControlAfterViewInit =
      this.fcservice.OnFormControlAfterViewInit.subscribe((d) => {
        this.OnFormControlAfterViewInit.emit(d);
      });

    this.SubscriptioinOnFormControlOnChanges =
      this.fcservice.OnFormControlOnChanges.subscribe((d) => {
        this.OnFormControlOnChanges.emit(d);
      });

    this.SubscriptioinOnFormControlOnDestroy =
      this.fcservice.OnFormControlOnDestroy.subscribe((d) => {
        this.OnFormControlOnDestroy.emit(d);
      });

    this.SubscriptioinOnFormControlAfterContentInit =
      this.fcservice.OnFormControlAfterContentInit.subscribe((d) => {
        this.OnFormControlAfterContentInit.emit(d);
      });

    this.SubscriptioinOnFormControlAfterContentChecked =
      this.fcservice.OnFormControlAfterContentChecked.subscribe((d) => {
        this.OnFormAfterContentChecked.emit(d);
      });

    this.SubscriptioinOnFormControlOnStatusChanges =
      this.fcservice.OnFormControlStatusChanges.subscribe((d) => {
        this.OnFormControlStatusChanges.emit(d);
      });
  }
}
