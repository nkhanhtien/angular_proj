import {
  Component,
  Output,
  EventEmitter,
  Renderer2,
  Injector,
  IterableDiffers,
  Input,
  OnInit,
  DoCheck,
} from '@angular/core';
import { ControlBase } from '../../app.core.shared.models';
import { FormBaseComponent } from '../../base-components/form-base.component';

@Component({
  selector: 'app-formc-search-dynamic',
  templateUrl: './search-form-dynamic.component.html',
  styleUrls: ['./search-form-dynamic.component.scss'],
})
export class SearchFormDynamicComponent
  extends FormBaseComponent
  implements OnInit, DoCheck
{
  showMore: Boolean = false;
  isFocused = false;
  defaultControlPlaceHolder: string = 'searching';
  defaultControlKey: string = '';
  defaultControlValue: string = '';
  moreSearchControls: ControlBase<any>[] = [];
  private searchDiffer: any;
  private searchDiffers: IterableDiffers | null;

  @Input() IsApply: boolean;
  @Output() OnSubmit = new EventEmitter<any>();
  constructor(injector: Injector, public renderer: Renderer2) {
    super(injector);
    this.searchDiffers = injector.get(IterableDiffers, null);
    if (this.searchDiffers !== null) {
      this.searchDiffer = this.searchDiffers.find([]).create();
    }
  }

  override ngOnInit() {
    super.ngOnInit();
    this.generateUI();
  }

  generateUI() {
    if (this.controls && this.controls.length > 0) {
      let defaultControl: any = this.controls.find((c: any) => c['isDefault']);
      if (defaultControl === undefined) {
        defaultControl = this.controls[0];
      }
      this.defaultControlKey = defaultControl.key;
      if (defaultControl['placeholder']) {
        this.defaultControlPlaceHolder = defaultControl['placeholder'];
      }
      this.moreSearchControls = this.controls.filter(
        (item) => item.key !== this.defaultControlKey
      );

      this.defaultControlValue = this.controls[0].value;
    }
  }

  override ngDoCheck() {
    const change = this.searchDiffer.diff(this.controls);
    if (change) {
      this.ngOnInit();
    }
  }

  searchMoreControl() {
    this.showMore = !this.showMore;
  }

  onSubmit() {
    if (this.defaultControlKey !== '') {
      let getDefaultSearchFormControl =
        this.form.controls[this.defaultControlKey];
      if (getDefaultSearchFormControl) {
        getDefaultSearchFormControl.setValue(this.defaultControlValue);
      }
      this.OnSubmit.emit(this.form.value);
    }
  }

  onReset() {
    this.defaultControlValue = '';
    for (let controlKey in this.form.controls) {
      this.form.controls[controlKey].setValue('');
    }
  }

  onChange() {
    if (this.defaultControlValue === '') {
      this.onSubmit();
    }
  }

  focus() {
    this.isFocused = true;
  }

  blurEvent() {
    this.isFocused = false;
  }
}
