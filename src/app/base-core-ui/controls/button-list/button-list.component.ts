import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ButtonItem } from '../../interfaces/form-interface';

@Component({
  selector: 'app-ctr-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.scss'],
})
export class ButtonListComponent {
  @Input() ButtonList: ButtonItem[];
  @Output() ActionClicked = new EventEmitter<any>();
  constructor(protected injector: Injector) {}

  itemClicked(item: any) {
    this.ActionClicked.emit(item);
    return false;
  }
}
