import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { dashboardRoutes } from '../common/routes';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { AppSharedModule } from '../base-core-ui/app.core.shared.module';
import { DashboardCommonService } from './services/dashboard.common.service';

// import { ColumnChartExampleComponent } from './widgets/column-chart-example/column-chart-example.component';
// import { PieChartExampleComponent } from './widgets/pie-chart-example/pie-chart-example.component';
// import { SimpleColumnChartExampleComponent } from './widgets/simple-column-chart-example/simple-column-chart-example.component';
import { DashboardViewerComponent } from './containers/dashboard-viewer/dashboard-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  declarations: [
    DashboardContainerComponent,
    // ColumnChartExampleComponent,
    // PieChartExampleComponent,
    // SimpleColumnChartExampleComponent,
    DashboardViewerComponent,
  ],
  exports: [
    DashboardContainerComponent,
    // ColumnChartExampleComponent,
    // PieChartExampleComponent,
    // SimpleColumnChartExampleComponent,
    DashboardViewerComponent,
  ],
  providers: [DashboardCommonService],
  // entryComponents: [
  //   ColumnChartExampleComponent,
  //   PieChartExampleComponent,
  //   SimpleColumnChartExampleComponent,
  // ],
})
export class DashboardModule {}
