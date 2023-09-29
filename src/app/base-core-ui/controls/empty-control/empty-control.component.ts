import { Component, Injector } from '@angular/core';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';

@Component({
  selector: 'app-ctr-empty-control',
  template: '<div></div>',
})
export class EmptyControlComponent extends AppBaseControlBaseComponent {
  constructor(protected injector: Injector) {
    super(injector);
  }
}
