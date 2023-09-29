import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideToggleControlComponent } from './slide-toggle.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ],
  declarations: [SlideToggleControlComponent],
  exports: [SlideToggleControlComponent],
  bootstrap: [SlideToggleControlComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_SlideToggleControl {}
