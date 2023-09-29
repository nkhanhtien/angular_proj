import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { CheckBoxComponent } from './check-box.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MatCheckboxModule, TranslateModule],
  declarations: [CheckBoxComponent],
  exports: [CheckBoxComponent],
  bootstrap: [CheckBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_CheckBoxControl {}
