import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DialogDynamicFormComponent } from './dialog-dynamic.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AppFormModule_DynamicComponent } from '../../base-components/dynamic-base.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule,
    AppFormModule_DynamicComponent,
    MatDialogModule,
  ],
  declarations: [DialogDynamicFormComponent],
  exports: [DialogDynamicFormComponent],
  bootstrap: [DialogDynamicFormComponent],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class AppControlModule_DialogControl {}
