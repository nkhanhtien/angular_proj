import {
  Component,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  Injector,
} from '@angular/core';
import { FormButtonItem } from '../../app.core.shared.interfaces';
import { FormBaseComponent } from '../../base-components/form-base.component';

@Component({
  selector: 'app-formc-bar',
  templateUrl: './form-bar.component.html',
  styleUrls: ['./form-bar.component.scss'],
})
export class FormBarComponent extends FormBaseComponent {
  @Input() RightSearchButtonList: FormButtonItem[];
  @Input() RightFormButtonList: FormButtonItem[];
  isApply: boolean;
  @Input() IsApply: boolean;
  @Output() OnSubmitSearch = new EventEmitter<any>();
  @Output() OnFormActions = new EventEmitter<any>();

  constructor(injector: Injector, public renderer: Renderer2) {
    super(injector);
  }

  onSubmit(value: any) {
    this.OnSubmitSearch.emit(value);
  }

  itemClicked(item: any) {
    this.OnFormActions.emit(item);
  }
}
