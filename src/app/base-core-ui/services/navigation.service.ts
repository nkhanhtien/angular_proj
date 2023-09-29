import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NavItem } from '../app.core.shared.interfaces';
import { ClientRouterConfig } from '../app.core.shared.models';

@Injectable()
export class NavigationService {
  private navSource: NavItem[];

  constructor(private http: HttpClient) {}

  getApplicationMenu(routes: ClientRouterConfig) {
    this.navSource = [];
    let authModule: NavItem = {
      title: 'Authorize',
      icon: '',
      isGroup: false,
      navKey: 'AUTHORZIE',
      level: 0,
      parentKey: '',
      items: undefined,
      showItems: true,
    };
    let commonModule: NavItem = {
      title: 'MAIN',
      icon: '',
      isGroup: false,
      navKey: 'MAIN',
      level: 0,
      parentKey: '',
      items: undefined,
      showItems: false,
    };
    let demoModule: NavItem = {
      title: 'DEMO',
      icon: '',
      isGroup: false,
      navKey: 'DEMO',
      level: 0,
      parentKey: '',
      items: undefined,
      showItems: false,
    };
    let userManagementModule: NavItem = {
      title: 'User Management',
      icon: '',
      isGroup: false,
      navKey: 'USERMANAGEMENT',
      level: 0,
      parentKey: '',
      items: undefined,
      showItems: true,
    };

    let productManagementModule: NavItem = {
      title: 'Product Management',
      icon: '',
      isGroup: false,
      navKey: 'PRODUCTMANAGEMENT',
      level: 0,
      parentKey: '',
      items: undefined,
    };

    this.navSource.push(authModule);
    this.navSource.push(commonModule);
    this.navSource.push(demoModule);
    this.navSource.push(userManagementModule);
    this.navSource.push(productManagementModule);

    routes.forEach((route: any) => {
      let item: NavItem = {
        title: route.name,
        icon: '',
        path: route.path,
        isGroup: false,
        navKey: route.name,
        level: 0,
        parentKey: route.parent,
        items: undefined,
      };
      this.navSource.push(item);
    });

    //this.navSource = [
    //    { title: 'HRP', icon: '', isGroup: true, navKey: 'HRP', level: 0, parentKey: '', items: null },
    //    { title: 'Training', icon: 'glyphicon glyphicon-education', isGroup: true, navKey: 'Training', level: 0, parentKey: 'HRP', items: null },
    //    { title: 'MVC', icon: '', isGroup: true, navKey: 'MVC', level: 0, parentKey: 'Training', items: null },
    //    { title: 'SQL', icon: '', isGroup: true, navKey: 'SQL', level: 0, parentKey: 'Training', items: null },
    //    { title: 'AngularJS', icon: 'glyphicon glyphicon-text-background', isGroup: true, navKey: 'ANGULARJS', level: 0, parentKey: 'Training', items: null },

    //    { title: 'SQL Tunning', icon: '', isGroup: true, navKey: 'SQLTUNNING', level: 0, parentKey: 'SQL', items: null },
    //    { title: 'SQL Basic', icon: '', isGroup: true, navKey: 'SQLBASIC', level: 0, parentKey: 'SQL', items: null },
    //    { title: 'SQL Advance', icon: '', isGroup: true, navKey: 'SQLADVANCE', level: 0, parentKey: 'SQL', items: null },

    //    { title: 'Angular 1', icon: '', isGroup: true, navKey: 'ANGULAR1', level: 0, parentKey: 'ANGULARJS', items: null },
    //    { title: 'Angular 2', icon: '', isGroup: true, navKey: 'ANGULAR2', level: 0, parentKey: 'ANGULARJS', items: null },
    //    { title: 'Angular 4', icon: '', isGroup: true, navKey: 'ANGULAR4', level: 0, parentKey: 'ANGULARJS', items: null },

    //    { title: 'Angular Basic', icon: '', isGroup: true, navKey: 'ANGULAR1BASIC', level: 0, parentKey: 'ANGULAR1', items: null },
    //    { title: 'Angular Advance', icon: '', isGroup: true, navKey: 'ANGULAR1ADVANCE', level: 0, parentKey: 'ANGULAR1', items: null },
    //    { title: 'Animation', icon: '', isGroup: true, navKey: 'ANGULAR1ANIMATION', level: 0, parentKey: 'ANGULAR1', items: null },

    //    { title: 'Angular 2 Basic', icon: '', isGroup: true, navKey: 'ANGULAR2BASIC', level: 0, parentKey: 'ANGULAR2', items: null },
    //    { title: 'Angular 2 Advance', icon: '', isGroup: true, navKey: 'ANGULAR2ADVANCE', level: 0, parentKey: 'ANGULAR2', items: null },
    //    { title: 'Animation', icon: '', isGroup: true, navKey: 'ANGULAR2ANIMATION', level: 0, parentKey: 'ANGULAR2', items: null },

    //    { title: 'People Management', icon: '', isGroup: true, navKey: 'PEOPLEMANAGEMENT', level: 0, parentKey: 'HRP', items: null },
    //    { title: 'Payroll', icon: '', isGroup: true, navKey: 'PAYROLL', level: 0, parentKey: 'HRP', items: null },

    //    { title: 'Mobile', icon: '', isGroup: true, navKey: 'MOBILE', level: 0, parentKey: '', items: null },
    //    { title: 'Asset', icon: 'glyphicon glyphicon-usd', isGroup: true, navKey: 'ASSET', level: 0, parentKey: 'MOBILE', items: null },
    //    { title: 'Work Order', icon: '', isGroup: true, navKey: 'WORKORDER', level: 0, parentKey: 'MOBILE', items: null },

    //    { title: 'House', icon: '', isGroup: true, navKey: 'HOUSE', level: 0, parentKey: 'ASSET', items: null },
    //    { title: 'Car', icon: 'glyphicon glyphicon-cd', isGroup: true, navKey: 'CAR', level: 0, parentKey: 'ASSET', items: null },
    //    { title: 'Tree', icon: '', isGroup: true, navKey: 'TREE', level: 0, parentKey: 'ASSET', items: null },

    //    { title: 'TOYOTA', icon: 'glyphicon glyphicon-screenshot', isGroup: true, navKey: 'TOYOTA', level: 0, parentKey: 'CAR', items: null },
    //    { title: 'BMW', icon: '', isGroup: true, navKey: 'BMW', level: 0, parentKey: 'CAR', items: null },
    //    { title: 'Mercedes-Benz', icon: '', isGroup: true, navKey: 'MERCEDESBENZ', level: 0, parentKey: 'CAR', items: null },

    //    { title: 'Corolla', icon: '', isGroup: true, navKey: 'COROLLA', level: 0, parentKey: 'TOYOTA', items: null },
    //    { title: 'Camry', icon: '', isGroup: true, navKey: 'CAMRY', level: 0, parentKey: 'TOYOTA', items: null },
    //    { title: 'Innova', icon: '', isGroup: true, navKey: 'INNOVA', level: 0, parentKey: 'TOYOTA', items: null },

    //    { title: 'Contact', icon: '', isGroup: true, navKey: 'CONTACT', level: 0, parentKey: '', items: null },
    //];

    //let source: NavItem[]  = [
    //    {
    //        title: 'HRP',
    //        icon: '',
    //        isGroup: true,
    //        navKey: 'HRP',
    //        level: 0,
    //        parentKey:'',
    //        items: [
    //            {
    //                title: 'Training',
    //                icon: 'glyphicon glyphicon-education',
    //                isGroup: true,
    //                navKey: 'Training',
    //                parentKey: 'HRP',
    //                level: 1,
    //                items: [
    //                    {
    //                        title: 'MVC',
    //                        icon: '',
    //                        isGroup: false,
    //                        navKey: 'MVC',
    //                        level: 2,
    //                        parentKey: '',
    //                        items: null

    //                    },
    //                    {
    //                        title: 'SQL Server',
    //                        icon: 'glyphicon glyphicon-book',
    //                        isGroup: true,
    //                        navKey: 'SQL',
    //                        parentKey: 'Training',
    //                        level: 2,
    //                        items: [
    //                            {
    //                                title: 'Tunning SQL',
    //                                icon: ' glyphicon',
    //                                isGroup: false,
    //                                navKey: 'TunningSQL',
    //                                parentKey: 'SQL',
    //                                level: 3,
    //                                items: null
    //                            },
    //                            {
    //                                title: 'SQL Basic',
    //                                icon: '',
    //                                isGroup: false,
    //                                navKey: 'SQLBASIC',
    //                                parentKey: 'SQL',
    //                                level: 3,
    //                                items: null
    //                            },
    //                            {
    //                                title: 'SQL Advance',
    //                                icon: '',
    //                                isGroup: false,
    //                                navKey: 'SQLADVANCE',
    //                                parentKey: 'SQL',
    //                                level: 3,
    //                                items: null
    //                            }
    //                        ]
    //                    },
    //                    {
    //                        title: 'AngularJS',
    //                        icon: 'glyphicon glyphicon-text-background',
    //                        isGroup: true,
    //                        navKey: 'AngularJS',
    //                        parentKey: 'Training',
    //                        level: 2,
    //                        items: [
    //                            {
    //                                title: 'Angular 1',
    //                                icon: '',
    //                                isGroup: true,
    //                                navKey: 'Angular1',
    //                                parentKey: 'AngularJS',
    //                                level: 3,
    //                                items: [
    //                                    {
    //                                        title: 'Basic',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Angular1Basic',
    //                                        parentKey: 'Angular1',
    //                                        level: 4,
    //                                        items: null
    //                                    },
    //                                    {
    //                                        title: 'Advance',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Angular1Advance',
    //                                        parentKey: 'Angular1',
    //                                        level: 4,
    //                                        items: null
    //                                    },
    //                                    {
    //                                        title: 'Animation',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Angular1Animation',
    //                                        parentKey: 'Angular1',
    //                                        level: 4,
    //                                        items: null
    //                                    }
    //                                ]
    //                            },
    //                            {
    //                                title: 'Angular 2',
    //                                icon: '',
    //                                isGroup: true,
    //                                navKey: 'Angular2',
    //                                parentKey: 'AngularJS',
    //                                level: 3,
    //                                items: [
    //                                    {
    //                                        title: 'Basic',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Angular2Basic',
    //                                        parentKey: 'Angular2',
    //                                        level: 4,
    //                                        items: null
    //                                    },
    //                                    {
    //                                        title: 'Advance',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Angular2Advance',
    //                                        parentKey: 'Angular2',
    //                                        level: 4,
    //                                        items: null
    //                                    },
    //                                    {
    //                                        title: 'Animation',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Angular2Animation',
    //                                        parentKey: 'Angular2',
    //                                        level: 4,
    //                                        items: null
    //                                    }
    //                                ]
    //                            },
    //                            {
    //                                title: 'Angular 4',
    //                                icon: '',
    //                                isGroup: false,
    //                                navKey: 'Angular4',
    //                                parentKey: 'AngularJS',
    //                                level: 3,
    //                                items: null
    //                            }
    //                        ]
    //                    }
    //                ]
    //            },
    //            {
    //                title: 'People Management',
    //                icon: '',
    //                isGroup: false,
    //                navKey: 'PeopleManagement',
    //                parentKey: 'HRP',
    //                level: 1,
    //                items: null
    //            },
    //            {
    //                title: 'Payroll',
    //                icon: '',
    //                isGroup: false,
    //                navKey: 'Payroll',
    //                parentKey: 'HRP',
    //                level: 1,
    //                items: null
    //            }
    //        ]
    //    },
    //    {
    //        title: 'Mobile',
    //        icon: '',
    //        isGroup: true,
    //        navKey: 'Mobile',
    //        parentKey: '',
    //        level: 0,
    //        items: [
    //            {
    //                title: 'Asset',
    //                icon: 'glyphicon glyphicon-usd',
    //                isGroup: true,
    //                navKey: 'Asset',
    //                parentKey: 'Mobile',
    //                level: 1,
    //                items: [
    //                    {
    //                        title: 'House',
    //                        icon: '',
    //                        isGroup: false,
    //                        navKey: 'House',
    //                        parentKey: 'Asset',
    //                        level: 2,
    //                        items: null
    //                    },
    //                    {
    //                        title: 'Car',
    //                        icon: 'glyphicon glyphicon-cd',
    //                        isGroup: true,
    //                        navKey: 'Car',
    //                        parentKey: 'Asset',
    //                        level: 2,
    //                        items: [
    //                            {
    //                                title: 'TOYOTA',
    //                                icon: 'glyphicon glyphicon-screenshot',
    //                                isGroup: true,
    //                                navKey: 'Toyota',
    //                                parentKey: 'Car',
    //                                level: 3,
    //                                items: [
    //                                    {
    //                                        title: 'Corolla',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Corolla',
    //                                        parentKey: 'Toyota',
    //                                        level: 4,
    //                                        items: null
    //                                    },
    //                                    {
    //                                        title: 'Camry',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Camry',
    //                                        parentKey: 'Toyota',
    //                                        level: 4,
    //                                        items: null
    //                                    },
    //                                    {
    //                                        title: 'Innova',
    //                                        icon: '',
    //                                        isGroup: false,
    //                                        navKey: 'Innova',
    //                                        parentKey: 'Toyota',
    //                                        level: 4,
    //                                        items: null
    //                                    }
    //                                ]
    //                            },
    //                            {
    //                                title: 'BMW',
    //                                icon: '',
    //                                isGroup: false,
    //                                navKey: 'BMW',
    //                                parentKey: 'Car',
    //                                level: 3,
    //                                items: null
    //                            },
    //                            {
    //                                title: 'Mercedes-Benz',
    //                                icon: '',
    //                                isGroup: false,
    //                                navKey: 'Mercedes-Benz',
    //                                parentKey: 'Car',
    //                                level: 3,
    //                                items: null
    //                            }
    //                        ]
    //                    },
    //                    {
    //                        title: 'Tree',
    //                        icon: '',
    //                        isGroup: false,
    //                        navKey: 'Tree',
    //                        parentKey: 'Asset',
    //                        level: 2,
    //                        items: null
    //                    }
    //                ]
    //            },
    //            {
    //                title: 'Work Order',
    //                icon: '',
    //                isGroup: false,
    //                navKey: 'Work Order',
    //                parentKey: 'Mobile',
    //                level: 1,
    //                items: null
    //            }
    //        ]
    //    },
    //    {
    //        title: 'Contact',
    //        icon: '',
    //        isGroup: false,
    //        navKey: 'Contact',
    //        parentKey: '',
    //        level: 0,
    //        items: null
    //    }
    //];

    let menu = this.getApplicationMenuItems();

    return of(menu).pipe(delay(100)); // simulate latency with delay
  }

  getApplicationMenuItems() {
    if (this.navSource.length === 0) return;
    let mainNav: NavItem[];
    mainNav = this.navSource.filter(
      (d) => d.parentKey === undefined || d.parentKey.trim().length === 0
    );
    mainNav.forEach((route: NavItem) => {
      this.getNavItems(route);
    });
    return mainNav;
  }

  private getNavItems(item: NavItem) {
    item.items = this.navSource.filter((d) => d.parentKey === item.navKey);
    item.items.forEach((route: NavItem) => {
      this.getNavItems(route);
    });
  }
}
