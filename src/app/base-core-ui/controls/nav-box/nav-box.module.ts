import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NavBoxComponent } from './nav-box.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule],
  declarations: [NavBoxComponent],
  exports: [NavBoxComponent],
  bootstrap: [NavBoxComponent],
})
export class AppControlModule_NavBoxControl {}
