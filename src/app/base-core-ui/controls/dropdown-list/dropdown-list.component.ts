import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

export const dropDownValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownListComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  providers: [dropDownValueAccessor],
})
export class DropdownListComponent extends AppBaseControlBaseComponent {
  override control: DropdownControlBase;

  constructor(protected injector: Injector) {
    super(injector);
  }

  showPlaceHolder = true;

  onClick() {
    this.showPlaceHolder = false;
  }

  onBlur() {
    this.showPlaceHolder = true;
    this.formControl?.markAsTouched();
    this.showValidationErrors();
  }
}
