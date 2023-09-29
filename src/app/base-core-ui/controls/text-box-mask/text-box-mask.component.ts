import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextBoxMaskControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

export const textBoxValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextBoxMaskComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-text-box-mask',
  templateUrl: './text-box-mask.component.html',
  providers: [textBoxValueAccessor],
})
export class TextBoxMaskComponent extends AppBaseControlBaseComponent {
  override control: TextBoxMaskControlBase;
  constructor(protected injector: Injector) {
    super(injector);
  }

  blurEvent() {
    this.formControl?.setValue(this.value);
    this.formControl?.markAsTouched();
    this.formControl?.updateValueAndValidity({ emitEvent: true });
  }
}
