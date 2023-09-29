import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { PermissionService } from 'src/app/services/permission-service';
import { MasterService } from 'src/app/services/master-service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
  constructor(
    private router: Router,
    private auth: AuthService,
    private permissionService: PermissionService,
    private masterService: MasterService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    this.masterService.reloadTitlePage(route.data['title']);

    let isPermission = true;
    if (route.data['domain'] && route.data['permission']) {
      isPermission = this.permissionService.checkPermissions(
        route.data['domain'],
        route.data['permission'],
        true
      );
    }
    if (this.auth.isAuthenticated()) {
      if (!isPermission) window.location.href = '/not-found.html';
      // logged in so return true
      return true;
    } else if (!window.location.href.endsWith('/login')) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }
    return false;
  }
}
