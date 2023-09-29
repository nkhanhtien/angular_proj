import { Injectable, Injector, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { EnControlType } from '../enums/control-types.enum';
import { EnServiceType } from '../enums/service-types.enum';
import { ControlBaseComponent } from './control-base.component';

/*eslint-disable */

const noop = () => {
  //console.log("TextBoxComponent change!");
};

@Injectable({
  providedIn: 'root',
})
export abstract class AppBaseControlBaseComponent
  extends ControlBaseComponent
  implements ControlValueAccessor, OnInit
{
  constructor(injector: Injector) {
    super(injector);
  }

  //#region of ControlValueAccessor
  InnerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.InnerValue;
  }

  set value(v: any) {
    if (v !== this.InnerValue) {
      this.InnerValue = v;
      this.onChangeCallback(v);
    }
    this.afterSetValue();
  }

  afterSetValue() {}

  writeValue(value: any) {
    if (value !== this.InnerValue) {
      this.InnerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  //#endregion
  override ngOnInit() {
    super.ngOnInit();

    if (
      this.control.autoLoad &&
      this.control.services &&
      (this.control.controlType === EnControlType.Dropdown ||
        this.control.controlType === EnControlType.CheckBoxList ||
        this.control.controlType === EnControlType.RadioButtonList)
    ) {
      let autoService = this.control.services.filter(
        (d) => d.serviceType === EnServiceType.autoLoad
      );
      if (autoService) {
        let sinfo = autoService[0].value;
        this.loadSourceFromService(sinfo, this.control.notifyChanges);
      }
    }

    if (!this.formControl) {
      return;
    }

    this.formControl.statusChanges.subscribe((success: any) => {
      this.onStatusChanged(this.value);
    });
  }

  public onStatusChanged(data?: any) {
    if (!this.formControl) {
      return;
    }
    this.showValidationErrors();
  }

  public showValidationErrors() {
    for (const field in this.formErrors) {
      this.formErrors[field] = [];
      if (
        this.formControl &&
        this.formControl.invalid &&
        (this.formControl.touched || this.formControl.dirty)
      ) {
        const messages = this.control.validationMessages;
        if (this.formControl.errors && messages !== undefined) {
          for (const key in this.formControl.errors) {
            this.formErrors[field].push(messages[key]);
            break; //Remove this line if you want to show multiple errors
          }
        }
      }
    }
  }

  get validator() {
    const validator = this.formControl?.validator
      ? this.formControl.validator({} as AbstractControl)
      : '';
    if (
      validator &&
      validator['required'] &&
      !this.control.hideTextHeader &&
      this.control.label
    ) {
      return true;
    } else return false;
  }

  formErrors: any = {
    errors: [],
  };
}
