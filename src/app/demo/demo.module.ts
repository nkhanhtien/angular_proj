import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { demoRoutes } from '../common/routes';
import { AppSharedModule } from '../base-core-ui/app.core.shared.module';
import { Demo1FormComponent } from './containers/demo-1-form/demo-1-form.component';
import { Demo2FormComponent } from './containers/demo-2-form/demo-2-form.component';
import { DialogCorporationComponent } from './containers/dialog-corporation/dialog-corporation.component';
import { ComponentAComponent } from './components/component-a/component-a.component';
import { ComponentBComponent } from './components/component-b/component-b.component';
import { ComponentCComponent } from './components/component-c/component-c.component';
import { DemoService } from './services/demo.service';
import { Demo3FormComponent } from './containers/demo-3-form/demo-3-form.component';
import { DataForm1Component } from './components/data-form_1/data-form_1.component';
import { DataForm2Component } from './components/data-form_2/data-form_2.component';
import { DataForm3Component } from './components/data-form_3/data-form_3.component';
import { DataForm4Component } from './components/data-form_4/data-form_4.component';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    RouterModule.forChild(demoRoutes),
  ],
  // entryComponents: [
  //   ComponentAComponent,
  //   ComponentBComponent,
  //   ComponentCComponent,
  //   DataForm1Component,
  //   DataForm2Component,
  //   DataForm3Component,
  //   DataForm4Component,
  //   DialogCorporationComponent,
  // ],
  declarations: [
    Demo1FormComponent,
    Demo2FormComponent,
    Demo3FormComponent,
    DialogCorporationComponent,
    ComponentAComponent,
    ComponentBComponent,
    ComponentCComponent,
    DataForm1Component,
    DataForm2Component,
    DataForm3Component,
    DataForm4Component,
  ],
  exports: [Demo1FormComponent, Demo2FormComponent, DialogCorporationComponent],
  providers: [DemoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DemoModule {}
