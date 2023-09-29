import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonListControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

export const checkBoxListValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonListComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-radio-button-list',
  templateUrl: './radio-button-list.component.html',
  providers: [checkBoxListValueAccessor],
})
export class RadioButtonListComponent extends AppBaseControlBaseComponent {
  override control: RadioButtonListControlBase;

  constructor(injector: Injector) {
    super(injector);
  }

  OptionChanges() {}
}
