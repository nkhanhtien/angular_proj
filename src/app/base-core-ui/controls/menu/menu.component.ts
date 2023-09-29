import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';
import { AppConst } from 'src/app/common/const';
import { Menu, MenuItem } from '../../app.core.shared.models';

@Component({
  selector: 'app-ctr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterContentInit {
  private _menu: Menu;

  @Output() OnHideMenu = new EventEmitter();
  @Output() OnShowMenu = new EventEmitter();
  @Output() OnMenuItemClicked = new EventEmitter<MenuItem>();
  @Input() set menu(value: Menu) {
    this._menu = value;
    this.ngAfterContentInit();
  }

  @HostBinding('attr.class') class = 'page-wrapper chiller-theme';

  get menu(): Menu {
    return this._menu;
  }

  // value of filter menu search form
  searchValue: string;

  private menuItemsFilterAction = (menuItem: MenuItem): void => {
    let containKeyword = menuItem.name
      .toLowerCase()
      .includes(this.searchValue.toLowerCase());
    if (containKeyword === true) {
      menuItem.visible = true;
    } else menuItem.visible = false;
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      if (this.menu && this.menu.isShow === true) this.showMenu();
      else this.hideMenu();
    }, 100);

    //your code to update the model
    this.cdr.detectChanges();
  }

  // Event handler
  onSearch() {
    this.menu.iterateThroughMenu(this.menu, this.menuItemsFilterAction);
  }

  hideMenu() {
    if (document.getElementsByClassName('page-wrapper').length === 1) {
      document
        .getElementsByClassName('page-wrapper')[0]
        .classList.remove('toggled');
    }
    this.OnHideMenu.emit();
  }
  showMenu() {
    if (document.getElementsByClassName('page-wrapper').length === 1) {
      document
        .getElementsByClassName('page-wrapper')[0]
        .classList.add('toggled');
    }
    this.OnShowMenu.emit();
  }

  menuItemClicked(menuItem: MenuItem) {
    sessionStorage.removeItem(AppConst.SessionStorage.activeMenu);
    sessionStorage.setItem(AppConst.SessionStorage.activeMenu, menuItem.link);
    this.OnMenuItemClicked.emit(menuItem);
  }
}
