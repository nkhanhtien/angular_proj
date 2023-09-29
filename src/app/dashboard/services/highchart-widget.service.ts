import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PieData } from '../models/pie-data.model';
import { AppConfigService } from 'src/app/services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class HighchartWidgetService {
  chartData: PieData[] = [
    {
      name: 'Firefox',
      value: 45,
    },
    {
      name: 'IE',
      value: 26.8,
    },
    {
      name: 'Chrome',
      value: 12.8,
    },
    {
      name: 'Safari',
      value: 8.5,
    },
    {
      name: 'Opera',
      value: 6.2,
    },
    {
      name: 'Others',
      value: 0.7,
    },
  ];

  private get baseUrl() {
    return `${this.configService.config.apiEndPointLocal}chartData`;
  }

  constructor(
    private httpClient: HttpClient,
    private configService: AppConfigService
  ) {}
  // getPieData(): Observable<PieData[]> {
  //   return this.httpClient.get(this.baseUrl).pipe(
  //     map((pieData: PieData[]) => {
  //       return pieData['data']
  //     }));
  // }

  getPieData(): PieData[] {
    return this.chartData;
  }
}
