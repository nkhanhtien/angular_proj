import {
  Component,
  Injector,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { SearchHeaderDateInfo } from '../../app.core.shared.interfaces';

@Component({
  selector: 'app-ctr-menu-grid-search-date',
  templateUrl: './menu-grid-search-date.component.html',
})
export class MenuGridSearchDateComponent {
  @Input() searchItem: SearchHeaderDateInfo = {
    columnDef: '',
    columnName: '',
    fromDate: undefined,
    toDate: undefined,
    type: 'DateTime',
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
