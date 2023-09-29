import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormTabsComponent } from './tabs-form.component';
import { AppControlModule_TabsControl } from '../../controls/tabs/tabs.module';
import { AppFormModule_DynamicComponent } from '../../base-components/dynamic-base.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppControlModule_TabsControl,
    AppFormModule_DynamicComponent,
  ],
  declarations: [FormTabsComponent],
  exports: [FormTabsComponent],
  bootstrap: [FormTabsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormModule_TabsForm {}
