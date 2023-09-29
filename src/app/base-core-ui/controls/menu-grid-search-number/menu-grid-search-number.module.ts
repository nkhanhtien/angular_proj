import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MenuGridSearchNumberComponent } from './menu-grid-search-number.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [MenuGridSearchNumberComponent],
  exports: [MenuGridSearchNumberComponent],
  bootstrap: [MenuGridSearchNumberComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_MenuGridSearchNumberControl {}
