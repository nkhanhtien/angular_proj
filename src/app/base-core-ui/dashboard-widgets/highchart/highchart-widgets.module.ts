import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ChartModule } from 'angular-highcharts';
// import { HighchartsChartModule  } from 'highcharts-angular';
// import { HighchartPieComponent } from './highchart-pie/highchart-pie.component';
// import { HighchartColumnComponent } from './highchart-column/highchart-column.component';

@NgModule({
  declarations: [
    // HighchartPieComponent,
    // HighchartColumnComponent
  ],
  imports: [CommonModule,
     //ChartModule
    ],
  exports: [
    // HighchartPieComponent,
    // HighchartColumnComponent
  ],
})
export class HighchartWidgetsModule {}
