import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { GridsterModule } from 'angular-gridster2';
import { NgxdModule } from '@ngxd/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppFormModule_DynamicComponent } from '../../base-components/dynamic-base.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    GridsterModule,
    NgxdModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    AppFormModule_DynamicComponent,
  ],
  exports: [DashboardComponent],
})
export class DashboardWidgetsModule {}
