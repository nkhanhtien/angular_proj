import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MenuGridSearchMultipleSelectedComponent } from './menu-grid-search-multiple-selected.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [MenuGridSearchMultipleSelectedComponent],
  exports: [MenuGridSearchMultipleSelectedComponent],
  bootstrap: [MenuGridSearchMultipleSelectedComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_MenuGridSearchMultipleSelectedControl {}
