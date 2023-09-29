import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridDefine } from 'src/app/base-core-ui/app.core.shared.models';
import { GridRequestInfo, PageDataInfo, SearchParamRequest } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { ActivityService } from '../../services/activity.service';
import { ParamRequestSearchType } from 'src/app/base-core-ui/app.core.shared.enums';
import { ActionTypes } from 'src/app/common/const';

const ITEM_PER_PAGE = 5;

@Component({
  selector: 'app-activities-viewer',
  templateUrl: './activities-viewer.component.html',
  styleUrls: ['./activities-viewer.component.scss']
})
export class ActivitiesViewerComponent implements OnInit {
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
  searchParamRequest: SearchParamRequest[] = [];
  sortTypes = [
    { value: 'date', label: 'Date'},
    { value: 'name', label: 'Name'},
    { value: 'createdBy', label: 'Author'},
    { value: 'dataset', label: 'Dataset'},
  ];
  sortType = this.sortTypes[0].value;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private activityService: ActivityService
  ) {}
  
  async ngOnInit() {
    this.gridDefinitions = this.activityService.getGridDefinitions();
    const res = await this.activityService.getActivities(this.gridInfo);
    if (res) {
      const { success, content, itemsPerPage, totalItems } = res;
      if (success) {
        this.dataSource = content.map(item => {
          const tagList = item.tags?.map(tag => tag.name);

          return {
            ...item,
            tagList: tagList?.join(', ')
          }
        });
        this.pageInfo.pageSize = itemsPerPage;
        this.pageInfo.total = totalItems;
        this.loading = false;
      }
    }
  }

  onClickCreateButton() {
    this.router.navigate(['/activities/create'])
  }

  async filterActivities(data: any) {
    const { ActivityName, CreatedAfter, CreatedBefore, CreatedBy, Dataset, Status } = data;
    this.searchParamRequest = [];
    ActivityName && this.searchParamRequest.push(
      {
        Key: 'name',
        Type: ParamRequestSearchType.In,
        Value: ActivityName
      }
    );
    CreatedAfter && this.searchParamRequest.push(
      {
        Key: 'createdAt',
        Type: ParamRequestSearchType.AfterDate,
        Value: CreatedAfter
      }
    );
    CreatedBefore && this.searchParamRequest.push(
      {
        Key: 'createdAt',
        Type: ParamRequestSearchType.BeforeDate,
        Value: CreatedBefore
      }
    );
    Dataset && this.searchParamRequest.push(
      {
        Key: 'dataset',
        Type: ParamRequestSearchType.Equals,
        Value: Dataset
      }
    );
    CreatedBy && this.searchParamRequest.push(
      {
        Key: 'createdBy',
        Type: ParamRequestSearchType.Equals,
        Value: CreatedBy
      }
    );
    Status && this.searchParamRequest.push(
      {
        Key: 'status',
        Type: ParamRequestSearchType.Equals,
        Value: Status
      }
    );

    const res = await this.activityService.getActivities(this.gridInfo, this.searchParamRequest);
    if (res) {
      const { success, content, itemsPerPage, totalItems } = res;
      if (success) {
        this.dataSource = content.map(item => {
          const tagList = item.tags?.map(tag => tag.name);

          return {
            ...item,
            tagList: tagList?.join(', ')
          }
        });
        this.pageInfo.pageSize = itemsPerPage;
        this.pageInfo.total = totalItems;
        this.loading = false;
      }
    }
  }

  async onPageSourceChanged(event) {
    this.gridInfo = {
      PageIndex: event.pageIndex,
      PageSize: event.pageSize,
      SortName: event.sortName || this.sortType,
      SortDesc: event.sortDesc || 'asc',
    };
    const res = await this.activityService.getActivities(this.gridInfo, this.searchParamRequest);
    if (res) {
      const { success, content, itemsPerPage, totalItems } = res;
      if (success) {
        this.dataSource = content.map(item => {
          const tagList = item.tags?.map(tag => tag.name);

          return {
            ...item,
            tagList: tagList?.join(', ')
          }
        });
        this.pageInfo.pageSize = itemsPerPage;
        this.pageInfo.total = totalItems;
        this.loading = false;
      }
    }
  }

  async onChangeSortPanel(event) {
    this.sortType = event.value;
    this.gridInfo = {
      ...this.gridInfo,
      SortName: this.sortType,
      SortDesc: 'asc'
    };
    const res = await this.activityService.getActivities(this.gridInfo, this.searchParamRequest);
    if (res) {
      const { success, content, itemsPerPage, totalItems } = res;
      if (success) {
        this.dataSource = content.map(item => {
          const tagList = item.tags?.map(tag => tag.name);

          return {
            ...item,
            tagList: tagList?.join(', ')
          }
        });
        this.pageInfo.pageSize = itemsPerPage;
        this.pageInfo.total = totalItems;
      }
    }
  }

  OnRowActions(event) {
    const { row, action } = event;
    switch (action.actionKey) {
      case ActionTypes.Edit:
        this.router.navigate([`activities/${row._id}`]);
        break;
    
      default:
        break;
    }
  }
}
