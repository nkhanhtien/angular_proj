import {
  Component,
  Injector,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { SearchHeaderTextInfo } from '../../app.core.shared.interfaces';
@Component({
  selector: 'app-ctr-menu-grid-search-text',
  templateUrl: './menu-grid-search-text.component.html',
})
export class MenuGridSearchTextComponent {
  @Input() searchItem: SearchHeaderTextInfo = {
    columnDef: '',
    columnName: '',
    value: '',
    type: 'Text',
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
