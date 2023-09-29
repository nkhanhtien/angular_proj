import {
  Component,
  Injector,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { SearchHeaderNumberInfo } from '../../app.core.shared.interfaces';
@Component({
  selector: 'app-ctr-menu-grid-search-number',
  templateUrl: './menu-grid-search-number.component.html',
})
export class MenuGridSearchNumberComponent {
  @Input() searchItem: SearchHeaderNumberInfo = {
    columnDef: '',
    columnName: '',
    minValue: undefined,
    maxValue: undefined,
    type: 'Number',
  };
  @Output() ActionClicked = new EventEmitter<any>();
  constructor(protected injector: Injector) {}

  menuSeachAction(event: any) {
    this.ActionClicked.emit({
      action: event.action,
      searchItem: this.searchItem,
    });
  }
}
