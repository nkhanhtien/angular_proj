import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { DateTimeComponent } from './date-time.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MatDatepickerModule, TranslateModule],
  declarations: [DateTimeComponent],
  exports: [DateTimeComponent],
  bootstrap: [DateTimeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_DateTimeControl {}
