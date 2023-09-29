import {
  AfterViewInit,
  AfterContentInit,
  AfterContentChecked,
  OnDestroy,
  Input,
  Injector,
  Component,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnControlType } from '../enums/control-types.enum';
import { EnServiceType } from '../enums/service-types.enum';
import { DynamicServiceCall } from '../helpers/dynamic-service-handle';
import { ControlBase } from '../models/control-base-model';
import {
  CheckBoxListControlBase,
  DropdownControlBase,
  DropdownMultipleSelectControlBase,
  RadioButtonListControlBase,
} from '../models/controls-model';
import { ServiceInfo } from '../models/services-model';
import { FormControlBusEvents } from '../services/form-bus.service';

@Component({
  selector: 'app-ctr-base-component',
  template: '',
})
export abstract class ControlBaseComponent
  implements
    OnInit,
    AfterViewInit,
    AfterContentInit,
    AfterContentChecked,
    OnChanges,
    OnDestroy
{
  @Input() public control: ControlBase<any>;
  @Input() public formControl: FormControl;

  private fcontrolbus: FormControlBusEvents;
  dynService: DynamicServiceCall;
  protected cdr: ChangeDetectorRef;

  constructor(injector: Injector) {
    this.fcontrolbus = injector.get(FormControlBusEvents);
    this.dynService = new DynamicServiceCall(injector);
    this.cdr = injector.get(ChangeDetectorRef);
  }
  ngOnInit() {
    this.control.component = this;
    this.fcontrolbus.OnFormControlOnInit.next(this.formControl);
    if (this.control.notifyChanges) {
      this.formControl?.statusChanges.subscribe(
        (success) => {
          this.fcontrolbus.OnFormControlStatusChanges.next(this);
        },
        null,
        null
      );
    }
  }
  ngOnChanges() {
    this.fcontrolbus.OnFormControlOnChanges.next(this.formControl);
  }
  ngAfterViewInit() {
    this.fcontrolbus.OnFormControlAfterViewInit.next(this.formControl);
    //your code to update the model
    this.cdr.detectChanges();
  }
  ngAfterContentInit() {
    this.fcontrolbus.OnFormControlAfterContentInit.next(this.formControl);
    //your code to update the model
    this.cdr.detectChanges();
  }
  ngAfterContentChecked() {
    this.fcontrolbus.OnFormControlAfterContentChecked.next(this.formControl);
    //your code to update the model
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    this.fcontrolbus.OnFormControlOnDestroy.next(this.formControl);
  }

  loadSourceFromService(sinfo: ServiceInfo, isNofityChange: boolean = false) {
    // Reset Items Of Dropdownlist without value.
    if (this.control instanceof DropdownControlBase) {
      this.control.items = [];
    }

    if (
      sinfo !== null &&
      (this.control.controlType === EnControlType.Dropdown ||
        this.control.controlType === EnControlType.DropdownMultipleSelect ||
        this.control.controlType === EnControlType.CheckBoxList ||
        this.control.controlType === EnControlType.RadioButtonList)
    ) {
      //console.log("%c Load From Service", 'background: #222; color: red; font-weight: bold;');
      let items = this.dynService.Invoke(sinfo).subscribe((response: any) => {
        if (this.control instanceof DropdownControlBase) {
          let items: any = [];
          if (response === null || response.Data === null) {
            console.log('Null Response');
            console.log(response);
            console.log(
              "%c Don't find data source for Dropdown",
              'background: #222; color: red; font-weight: bold;'
            );
            return;
          }
          response.Data.forEach((d: any) => {
            // foreach statement
            items.push({
              key: d[sinfo.dropdownMapping.key],
              value: d[sinfo.dropdownMapping.value],
            });
          });
          this.control.items = items;
        } else if (this.control instanceof CheckBoxListControlBase) {
          let items: any = [];
          if (response === null || response.Data === null) {
            console.log('Null Response');
            console.log(response);
            console.log(
              "%c Don't find data source for CheckBox List",
              'background: #222; color: red; font-weight: bold;'
            );
            return;
          }
          response.Data.forEach((d: any) => {
            // foreach statement
            items.push({
              key: d[sinfo.checkBoxListMapping.key],
              value: d[sinfo.checkBoxListMapping.value],
            });
          });
          this.control.items = items;
        } else if (this.control instanceof RadioButtonListControlBase) {
          let items: any = [];

          if (response === null || response.Data === null) {
            console.log('Null Response');
            console.log(response);
            console.log(
              "%c Don't find data source for RadioButton List",
              'background: #222; color: red; font-weight: bold;'
            );
            return;
          }
          response.Data.forEach((d: any) => {
            // foreach statement
            items.push({
              key: d[sinfo.radioListMapping.key],
              label: d[sinfo.radioListMapping.value],
            });
          });
          this.control.items = items;
        } else if (this.control instanceof DropdownMultipleSelectControlBase) {
          let items: any = [];
          if (response === null || response.Data === null) {
            console.log('Null Response');
            console.log(response);
            console.log(
              "%c Don't find data source for Dropdown Multiple Select",
              'background: #222; color: red; font-weight: bold;'
            );
            return;
          }
          response.Data.forEach((d: any) => {
            // foreach statement
            items.push({
              key: d[sinfo.dropdownMultipleSelectMapping.key],
              text: d[sinfo.dropdownMultipleSelectMapping.value],
            });
          });
          this.control.items = items;
        }

        if (isNofityChange) {
          this.fcontrolbus.OnFormControlStatusChanges.next(this);
        }
      });
    }
  }

  loadSourceFromServiceType(stype: EnServiceType, params: any) {
    if (
      this.control.services &&
      (this.control.controlType === EnControlType.Dropdown ||
        this.control.controlType === EnControlType.DropdownMultipleSelect ||
        this.control.controlType === EnControlType.CheckBoxList)
    ) {
      let autoService = this.control.services.filter(
        (d) => d.serviceType === stype
      );
      if (autoService) {
        let sinfo = autoService[0].value;
        sinfo.serviceParams = params;
        this.loadSourceFromService(sinfo);
      }
    }
  }

  loadSourceFromData(source: any) {}
}

/*
  Copyright 2017 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license
  */
