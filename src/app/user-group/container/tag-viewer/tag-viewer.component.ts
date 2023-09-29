import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridRequestInfo, PageDataInfo, SearchParamRequest } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { GridDefine } from 'src/app/base-core-ui/app.core.shared.models';
import { UserGroupService } from '../../services/user-group.service';
import { KeycloakAdminService } from '../../../services/keycloak-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { TagDialogComponent } from '../../component/tag-dialog/tag-dialog.component';
import { MessageType } from 'src/app/common/const';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
@Component({
  selector: 'app-tag-viewer',
  templateUrl: './tag-viewer.component.html',
  styleUrls: ['./tag-viewer.component.scss']
})
export class TagViewerComponent {
  type = 'Tag';
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
    SortName: "name",
    SortDesc: "asc",
  };
  searchParamRequest: SearchParamRequest[] = [];
  sortTypes = [
    { value: 'name', label: 'Name' },
  ];
  sortType = this.sortTypes[0].value;

  constructor(
    private keycloakAdminService: KeycloakAdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userGroupService: UserGroupService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.gridDefinitions = this.userGroupService.getGridDefinitions();
    const dataTag = await this.userGroupService.getAllTag(this.gridInfo);
    const { success, content, itemsPerPage, totalItems } = dataTag;
    if (success) {
      this.dataSource = content;
      this.pageInfo.pageSize = itemsPerPage;
      this.pageInfo.total = totalItems;
      this.loading = false;
    }
  }

  async onPageSourceChanged(event) {
    this.gridInfo = {
      PageIndex: event.pageIndex,
      PageSize: event.pageSize,
      SortName: event.sortName || this.sortType,
      SortDesc: event.sortDesc || 'asc',
    };
    const dataTag = await this.userGroupService.getAllTag(this.gridInfo, this.searchParamRequest);
    const { success, content, itemsPerPage, totalItems } = dataTag;
    if (success) {
      this.dataSource = content;
      this.pageInfo.pageSize = itemsPerPage;
      this.pageInfo.total = totalItems;
      this.loading = false;
    }
  }

  async onChangeSortPanel(event) {
    this.gridInfo = {
      ...this.gridInfo,
      SortName: event.value,
      SortDesc: this.sortType === event.value ? (this.gridInfo.SortDesc === 'asc' ? 'desc' : 'asc') : 'asc'
    };
    this.sortType = event.value;
    const dataTag = await this.userGroupService.getAllTag(this.gridInfo, this.searchParamRequest);
    const { success, content, itemsPerPage, totalItems } = dataTag;
    if (success) {
      this.dataSource = content;
      this.pageInfo.pageSize = itemsPerPage;
      this.pageInfo.total = totalItems;
    }
  }

  onClickSearchBtn() {
  }
  onRowActions(event) {
    if (event.action.actionKey === 'Delete') {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {
          title: 'Delete tag?',
          message: `Are you sure you want to delete this tag "${event.row.name}"`,
          row: event.row
        }
      });
      const dialogSubmitSubscription = dialogRef.componentInstance.confirmEvent.subscribe(async deletedData => {
        if (deletedData.payload.name === "All Tags") {
          this.userGroupService.showAlert(`It is not possible to remove the tag "All Tags"`, MessageType.Error);
        } else {
          const res = await this.userGroupService.deleteTagById(deletedData.payload._id);
          this.userGroupService.showAlert('Tag deleted', MessageType.Info);
          await this.onPageSourceChanged({
            pageIndex: this.gridInfo.PageIndex,
            pageSize: this.gridInfo.PageSize,
            sortName: this.gridInfo.SortName,
            sortDesc: this.gridInfo.SortDesc
          })
        }

      });
      dialogRef.afterClosed().subscribe((result) => {
        dialogSubmitSubscription.unsubscribe();
      });
    } else {
      this.openDialog({
        type: this.type,
        action: event.action.actionKey,
        row: event.row
      });
    }
  }
  openDialog(data: any) {
    let dialogRef = this.dialog.open(TagDialogComponent, {
      width: '800px',
      disableClose: false,
      data: data,
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.saveEvent.subscribe(async savedData => {
      if (savedData.message === 'TAG_NAME_ALREADY_EXISTS') {
        this.userGroupService.showAlert('The tag name already exists', MessageType.Error);
      } else {
        this.userGroupService.showAlert('Tag created', MessageType.Info);
        await this.onPageSourceChanged({
          pageIndex: this.gridInfo.PageIndex,
          pageSize: this.gridInfo.PageSize,
          sortName: this.gridInfo.SortName,
          sortDesc: this.gridInfo.SortDesc
        })
      }
    });

    const dialogUpdateSubscription = dialogRef.componentInstance.editEvent.subscribe(async updatedData => {
      if (updatedData.message === 'TAG_NAME_ALREADY_EXISTS') {
        this.userGroupService.showAlert('The tag name already exists', MessageType.Error);
      } else {
        this.userGroupService.showAlert('Tag updated', MessageType.Info);
        await this.onPageSourceChanged({
          pageIndex: this.gridInfo.PageIndex,
          pageSize: this.gridInfo.PageSize,
          sortName: this.gridInfo.SortName,
          sortDesc: this.gridInfo.SortDesc
        })
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      dialogSubmitSubscription.unsubscribe();
      dialogUpdateSubscription.unsubscribe();
    });
  }
}
