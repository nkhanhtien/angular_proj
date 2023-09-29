import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VerticalHorizontalListComponent } from './vertical-horizontal-list.component';
import { AppControlModule_DropdownListControl } from '../dropdown-list/dropdown-list.module';
import { AppControlModule_DateTimeControl } from '../date-time/date-time.module';
import { AppControlModule_CheckBoxControl } from '../check-box/check-box.module';
import { AppControlModule_CheckBoxListControl } from '../check-box-list/check-box-list.module';
import { AppControlModule_RadioButtonListControl } from '../radio-button-list/radio-button-list.module';
import { AppControlModule_SlideToggleControl } from '../slide-toggle/slide-toggle.module';
import { AppControlModule_DropdownListMultipleSelectControl } from '../dropdown-list-multiple-select/dropdown-list-multiple-select.module';
import { AppControlModule_TextBoxMaskControl } from '../text-box-mask/text-box-mask.module';
import { AppControlModule_EmptyControl } from '../empty-control/empty-control.module';
import { AppControlModule_TextViewControl } from '../text-view/text-view.module';
import { AppControlModule_TextBoxControl } from '../text-box/text-box.module';
import { AppControlModule_AutoCompleteTextBoxControl } from '../auto-complete-text-box/auto-complete-text-box.module';
import { AppControlModule_TextBoxPasswordControl } from '../text-box-password/text-box-password.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AppControlModule_TextBoxControl,
    AppControlModule_DateTimeControl,
    AppControlModule_DropdownListControl,
    AppControlModule_CheckBoxControl,
    AppControlModule_SlideToggleControl,
    AppControlModule_CheckBoxListControl,
    AppControlModule_RadioButtonListControl,
    AppControlModule_AutoCompleteTextBoxControl,
    AppControlModule_DropdownListMultipleSelectControl,
    AppControlModule_TextBoxMaskControl,
    AppControlModule_TextBoxPasswordControl,
    AppControlModule_EmptyControl,
    AppControlModule_TextViewControl,
  ],
  declarations: [VerticalHorizontalListComponent],
  exports: [VerticalHorizontalListComponent],
  bootstrap: [VerticalHorizontalListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppControlModule_VerticalHorizontalListControl {}
