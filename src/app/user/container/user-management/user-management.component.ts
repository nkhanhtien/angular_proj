import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridDefine } from 'src/app/base-core-ui/app.core.shared.models';
import { UserService } from '../../services/user.service';
import { GridRequestInfo, PageDataInfo } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { KeycloakAdminService } from 'src/app/services/keycloak-admin.service';
import { ActionTypes, ROLES } from 'src/app/common/const';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  loading: boolean = true;
  roleName: string;
  groupId: string;
  dataSource: any[];
  gridDefinitions: GridDefine = new GridDefine();
  pageInfo: PageDataInfo = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
  };
  gridInfo: GridRequestInfo = {
    PageIndex: 0,
    PageSize: 10,
    SortName: "",
    SortDesc: "",
  };
  sortTypes = [
    { value: 'username', label: 'Username' },
    { value: 'createdTimestamp', label: 'Join Date' },
  ];
  sortType = this.sortTypes[0].value;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private keycloakAdminService: KeycloakAdminService
  ) {}

  async ngOnInit() {
    this.roleName = this.activatedRoute.snapshot.data['roleName'];
    this.gridDefinitions = this.userService.getGridDefinitions();
    await this.loadUsers();
    this.loading = false;
  }

  async loadUsers() {
    const res = await this.keycloakAdminService.getUsers(this.gridInfo, this.roleName)
    if (res) {
      this.dataSource = res.users;
      this.pageInfo.pageSize = this.gridInfo.PageSize;
      this.pageInfo.total = res.total;
    }
  }

  onRowActions(event) {
    const { action, row } = event;
    if (action.actionKey === ActionTypes.View) {
      const formatRoleName = this.roleName === ROLES.ADMIN ? 'admin' : 'user';
      this.router.navigate([`/users/${formatRoleName}/${row.id}`]);
    }
  }

  onClickCreateButton() {
    if (this.roleName === ROLES.ADMIN) {
      this.router.navigate([`/users/admin/create`]);
    } else {
      this.router.navigate([`/users/user/create`])
    }
  }

  async onPageSourceChanged(event) {
    this.gridInfo = {
      PageIndex: event.pageIndex,
      PageSize: event.pageSize,
      SortName: event.sortName,
      SortDesc: event.sortDesc
    };
    const res = await this.keycloakAdminService.getUsers(this.gridInfo, this.roleName)
    if (res) {
      this.dataSource = res.users;
      this.pageInfo.pageSize = this.gridInfo.PageSize;
      this.pageInfo.total = res.total;
    }
  }

  async onChangeSortPanel(event) {
    this.sortType = event.value;
    this.gridInfo = {
      ...this.gridInfo,
      SortName: this.sortType,
      SortDesc: 'asc'
    };
    const res = await this.keycloakAdminService.getUsers(this.gridInfo, this.roleName);
    if (res) {
      this.dataSource = res.users;
      this.pageInfo.pageSize = this.gridInfo.PageSize;
      this.pageInfo.total = res.total;
    }
  }
}
