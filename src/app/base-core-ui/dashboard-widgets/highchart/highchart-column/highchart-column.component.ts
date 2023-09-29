import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { HighChartBaseComponent } from 'src/app/base-core-ui/base-components/highchart-base.component';
@Component({
  selector: 'app-highchart-column',
  templateUrl: './highchart-column.component.html',
  styleUrls: ['./highchart-column.component.scss'],
})
export class HighchartColumnComponent
  extends HighChartBaseComponent
  implements OnInit, OnChanges
{
  @Input() yAxisTitle: string;
  @Input() categoriesData = [];
  @Input() seriesData = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    // set config and init chart
    this.setConfig(this.configChart());
    this.initChart();
  }

  // get config for current chart
  configChart() {
    return {
      chart: {
        type: 'column',
      },
      title: {
        text: this.chartTitle,
      },
      subtitle: {
        text: this.chartSubTitle,
      },
      xAxis: {
        categories: this.categoriesData,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: this.yAxisTitle,
        },
      },
      tooltip: {
        headerFormat:
          '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: this.seriesData,
    };
  }

  // Trigger change chart data
  ngOnChanges(changes: SimpleChanges) {
    if (changes['seriesData'] && this.seriesData.length > 0) {
      // reset config chart
      this.setConfig(this.configChart());
      // update chart realtime data
      this.updateChartData();
    }
  }
}
