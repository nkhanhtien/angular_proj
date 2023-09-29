import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnControlType } from '../../enums/control-types.enum';
import { ControlBase } from '../../models/control-base-model';

@Component({
  selector: 'app-ctr-template-control',
  templateUrl: './template-control.component.html',
})
export class TemplateControlComponent {
  constructor() {}

  @Input() control: ControlBase<any>;
  @Input() form: FormGroup;

  ControlType = EnControlType;
  get isValid() {
    return this.form.controls[this.control.key].valid;
  }

  get getFormControl() {
    return this.form.get(this.control.key) as FormControl;
  }
}
