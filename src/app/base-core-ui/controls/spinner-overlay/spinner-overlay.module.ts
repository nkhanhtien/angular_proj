import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
  declarations: [SpinnerOverlayComponent],
  exports: [SpinnerOverlayComponent],
  bootstrap: [SpinnerOverlayComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_SpinnerOverlayControl {}
