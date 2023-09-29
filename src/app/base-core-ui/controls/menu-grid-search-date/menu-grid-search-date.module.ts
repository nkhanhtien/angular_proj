import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MenuGridSearchDateComponent } from './menu-grid-search-date.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  declarations: [MenuGridSearchDateComponent],
  exports: [MenuGridSearchDateComponent],
  bootstrap: [MenuGridSearchDateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_MenuGridSearchDateControl {}
