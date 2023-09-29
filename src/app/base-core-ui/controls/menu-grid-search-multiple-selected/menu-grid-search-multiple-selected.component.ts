import {
  Component,
  Injector,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchHeaderMultipleInfo } from '../../app.core.shared.interfaces';
@Component({
  selector: 'app-ctr-menu-grid-search-multiple-selected',
  templateUrl: './menu-grid-search-multiple-selected.component.html',
})
export class MenuGridSearchMultipleSelectedComponent {
  searchMultipleSelectedControl = new FormControl();
  @Input() searchItem: SearchHeaderMultipleInfo = {
    columnDef: '',
    columnName: '',
    selectOptions: [],
    type: 'Multiple',
    valueType: '',
  };
  @Output() ActionClicked = new EventEmitter<any>();
  constructor(protected injector: Injector) {}

  menuSeachAction(event: any) {
    let item: SearchHeaderMultipleInfo = {
      columnDef: this.searchItem.columnDef,
      columnName: this.searchItem.columnName,
      selectOptions: this.searchMultipleSelectedControl.value,
      type: 'Multiple',
      valueType: this.searchItem.valueType,
    };
    this.ActionClicked.emit({ action: event.action, searchItem: item });
  }
}
