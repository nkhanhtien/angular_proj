import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckBoxListControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

export const checkBoxListValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxListComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-check-box-list',
  templateUrl: './check-box-list.component.html',
  providers: [checkBoxListValueAccessor],
})
export class CheckBoxListComponent extends AppBaseControlBaseComponent {
  override control: CheckBoxListControlBase;
  constructor(injector: Injector) {
    super(injector);
  }

  OptionChanges(item: any) {
    if (this.control instanceof CheckBoxListControlBase) {
      this.value = this.control.items.filter((d) => d.value === true);
    }
  }
}
