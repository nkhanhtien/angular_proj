import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormDynamicComponent } from './search-form-dynamic.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
    MatIconModule,
    FormsModule,
    TranslateModule,
  ],
  declarations: [SearchFormDynamicComponent],
  exports: [SearchFormDynamicComponent],
  bootstrap: [SearchFormDynamicComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormModule_SearchFormDynamic {}
