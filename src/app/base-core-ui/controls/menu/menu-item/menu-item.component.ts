import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Menu, MenuItem } from 'src/app/base-core-ui/app.core.shared.models';
import { CoreUIService } from 'src/app/base-core-ui/services/service-base.service';
import { AppConst } from 'src/app/common/const';

@Component({
  selector: 'app-ctr-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input() menu: Menu;
  @Input() menuItem: MenuItem;
  @Input() refixLabel = '';

  @Output() OnMenuItemClick = new EventEmitter<MenuItem>();
  currentRoute: string;
  isActive: Boolean;
  isDropDownActive: Boolean = false;
  SubscriptionOnGetActiveRouter: Subscription;

  constructor(private router: Router, private coreService: CoreUIService) {}

  ngOnInit() {
    this.SubscriptionOnGetActiveRouter = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        let routeUrl = event['url'];
        this.onSetActivatedMenu(routeUrl);
      });
    this.onCheckActiveMenu();
  }

  onSetActivatedMenu(routeUrl: String) {
    this.currentRoute = routeUrl.substring(1, routeUrl.length);
    this.isActive = this.checkIsActive(this.menuItem);
    this.isDropDownActive = this.isActive;
  }

  onCheckActiveMenu() {
    // Check for reload page
    let routeUrl = this.router['url'];
    this.onSetActivatedMenu(routeUrl);
  }

  getMenuItemClass() {
    if (this.menuItem.visible === false) return 'd-none';

    if (this.menuItem.haveChildren() === true) return 'sidebar-dropdown';

    return '';
  }

  clickDropDownMenuItem() {
    this.isDropDownActive = !this.isDropDownActive;
  }

  checkIsActiveItems(menuItems: MenuItem[]): boolean {
    let isActive = false;
    if (menuItems && menuItems.length > 0) {
      for (let index = 0; index < menuItems.length; index++) {
        if (!isActive && this.checkIsActive(menuItems[index])) {
          isActive = true;
        }
      }
    }
    return isActive;
  }

  checkIsActive(menuItem: MenuItem): boolean {
    let activeMenuItem = sessionStorage.getItem(
      AppConst.SessionStorage.activeMenu
    );
    if (menuItem.link === this.currentRoute) {
      if (!activeMenuItem || activeMenuItem === '') {
        this.OnMenuItemClick.emit(menuItem);
      }
      return true;
    } else if (
      !this.checkRouteExisted(this.menu.menuItems) &&
      menuItem.link === activeMenuItem
    ) {
      return true;
    } else {
      return this.checkIsActiveItems(menuItem.children);
    }
  }

  checkRouteExisted(menuItems: MenuItem[]) {
    if (!menuItems || menuItems.length <= 0) return false;
    else {
      if (menuItems.findIndex((item) => item.link === this.currentRoute) >= 0) {
        return true;
      } else {
        let result = false;
        menuItems.forEach((item) => {
          if (!result && this.checkRouteExisted(item.children)) result = true;
        });
        return result;
      }
    }
  }

  ngOnDestroy() {
    this.SubscriptionOnGetActiveRouter.unsubscribe();
  }

  // Event handler
  menuItemClick(menuItem: MenuItem) {
    // raise event
    this.OnMenuItemClick.emit(menuItem);
    this.reloadCurrentRoute(menuItem);
  }

  getMenuId(menuItem: any, isGetId: any): string {
    return (
      (isGetId !== true ? '#' : '') +
      menuItem.name.replace(/\s/g, '').split('-').join('').split('.').join('') +
      menuItem.id
    );
  }

  reloadCurrentRoute(menuItem: MenuItem) {
    let currentUrl = this.router.url;
    if (menuItem.link === currentUrl.substring(1, currentUrl.length)) {
      // TODO: Should check this reload method later
      this.coreService.reloadCurrentPage();
    }
  }
}
