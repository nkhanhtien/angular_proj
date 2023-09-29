import { Injectable, Injector } from '@angular/core';
import { AppConst } from '../common/const';
import { AppConfigService } from './app-config.service';
import { AppBaseService } from './service-base';

@Injectable()
export class PermissionService extends AppBaseService {
  constructor(injector: Injector, configService: AppConfigService) {
    super(injector, configService);
  }

  checkPermissions(domain: any, permission: any, redirectPage = false) {
    const tempPermission = JSON.parse(
      localStorage.getItem(AppConst.LocalStorage.Auth.Permissions) || ''
    );
    if (tempPermission && tempPermission[domain]) {
      let permissionData = tempPermission[domain];

      if (
        permissionData.filter(
          (item: any) =>
            item === AppConst.Permission.AllPermission || item === permission
        ).length > 0
      ) {
        return true;
      }
    }

    if (redirectPage) {
      window.location.href = '/permission-error.html';
    }

    return false;
  }
}
