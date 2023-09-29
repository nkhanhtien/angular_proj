import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormMasterComponent } from './form-master.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CdkTableModule } from '@angular/cdk/table';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { CustomPaginator } from './form-master.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppFormModule_DynamicComponent } from '../../base-components/dynamic-base.component';
import { AppControlModule_ButtonListControl } from '../../controls/button-list/button-list.module';
import { AppControlModule_MenuGridSearchTextControl } from '../../controls/menu-grid-search-text/menu-grid-search-text.module';
import { AppControlModule_MenuGridSearchNumberControl } from '../../controls/menu-grid-search-number/menu-grid-search-number.module';
import { AppControlModule_MenuGridSearchDateControl } from '../../controls/menu-grid-search-date/menu-grid-search-date.module';
import { AppControlModule_MenuGridSearchMultipleSelectedControl } from '../../controls/menu-grid-search-multiple-selected/menu-grid-search-multiple-selected.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    CdkTableModule,
    A11yModule,
    BidiModule,
    OverlayModule,
    PlatformModule,
    ObserversModule,
    PortalModule,
    MatPaginatorModule,
    TranslateModule,
    AppFormModule_DynamicComponent,
    AppControlModule_ButtonListControl,
    AppControlModule_MenuGridSearchTextControl,
    AppControlModule_MenuGridSearchNumberControl,
    AppControlModule_MenuGridSearchDateControl,
    AppControlModule_MenuGridSearchMultipleSelectedControl,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator,
    },
  ],
  declarations: [FormMasterComponent],
  exports: [FormMasterComponent],
  bootstrap: [FormMasterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormModule_FormMaster {}
