import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckBoxControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

export const checkBoxValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-check-box',
  templateUrl: './check-box.component.html',
  providers: [checkBoxValueAccessor],
})
export class CheckBoxComponent
  extends AppBaseControlBaseComponent
  implements OnInit
{
  override control: CheckBoxControlBase;
  constructor(protected injector: Injector) {
    super(injector);
  }
}
