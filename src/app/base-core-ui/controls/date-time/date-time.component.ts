import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTimeControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

export const dateTimeValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-date-time',
  templateUrl: './date-time.component.html',
  providers: [dateTimeValueAccessor],
})
export class DateTimeComponent extends AppBaseControlBaseComponent {
  override control: DateTimeControlBase;

  constructor(protected injector: Injector) {
    super(injector);
  }

  blurEvent() {
    this.formControl?.setValue(this.value);
    this.formControl?.markAsTouched();
    this.formControl?.updateValueAndValidity({ emitEvent: true });
  }
}
