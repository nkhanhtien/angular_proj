import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { SingleFormComponent } from './single-form.component';
import { AppControlModule_ButtonListControl } from '../../controls/button-list/button-list.module';
import { AppControlModule_TemplateControlControl } from '../../controls/template-control/template-control.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    AppControlModule_ButtonListControl,
    AppControlModule_TemplateControlControl,
  ],
  declarations: [SingleFormComponent],
  exports: [SingleFormComponent],
  bootstrap: [SingleFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormModule_SingleFrom {}
