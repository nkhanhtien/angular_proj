import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ControlBase } from '../models/control-base-model';

@Injectable()
export class DefineFormService {
  constructor(private fb: FormBuilder) {}

  toFormGroup(controls: ControlBase<any>[]) {
    let group: any = {};
    controls
      .sort((a, b) => a.order - b.order)
      .forEach((control) => {
        group[control.key] = new FormControl(control.value || '', {
          validators: control.validators,
          asyncValidators: control.asyncValidators,
          updateOn: control.updateOn,
        });

        if (
          control.rowGroup &&
          control.children &&
          control.children.length > 0
        ) {
          control.children
            .sort((a, b) => a.order - b.order)
            .forEach((item) => {
              group[item.key] = new FormControl(item.value || '', {
                validators: item.validators,
                asyncValidators: item.asyncValidators,
                updateOn: control.updateOn,
              });
            });
        }

        //group[control.key] = new FormControl(control.value || '', control.validators, control.asyncValidators)
      });

    return new FormGroup(group);
  }

  createFormGroup(
    controls: ControlBase<any>[],
    validators?: any,
    asyncValidators?: any[]
  ) {
    if (controls && controls.length > 0) {
      let group: any = {};
      controls
        .sort((a, b) => a.order - b.order)
        .forEach((control) => {
          group[control.key] = new FormControl(control.value || '', {
            validators: control.validators,
            asyncValidators: control.asyncValidators,
            updateOn: control.updateOn,
          });

          if (
            control.rowGroup &&
            control.children &&
            control.children.length > 0
          ) {
            control.children
              .sort((a, b) => a.order - b.order)
              .forEach((item) => {
                group[item.key] = new FormControl(item.value || '', {
                  validators: item.validators,
                  asyncValidators: item.asyncValidators,
                  updateOn: control.updateOn,
                });
              });
          }
          //console.log(group[control.key]);
        });

      return this.fb.group(group, {
        validator: validators,
        asyncValidator: asyncValidators,
      });
    }
    return this.fb.group({
      name: [''],
      type: {},
    });
  }
}
