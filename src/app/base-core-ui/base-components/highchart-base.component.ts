import { Component, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

// Base class for highchart
@Component({
  selector: 'app-ctr-base-highchart',
  template: '',
})
export abstract class HighChartBaseComponent {
  @Input() chartTitle: string;
  @Input() chartSubTitle: string;

  public chart: Chart;
  protected config: any;

  constructor() {}

  // set chart config
  setConfig(config: any) {
    this.config = config;
  }

  // init new chart with config
  initChart() {
    this.chart = new Chart(this.config);
    // this.chart.ref$.subscribe(console.log);
  }

  // update realtime data chart
  updateChartData() {
    if (this.chart && this.chart.ref) {
      this.chart.ref.update(this.config, true, true, true);
    }
  }
}
