import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EnControlType } from '../../app.core.shared.enums';
import { VerHorListControlBase } from '../../app.core.shared.models';

@Component({
  selector: 'app-ctr-vertical-horizontal-list',
  templateUrl: './vertical-horizontal-list.component.html',
})
export class VerticalHorizontalListComponent
  implements OnInit, AfterContentChecked
{
  @Input() control: VerHorListControlBase;
  @Input() form: FormGroup;
  ControlType = EnControlType;
  isRequired = false;

  constructor(protected injector: Injector, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.control.disabled) {
      this.control.children?.forEach(
        (childControl) => (childControl.disabled = this.control.disabled)
      );
    }
  }

  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.isRequired = this.validator();
    }, 100);

    //your code to update the model
    this.cdr.detectChanges();
  }

  validator() {
    if (
      this !== undefined &&
      this.control !== undefined &&
      this.control.children !== undefined
    ) {
      return (
        this.control.children?.findIndex((childControl) => {
          const validator = childControl.component?.formControl?.validator
            ? childControl.component?.formControl.validator(
                {} as AbstractControl
              )
            : '';
          return validator && validator['required'];
        }) !== -1
      );
    } else return false;
  }

  getFormControl(childControl) {
    return this.form.get(childControl.key) as FormControl;
  }
}
