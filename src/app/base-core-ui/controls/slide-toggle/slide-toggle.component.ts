import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SlideToggleControlBase } from '../../app.core.shared.models';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

export const slideToggleValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SlideToggleControlComponent),
  multi: true,
};

@Component({
  selector: 'app-ctr-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  providers: [slideToggleValueAccessor],
})
export class SlideToggleControlComponent extends AppBaseControlBaseComponent {
  override control: SlideToggleControlBase;
  constructor(protected injector: Injector) {
    super(injector);
  }
}
