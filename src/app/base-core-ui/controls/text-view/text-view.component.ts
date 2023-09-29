import { DecimalPipe } from '@angular/common';
import { AfterContentChecked, Component, Injector } from '@angular/core';
import { CurrencyChars } from '../../app.core.shared.const';
import { TextBoxControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';
import { ControlBase } from '../../models/control-base-model';

@Component({
  selector: 'app-ctr-text-view',
  templateUrl: './text-view.component.html',
})
export class TextViewComponent
  extends AppBaseControlBaseComponent
  implements AfterContentChecked
{
  override control: TextBoxControlBase;
  constructor(protected injector: Injector, private decimalPipe: DecimalPipe) {
    super(injector);
  }

  override ngAfterContentChecked() {
    this.format(this.control.value);

    //your code to update the model
    this.cdr.detectChanges();
  }

  format(val?: string) {
    if (this.control['type'] === 'number') {
      // 1. test for non-number characters and replace/remove them
      const numberFormat = parseInt(String(val).replace(CurrencyChars, ''));

      // 2. format the number (add commas)
      const formatValue =
        this.decimalPipe.transform(numberFormat, '1.0', '') ||
        numberFormat.toString();

      if (this.control !== undefined && this.control.value !== formatValue) {
        this.control.value = formatValue;
      }
    }
  }
}
