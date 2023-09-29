import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoadingPageComponent } from './loading-page.component';

@NgModule({
  imports: [MatProgressSpinnerModule, CommonModule],
  declarations: [LoadingPageComponent],
  exports: [LoadingPageComponent],
  bootstrap: [LoadingPageComponent],
})
export class AppControlModule_LoadingPageControl {}
