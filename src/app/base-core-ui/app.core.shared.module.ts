import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Third party Module
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { AppDateAdapter, APP_DATE_FORMATS } from './helpers/app-date-adapter';

// Common Component
import { SharedMaterialModule } from './app.shared.materials.module';
import { AppFormModule_DynamicComponent } from './base-components/dynamic-base.component';

// Common Directives
import { AddComponentDirective } from './directives/add-dyn-component.directive';
import { AdDirective } from './directives/add-host.directive';

// Common Services
import { DefineFormService } from './services/define-form.service';
import { EventBus } from './services/event-bus.service';
import { FormControlBusEvents } from './services/form-bus.service';
import { NavParams } from './services/nav-param.service';
import { NavigationService } from './services/navigation.service';
import { PubSubService } from './services/pubsub.service';
import {
  CommonBaseService,
  CoreUIService,
} from './services/service-base.service';

import { AppSharedControlsModule } from './app.core.shared.control';
import { AppSharedFormsModule } from './app.core.shared.forms';
import { CM_DateConfig } from './app.core.shared.const';

// App Routes
import { DashboardWidgetsModule } from './dashboard-widgets/dashboard/dashboard-widgets.module';
import { HighchartWidgetsModule } from './dashboard-widgets/highchart/highchart-widgets.module';

import {
  CalendarModule,
  DateAdapter as calendarDateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxdModule } from '@ngxd/core';

@NgModule({
  imports: [
    BrowserModule,
    NgxdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    SharedMaterialModule,

    AppSharedControlsModule,
    AppSharedFormsModule,
    AppFormModule_DynamicComponent,
    CalendarModule.forRoot({
      provide: calendarDateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    NgbModalModule,
  ],
  declarations: [AdDirective, AddComponentDirective],
  exports: [
    BrowserModule,
    NgxdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

    SharedMaterialModule,

    AppSharedControlsModule,
    AppSharedFormsModule,
    AdDirective,
    AddComponentDirective,

    CalendarModule,
    FlatpickrModule,
    NgbModalModule,
    AppFormModule_DynamicComponent,
    DashboardWidgetsModule,
    //HighchartWidgetsModule,
  ],

  providers: [
    PubSubService,
    DefineFormService,
    EventBus,
    NavigationService,
    FormControlBusEvents,
    CommonBaseService,
    CoreUIService,
    NavParams,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: CM_DateConfig.locale },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppSharedModule {}

/*
Note Sharing:
1. AppControlModule_TextInputControl :
    a. if we input the module in AppModule, we don't need to export it.
    b. as we using ShareModule to import to AppModule we need export it.
2.  @angular/material
    a. We need import&export modules of @angular/material to effect to UI (child components)
3. RouterModule
    a. We need export RouterModule to make routes working.
*/
