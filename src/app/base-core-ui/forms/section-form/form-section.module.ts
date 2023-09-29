import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSectionComponent } from './form-section.component';
import { AppFormModule_DynamicComponent } from '../../base-components/dynamic-base.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppFormModule_DynamicComponent,
  ],
  declarations: [FormSectionComponent],
  exports: [FormSectionComponent],
  bootstrap: [FormSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormModule_FormSection {}
