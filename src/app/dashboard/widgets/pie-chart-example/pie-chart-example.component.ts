import { Component, OnInit } from '@angular/core';
import { HighchartWidgetService } from '../../services/highchart-widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart-example',
  templateUrl: './pie-chart-example.component.html',
  styleUrls: ['./pie-chart-example.component.css'],
})
export class PieChartExampleComponent implements OnInit {
  chartTitle = 'PIE';
  chartData: any = [];
  subscription: Subscription;
  interval: any;

  constructor(private chartDataService: HighchartWidgetService) {}

  ngOnInit(): void {
    // Set 5 seconds interval to update data again and again
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData() {
    // get and hard data
    let response = this.chartDataService.getPieData();
    const marks = response;
    this.chartData = [];
    for (const row of marks) {
      this.chartData.push({
        name: row.name,
        y: row.value,
        sliced: false,
        selected: false,
      });
    }
  }
}
