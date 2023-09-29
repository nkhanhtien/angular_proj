import { Component, OnInit } from '@angular/core';
import { HighchartWidgetService } from '../../services/highchart-widget.service';

@Component({
  selector: 'app-simple-column-chart-example',
  templateUrl: './simple-column-chart-example.component.html',
  styleUrls: ['./simple-column-chart-example.component.css'],
})
export class SimpleColumnChartExampleComponent implements OnInit {
  chartTitle = 'Simple Column';
  yAxisTitle = 'Population (millions)';
  categoriesData: any = [];
  seriesData: any = [];

  interval: any;

  constructor(private chartDataService: HighchartWidgetService) {}

  ngOnInit(): void {
    // Set 5 seconds interval to update data again and again
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  // refreshData(){
  //   // get and hard data
  //   this.chartDataService.getPieData().subscribe(
  //     response => {
  //       const marks = response;
  //       this.categoriesData = [];
  //       this.seriesData = [];
  //       const data = [];

  //       for (const row of marks) {
  //         data.push({
  //           name: row.name,
  //           y: row.value
  //         });
  //         this.categoriesData.push(row.name);
  //       }

  //       const radomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  //       data.push({
  //         name: radomName,
  //         y: Math.floor(Math.random() * 30) + 1,
  //       });
  //       this.categoriesData.push(radomName);

  //       this.seriesData = [{
  //       name: 'data',
  //       data,
  //       type: undefined,
  //     }];
  //   });
  // }

  refreshData() {
    // get and hard data
    let response: any = this.chartDataService.getPieData();
    const marks = response;
    this.categoriesData = [];
    this.seriesData = [];
    const data: any = [];

    for (const row of marks) {
      data.push({
        name: row.name,
        y: row.value,
      });
      this.categoriesData.push(row.name);
    }

    const radomName =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    data.push({
      name: radomName,
      y: Math.floor(Math.random() * 30) + 1,
    });
    this.categoriesData.push(radomName);

    this.seriesData = [
      {
        name: 'data',
        data,
        type: undefined,
      },
    ];
  }
}
