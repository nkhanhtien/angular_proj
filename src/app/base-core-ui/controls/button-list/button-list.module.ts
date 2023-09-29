import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonListComponent } from './button-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, TranslateModule],
  declarations: [ButtonListComponent],
  exports: [ButtonListComponent],
  bootstrap: [ButtonListComponent],
})
export class AppControlModule_ButtonListControl {}
