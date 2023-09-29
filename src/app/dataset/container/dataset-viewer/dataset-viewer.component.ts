import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridRequestInfo, PageDataInfo } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { GridDefine } from 'src/app/base-core-ui/app.core.shared.models';
import { DatasetService } from '../../services/dataset.service';
import { ActionTypes } from 'src/app/common/const';

@Component({
  selector: 'app-dataset-viewer',
  templateUrl: './dataset-viewer.component.html',
  styleUrls: ['./dataset-viewer.component.scss']
})
export class DatasetViewerComponent implements OnInit {
  loading: boolean = true;
  dataSource: any[];
  gridDefinitions: GridDefine = new GridDefine(); 
  pageInfo: PageDataInfo = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
  };
  gridInfo: GridRequestInfo = {
    PageIndex: 0,
    PageSize: 10,
    SortName: "",
    SortDesc: "",
  };

  constructor(
    private router: Router,
    private datasetService: DatasetService
  ) {}

  async ngOnInit() {
    this.gridDefinitions = this.datasetService.getGridDefinitions();
    const res = await this.datasetService.getDatasets(this.gridInfo);
    if (res) {
      const { success, content, itemsPerPage, totalItems } = res;
      if (success) {
        this.dataSource = content;
        this.pageInfo.pageSize = itemsPerPage;
        this.pageInfo.total = totalItems;
      }
    }
    this.loading = false;
  }

  onClickCreateButton() {
    this.router.navigate(['/datasets/create'])
  }

  async onPageSourceChanged(event) {
    this.gridInfo = {
      PageIndex: event.pageIndex,
      PageSize: event.pageSize,
      SortName: event.sortName,
      SortDesc: event.sortDesc,
    };
    const res = await this.datasetService.getDatasets(this.gridInfo);
    if (res) {
      const { success, content, itemsPerPage, totalItems } = res;
      if (success) {
        this.dataSource = content;
        this.pageInfo.pageSize = itemsPerPage;
        this.pageInfo.total = totalItems;
      }
    }
  }

  OnRowActions(event) {
    const { row, action } = event;
    switch (action.actionKey) {
      case ActionTypes.View:
        this.router.navigate([`datasets/${row._id}`]);
        break;
    
      default:
        break;
    }

  }
}
