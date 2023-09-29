import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../../base-core-ui/app.core.shared.models';
import { AppConfigService } from 'src/app/services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dashboards = [
    {
      id: '1',
      name: 'Sample Dashboard 1',
      widgets: [
        {
          component: 'pieChartExample',
          cols: 6,
          rows: 12,
          y: 0,
          x: 0,
        },
        {
          component: 'columChartExample',
          cols: 6,
          rows: 6,
          y: 5,
          x: 0,
        },
        {
          component: 'simpleColumChartExample',
          cols: 6,
          rows: 6,
          y: 5,
          x: 4,
        },
      ],
    },
  ];

  private get baseUrl() {
    return `${this.configService.config.apiEndPointLocal}dashboards`;
  }

  constructor(
    private httpClient: HttpClient,
    private configService: AppConfigService
  ) {}

  getDashboards(): Observable<Dashboard[]> {
    return this.httpClient.get<any>(this.baseUrl);
  }

  // getDashboard(dashboardId: string): Observable<Dashboard> {
  //   return this.httpClient.get(this.baseUrl).pipe(
  //     map((dashboards: Dashboard[]) => {
  //       return dashboards['data'].find(dashboard => dashboard.id === dashboardId)
  //     }));
  // }

  getDashboard(dashboardId: string): Dashboard {
    return this.dashboards.find(
      (dashboard: any) => dashboard.id === dashboardId
    ) as Dashboard;
  }
}
