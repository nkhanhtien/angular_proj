import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { ButtonItem } from '../../app.core.shared.interfaces';
import { FormBaseComponent } from '../../base-components/form-base.component';

@Component({
  selector: 'app-formc-single',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.scss'],
})
export class SingleFormComponent extends FormBaseComponent {
  @Output() override OnFormControlOnInit = new EventEmitter<any>();
  @Output() OnFormActions = new EventEmitter<any>();

  @Input() ButtonList: ButtonItem[];
  @Input() FormTitle: string;

  constructor(injector: Injector, public renderer: Renderer2) {
    super(injector);
    this.FormCategories = [];
  }

  ActionClicked(item: any) {
    this.OnFormActions.emit(item);
  }

  onSubmit() {}
}
