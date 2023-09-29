import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from './confirm.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [BrowserModule, FormsModule, TranslateModule, MatDialogModule],
  declarations: [ConfirmComponent],
  exports: [ConfirmComponent],
  bootstrap: [ConfirmComponent],
})
export class AppControlModule_ConfirmControl {}
