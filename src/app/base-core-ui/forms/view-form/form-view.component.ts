import { DecimalPipe } from '@angular/common';
import {
  Component,
  Input,
  Injector,
  Output,
  EventEmitter,
  AfterContentChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { CurrencyChars } from '../../app.core.shared.const';
import { EnControlType } from '../../app.core.shared.enums';

import {
  ControlBase,
  VerHorListControlBase,
} from '../../app.core.shared.models';

@Component({
  selector: 'app-formc-view',
  templateUrl: './form-view.component.html',
})
export class FormViewComponent implements AfterContentChecked {
  @Input() controls: ControlBase<any>[];
  @Output() OnSubLinkActions = new EventEmitter<any>();
  ControlType = EnControlType;

  constructor(
    injector: Injector,
    private decimalPipe: DecimalPipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterContentChecked() {
    if (this.controls) {
      this.controls.forEach((control) => {
        this.format(control);
      });
    }

    //your code to update the model
    this.cdr.detectChanges();
  }

  format(control: any) {
    if (control instanceof VerHorListControlBase) {
      control.children?.forEach((controlChild) => {
        this.format(controlChild);
      });
    } else {
      if (control['type'] === 'number') {
        const decimal = control['numberDecimal'];
        let val = control.value;
        const numberFormat =
          Math.round(
            parseFloat(String(val).replace(CurrencyChars, '')) *
              Math.pow(10, decimal)
          ) / Math.pow(10, decimal);

        // 2. format the number (add commas)
        const formatValue = this.decimalPipe.transform(
          numberFormat,
          '1.0-' + decimal,
          ''
        );

        if (val !== formatValue) {
          control.value = formatValue;
        }
      }
    }
  }

  subLinkClick(subLink: any) {
    this.OnSubLinkActions.emit(subLink);
  }
}
