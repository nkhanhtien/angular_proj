import { Injectable, Injector } from '@angular/core';
import { Menu, MenuItem } from '../base-core-ui/app.core.shared.models';
import { MasterService } from './master-service';
import { AppBaseService } from './service-base';
import { PermissionService } from './permission-service';
import { AppConfigService } from './app-config.service';

@Injectable()
export class MenuService extends AppBaseService {
  constructor(
    private masterService: MasterService,
    private permissionService: PermissionService,
    injector: Injector,
    configService: AppConfigService
  ) {
    super(injector, configService);
  }

  setMenu(isShowMenu: boolean) {
    var menu = new Menu(
      'SMARTUI',
      [
        // normal item
        new MenuItem(
          30,
          'dashboard.dashboard-container.dashboard',
          [],
          './assets/icons/dashboard-menu.png',
          true,
          'dashboard'
        ),

        new MenuItem(
          31,
          'dashboard.dashboard-container.demo-management',
          [
            new MenuItem(32, 'demo.demo1', [], '', true, 'demo1'),
            new MenuItem(33, 'demo.demo2', [], '', true, 'demo2'),
            new MenuItem(34, 'demo.demo3', [], '', true, 'demo3'),
          ],
          './assets/icons/corporation-menu.png',
          true,
          ''
        ),
        new MenuItem(
          0,
          'User',
          [
            new MenuItem(1, 'Admins', [], '', true, 'users/admin'),
            new MenuItem(2, 'Users', [], '', true, 'users/user'),
            new MenuItem(3, 'Import User', [], '', false, 'demo3'),
          ],
          './assets/icons/corporation-menu.png',
          true,
          ''
        ),
        new MenuItem(
          4,
          'Tags',
          [new MenuItem(5, 'Tag List', [], '', true, 'tags/tag-list')],
          './assets/icons/corporation-menu.png',
          true,
          ''
        ),
        new MenuItem(
          7,
          'Datasets',
          [
            new MenuItem(8, 'New Dataset', [], '', false, 'datasets/create'),
            new MenuItem(9, 'Dataset List', [], '', true, 'datasets'),
            new MenuItem(10, 'Dataset Details', [], '', false, 'demo3'),
          ],
          './assets/icons/corporation-menu.png',
          true,
          ''
        ),
        new MenuItem(
          11,
          'Activities',
          [
            new MenuItem(12, 'New Activity', [], '', false, 'demo1'),
            new MenuItem(13, 'Activity List', [], '', true, 'activities'),
            new MenuItem(14, 'Activity Details', [], '', false, 'demo3'),
          ],
          './assets/icons/corporation-menu.png',
          true,
          ''
        ),
        new MenuItem(
          15,
          'Jobs',
          [
            new MenuItem(16, 'Job List', [], '', false, 'demo1'),
            new MenuItem(17, 'Job Details', [], '', false, 'demo2'),
          ],
          './assets/icons/corporation-menu.png',
          false,
          ''
        ),
        new MenuItem(
          18,
          'License',
          [
            new MenuItem(19, 'License', [], '', false, 'demo1'),
            new MenuItem(20, 'Bill', [], '', false, 'demo2'),
            new MenuItem(21, 'Payment History', [], '', false, 'demo3'),
          ],
          './assets/icons/corporation-menu.png',
          false,
          ''
        ),
      ],
      false,
      isShowMenu
    );
    return menu;
  }
}
