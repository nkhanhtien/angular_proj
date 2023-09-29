import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormWizardSectionComponent } from './form-wizard-section.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppFormModule_DynamicComponent } from '../../base-components/dynamic-base.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppFormModule_DynamicComponent,
    FormsModule,
    TranslateModule,
  ],
  declarations: [FormWizardSectionComponent],
  exports: [FormWizardSectionComponent],
  bootstrap: [FormWizardSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormModule_WizardFormSection {}
