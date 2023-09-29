import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HighChartBaseComponent } from 'src/app/base-core-ui/base-components/highchart-base.component';

@Component({
  selector: 'app-highchart-pie',
  templateUrl: './highchart-pie.component.html',
  styleUrls: ['./highchart-pie.component.scss'],
})
export class HighchartPieComponent
  extends HighChartBaseComponent
  implements OnInit, OnChanges
{
  @Input() chartData = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    // set config and init chart
    this.setConfig(this.configChart());
    this.initChart();
  }

  // set config chart
  configChart() {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: null,
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      title: {
        text: this.chartTitle,
      },
      subtitle: {
        text: this.chartSubTitle,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: this.chartData.length
        ? [
            {
              name: 'Brands',
              colorByPoint: true,
              data: this.chartData,
              type: undefined,
            },
          ]
        : [],
    };
  }

  // Trigger change chart data
  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && this.chartData.length > 0) {
      // reset config chart
      this.setConfig(this.configChart());
      // update chart realtime data
      this.updateChartData();
    }
  }
}
