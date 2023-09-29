import {
  Component,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  Injector,
} from '@angular/core';
import { FormBaseComponent } from '../../base-components/form-base.component';

@Component({
  selector: 'app-formc-search',
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent extends FormBaseComponent {
  @Input() FormTitle: string;
  @Output() OnSubmit = new EventEmitter<any>();
  constructor(injector: Injector, public renderer: Renderer2) {
    super(injector);
  }

  onSubmit() {
    this.OnSubmit.emit(null);
  }
}
