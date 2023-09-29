import {
  AfterContentChecked,
  Component,
  forwardRef,
  Injector,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextBoxPasswordControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

export const textBoxValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextBoxPasswordControlComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-text-box-password',
  styleUrls: ['./text-box-password.component.scss'],
  templateUrl: './text-box-password.component.html',
  providers: [textBoxValueAccessor],
})
export class TextBoxPasswordControlComponent
  extends AppBaseControlBaseComponent
  implements AfterContentChecked
{
  override control: TextBoxPasswordControlBase;
  fieldTextType = false;
  isFocused = false;
  isInvalid = false;
  constructor(protected injector: Injector) {
    super(injector);
  }

  override ngAfterContentChecked() {
    this.isInvalid = this.formControl?.invalid && this.formControl?.touched;

    //your code to update the model
    this.cdr.detectChanges();
  }

  focus() {
    this.isFocused = true;
  }

  blurEvent() {
    this.formControl?.setValue(this.value);
    this.formControl?.markAsTouched();
    this.formControl?.updateValueAndValidity({ emitEvent: true });
    this.isFocused = false;
  }

  handleKeyPress(event: any) {
    if (this.control['type'] === 'number') {
      const seperator = '^([0-9])';
      const maskSeperator = new RegExp(seperator, 'g');
      let result = maskSeperator.test(event.key);
      return result;
    } else return true;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
