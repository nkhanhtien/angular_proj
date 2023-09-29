import { NgModule } from '@angular/core';
import { AppControlModule_AutoCompleteTextBoxControl } from './controls/auto-complete-text-box/auto-complete-text-box.module';
import { AppControlModule_ButtonListControl } from './controls/button-list/button-list.module';
import { AppControlModule_CheckBoxListControl } from './controls/check-box-list/check-box-list.module';
import { AppControlModule_CheckBoxControl } from './controls/check-box/check-box.module';
import { AppControlModule_ConfirmControl } from './controls/confirm/confirm.module';
import { AppControlModule_DateTimeControl } from './controls/date-time/date-time.module';
import { AppControlModule_DialogControl } from './controls/dialog-dynamic/dialog-dynamicmodule';
import { AppControlModule_DialogMessageControl } from './controls/dialog-message/dialog-message.module';
import { AppControlModule_DropdownListMultipleSelectControl } from './controls/dropdown-list-multiple-select/dropdown-list-multiple-select.module';
import { AppControlModule_DropdownListControl } from './controls/dropdown-list/dropdown-list.module';
import { AppControlModule_EmptyControl } from './controls/empty-control/empty-control.module';
import { AppControlModule_LoadingPageControl } from './controls/loading-page/loading-page.module';
import { MenuModule } from './controls/menu/menu.module';
import { AppControlModule_MenuGridSearchMultipleSelectedControl } from './controls/menu-grid-search-multiple-selected/menu-grid-search-multiple-selected.module';
import { AppControlModule_MenuGridSearchNumberControl } from './controls/menu-grid-search-number/menu-grid-search-number.module';
import { AppControlModule_MenuGridSearchTextControl } from './controls/menu-grid-search-text/menu-grid-search-text.module';
import { AppControlModule_NavBoxControl } from './controls/nav-box/nav-box.module';
import { AppControlModule_RadioButtonListControl } from './controls/radio-button-list/radio-button-list.module';
import { AppControlModule_SlideToggleControl } from './controls/slide-toggle/slide-toggle.module';
import { AppControlModule_SpinnerOverlayControl } from './controls/spinner-overlay/spinner-overlay.module';
import { AppControlModule_TabsControl } from './controls/tabs/tabs.module';
import { AppControlModule_TemplateControlControl } from './controls/template-control/template-control.module';
import { AppControlModule_TextBoxControl } from './controls/text-box/text-box.module';
import { AppControlModule_TextBoxMaskControl } from './controls/text-box-mask/text-box-mask.module';
import { AppControlModule_TextBoxPasswordControl } from './controls/text-box-password/text-box-password.module';
import { AppControlModule_TextViewControl } from './controls/text-view/text-view.module';
import { AppControlModule_TreeViewControl } from './controls/tree-view/tree-view.module';
import { AppControlModule_MenuGridSearchDateControl } from './controls/menu-grid-search-date/menu-grid-search-date.module';
import { AppControlModule_VerticalHorizontalListControl } from './controls/vertical-horizontal-list/vertical-horizontal-list.module';

@NgModule({
  exports: [
    AppControlModule_AutoCompleteTextBoxControl,
    AppControlModule_ButtonListControl,
    AppControlModule_CheckBoxControl,
    AppControlModule_SlideToggleControl,
    AppControlModule_CheckBoxListControl,
    AppControlModule_DateTimeControl,
    AppControlModule_MenuGridSearchDateControl,
    AppControlModule_MenuGridSearchMultipleSelectedControl,
    AppControlModule_MenuGridSearchNumberControl,
    AppControlModule_MenuGridSearchTextControl,
    AppControlModule_RadioButtonListControl,
    AppControlModule_NavBoxControl,
    AppControlModule_TextBoxControl,
    AppControlModule_TextBoxPasswordControl,
    AppControlModule_DropdownListControl,
    AppControlModule_TextBoxMaskControl,
    AppControlModule_DropdownListControl,
    AppControlModule_DropdownListMultipleSelectControl,
    AppControlModule_SpinnerOverlayControl,
    AppControlModule_DialogControl,
    AppControlModule_LoadingPageControl,
    AppControlModule_ConfirmControl,
    AppControlModule_TreeViewControl,
    AppControlModule_TabsControl,
    AppControlModule_EmptyControl,
    AppControlModule_DialogMessageControl,
    AppControlModule_TextViewControl,
    AppControlModule_VerticalHorizontalListControl,
    MenuModule,
    AppControlModule_TemplateControlControl,
  ],
})
export class AppSharedControlsModule {}

/*
Note Sharing:
1. TextBoxModule :
    a. if we input the module in AppModule, we don't need to export it.
    b. as we using ShareModule to import to AppModule we need export it.
2.  @angular/material
    a. We need import&export modules of @angular/material to effect to UI (child components)
3. RouterModule
    a. We need export RouterModule to make routes working.
*/
