import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../services/demo.service';
import { PageDataInfo } from '../../../base-core-ui/app.core.shared.interfaces';
import { GridDefine } from 'src/app/base-core-ui/app.core.shared.models';
@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.scss'],
})
export class ComponentBComponent implements OnInit {
  gridDefinitions: GridDefine = new GridDefine();
  dataSource: any[];
  pageInfo: PageDataInfo = {
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  };

  constructor(private demoService: DemoService) {}

  ngOnInit() {
    this.gridDefinitions = this.demoService.getGridDefinitions();
    this.demoService.getDatasourseForMasterForm().subscribe((data) => {
      this.dataSource = data;
      this.pageInfo.total = data.length;
    });
  }

  onRowActions(event: any) {}
}
