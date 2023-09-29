import { Component, Input, OnInit } from '@angular/core';
import { NavBox, NavItem } from '../../app.core.shared.interfaces';

@Component({
  selector: 'app-ctr-nav-box',
  templateUrl: './nav-box.component.html',
  styleUrls: ['./nav-box.component.css'],
})
export class NavBoxComponent implements OnInit {
  @Input() Box: NavBox;
  NavRoot: NavItem;
  constructor() {}
  ngOnInit() {
    this.NavRoot = {
      title: 'Main Memu',
      icon: 'fas fa-home',
      isGroup: false,
      navKey: 'Root',
      level: -1,
      items: undefined,
    };
  }

  NavItemClicked(navItem: NavItem, group: NavItem) {
    navItem.showItems = true;
    this.Box.NavShowedGroup = [navItem];

    if (group.parentKey === undefined || group.parentKey.trim().length === 0) {
      this.Box.NavSelectedGroup = [this.NavRoot];
    } else {
      this.Box.NavSelectedGroup.push(group);
    }
  }

  NavSelectedGroupClicked(navItem: NavItem) {
    let index = this.Box.NavSelectedGroup.indexOf(navItem);
    if (index === 0) {
      this.Box.NavShowedGroup = this.Box.NavSource;
      this.Box.NavSelectedGroup = [];
    } else {
      this.Box.NavShowedGroup = [navItem];
      this.Box.NavSelectedGroup.splice(index);
    }
  }

  NavBackItemClicked(group: any) {
    if (this.Box.NavSelectedGroup.length > 0) {
      //Remove last item of NavSelectedGroup;
      let lastNav = this.Box.NavSelectedGroup.pop();
      if (this.Box.NavSelectedGroup.length === 0) {
        this.Box.NavShowedGroup = this.Box.NavSource;
      } else {
        this.Box.NavShowedGroup = lastNav !== undefined ? [lastNav] : []; //this.Box.NavSelectedGroup.splice(1);
      }
    }
  }

  NavGroupClicked(navItem: NavItem) {
    navItem.showItems = !navItem.showItems;
  }
}
