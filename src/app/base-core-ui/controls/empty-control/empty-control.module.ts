import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EmptyControlComponent } from './empty-control.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [EmptyControlComponent],
  exports: [EmptyControlComponent],
  bootstrap: [EmptyControlComponent],
})
export class AppControlModule_EmptyControl {}
