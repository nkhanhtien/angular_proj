import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TextBoxComponent, NumberFormatDirective } from './text-box.component';

@NgModule({
  declarations: [TextBoxComponent, NumberFormatDirective],
  imports: [BrowserModule, FormsModule, TranslateModule],
  exports: [TextBoxComponent],
  bootstrap: [TextBoxComponent],
  providers: [DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_TextBoxControl {}
