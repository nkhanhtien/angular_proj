import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MenuGridSearchTextComponent } from './menu-grid-search-text.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [MenuGridSearchTextComponent],
  exports: [MenuGridSearchTextComponent],
  bootstrap: [MenuGridSearchTextComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_MenuGridSearchTextControl {}
