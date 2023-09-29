import { Component, OnInit } from '@angular/core';

import { Dashboard } from '../../../base-core-ui/app.core.shared.models';
import { DashboardService } from '../../services/dashboard.service';
// import { PieChartExampleComponent } from '../../widgets/pie-chart-example/pie-chart-example.component';
// import { ColumnChartExampleComponent } from '../../widgets/column-chart-example/column-chart-example.component';
// import { SimpleColumnChartExampleComponent } from '../../widgets/simple-column-chart-example/simple-column-chart-example.component';

@Component({
  selector: 'app-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.css'],
})
export class DashboardViewerComponent implements OnInit {
  dashboard: Dashboard = new Dashboard();

  // protected subscription: Subscription;
  availableWidgets = {
    // pieChartExample: PieChartExampleComponent,
    // columChartExample: ColumnChartExampleComponent,
    // simpleColumChartExample: SimpleColumnChartExampleComponent,
  };
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboard = this.dashboardService.getDashboard('1');
  }
}
