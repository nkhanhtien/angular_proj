import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSelectModule } from '@angular/material/select';
import { DropdownListMultipleSelectComponent } from './dropdown-list-multiple-select.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    TranslateModule,
    OverlayModule,
  ],
  declarations: [DropdownListMultipleSelectComponent],
  exports: [DropdownListMultipleSelectComponent],
  bootstrap: [DropdownListMultipleSelectComponent],
})
export class AppControlModule_DropdownListMultipleSelectControl {}
