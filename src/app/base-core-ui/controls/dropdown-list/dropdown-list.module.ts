import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownListComponent } from './dropdown-list.component';
@NgModule({
  imports: [BrowserModule, FormsModule, TranslateModule],
  declarations: [DropdownListComponent],
  exports: [DropdownListComponent],
  bootstrap: [DropdownListComponent],
})
export class AppControlModule_DropdownListControl {}
