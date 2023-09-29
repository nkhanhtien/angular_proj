import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBarComponent } from './form-bar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppFormModule_SearchFormDynamic } from '../search-form-dynamic/search-form-dynamic.module';
import { MatMenuModule } from '@angular/material/menu';
import { AppControlModule_TemplateControlControl } from '../../controls/template-control/template-control.module';
import { AppControlModule_ButtonListControl } from '../../controls/button-list/button-list.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    AppControlModule_TemplateControlControl,
    AppControlModule_ButtonListControl,
    AppFormModule_SearchFormDynamic,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    TranslateModule,
  ],
  declarations: [FormBarComponent],
  exports: [FormBarComponent],
  bootstrap: [FormBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormModule_FormBar {}
