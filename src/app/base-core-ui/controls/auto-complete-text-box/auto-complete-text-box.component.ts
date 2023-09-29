import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';
import { AutoCompleteTextBoxControlBase } from '../../app.core.shared.models';

export const autoCompleteTextBoxValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoCompleteTextBoxComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-auto-complete-text-box',
  templateUrl: './auto-complete-text-box.component.html',
  providers: [autoCompleteTextBoxValueAccessor],
})
export class AutoCompleteTextBoxComponent
  extends AppBaseControlBaseComponent
  implements OnInit
{
  override control: AutoCompleteTextBoxControlBase;
  autoCompleteControl = new FormControl();
  filteredOptions: Observable<any[]>;
  textValue: any;

  constructor(protected injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.control['items'].forEach((option) => {
      if (option.key === this.control.value && option.key !== '') {
        this.textValue = {
          key: option.key,
          value: option.value,
        };
        this.value = option.key;
      }
    });

    if (
      !this.value &&
      typeof this.textValue === 'object' &&
      this.textValue &&
      this.textValue.key
    ) {
      this.value = this.textValue.key;
    }

    this.filteredOptions = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.value)),
      map((value) => this._filter(value))
    );

    this.formControl?.valueChanges.subscribe(() => {
      this.value = this.formControl.value;
    });
  }

  displayFn(item: any): string {
    return item && item.value ? item.value : '';
  }

  private _filter(value: string): any[] {
    if (
      !value &&
      this.autoCompleteControl &&
      typeof this.autoCompleteControl === 'object' &&
      this.autoCompleteControl &&
      this.autoCompleteControl.value &&
      this.autoCompleteControl.value.value
    ) {
      value = this.autoCompleteControl.value.value;
    }

    let item = this.control['items'].find(
      (option) =>
        option &&
        option.value &&
        value &&
        option.value.toLowerCase() === value.toLowerCase()
    );

    if (this.value && (!value || !item)) {
      this.formControl?.setValue('');
    }

    if (!value || value === '') {
      return this.control['items'];
    } else {
      return this.control['items'].filter((option) =>
        option.value.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  selectedItem(item: any) {
    if (this.value !== item.key) {
      this.value = item.key;
      this.setValueForControl();
    }
  }

  setValueForControl() {
    this.control['items'].forEach((option) => {
      if (option.key === this.value && option.key !== '') {
        this.textValue = {
          key: option.key,
          value: option.value,
        };
      }
    });
  }

  blurEvent() {
    if (typeof this.textValue !== 'object') {
      let filterValue = this.textValue ? this.textValue : '';
      this.control['items'].forEach((option) => {
        if (
          option &&
          option.value &&
          filterValue &&
          option.value.toLowerCase() === filterValue.toLowerCase()
        ) {
          if (this.value !== option.key) {
            this.textValue = {
              key: option.key,
              value: option.value,
            };
            this.formControl?.setValue(option.key);
            this.formControl?.markAsTouched();
          }
        }
      });
    }
  }
}
