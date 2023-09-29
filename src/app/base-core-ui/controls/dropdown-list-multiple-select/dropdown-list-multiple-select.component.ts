import {
  Component,
  forwardRef,
  Injectable,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  OverlayContainer,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { AppBaseControlBaseComponent } from '../../base-components/app-base-control.component';
import { DropdownMultipleSelectControlBase } from '../../app.core.shared.models';

export const dropDownMultipleSelectValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownListMultipleSelectComponent),
  multi: true,
};
@Injectable({
  providedIn: 'root',
})
export class CustomSelectOverlay extends Overlay {
  private readonly OVERLAY_PANEL_CLASS = 'custom-overlay-panel';

  /**
   * Creates an overlay that will also add the custom overlay panel class to the overlay panel.
   */
  override create(config?: OverlayConfig): OverlayRef {
    // Add to existing config
    if (config && config.panelClass) {
      if (Array.isArray(config.panelClass)) {
        config.panelClass.push(this.OVERLAY_PANEL_CLASS);
      } else {
        config.panelClass = [config.panelClass, this.OVERLAY_PANEL_CLASS];
      }
    } else {
      // Create new config
      if (config) {
        config.panelClass = [this.OVERLAY_PANEL_CLASS];
      } else {
        config = { panelClass: [this.OVERLAY_PANEL_CLASS] };
      }
    }

    return super.create(config);
  }
}

@Component({
  selector: 'app-ctr-dropdown-list-multiple-select',
  templateUrl: './dropdown-list-multiple-select.component.html',
  providers: [dropDownMultipleSelectValueAccessor],
  viewProviders: [
    {
      provide: Overlay,
      useClass: CustomSelectOverlay,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownListMultipleSelectComponent
  extends AppBaseControlBaseComponent
  implements OnInit
{
  override control: DropdownMultipleSelectControlBase;
  selectedValues: any[] = [];

  @ViewChild('matSelect', { static: false }) selectView: any;

  constructor(
    protected injector: Injector,
    private overlayContainer: OverlayContainer
  ) {
    super(injector);
  }

  onBlur() {
    this.formControl?.markAsTouched();
  }

  override ngOnInit() {
    super.ngOnInit();
    let controlValues = this.control['value'];
    if (controlValues !== undefined && controlValues.length > 0) {
      this.control['items'].forEach((item) => {
        if (controlValues?.includes(item.key)) {
          this.selectedValues.push(item);
        }
      });
    }
  }

  get selected() {
    return this.selectedValues;
  }
  set selected(value) {
    this.selectedValues = value;
  }

  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
  }

  onSelectionChange() {
    const resultValues = this.selectedValues.map((item) => item.key);
    this.formControl?.setValue(resultValues);
    // This control does not call status on changed, so have to call showValidationErrors() by itself
    this.showValidationErrors();
  }

  openedChange(isOpen: boolean) {
    if (isOpen) {
      this.selectView.panel.nativeElement.addEventListener('mouseleave', () => {
        this.selectView.close();
      });
    } else {
      this.formControl?.markAsTouched();
      this.formControl?.updateValueAndValidity({ emitEvent: true });
      this.showValidationErrors();
    }
  }
}
