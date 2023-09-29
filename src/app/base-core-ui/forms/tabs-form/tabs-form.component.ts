import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentData, TabItem } from '../../app.core.shared.interfaces';

@Component({
  selector: 'app-formc-tabs',
  templateUrl: './tabs-form.component.html',
})
export class FormTabsComponent {
  @Input() TabItems: TabItem[];
  @Input() CompDetailSection: ComponentData;
  @Input() IsAutoReloadTab: boolean = false;
  @Input() TabHeaderStyle: any;

  @Output() OnTabChanges = new EventEmitter<any>();

  constructor() {}

  onTabChanges(tabItem: TabItem) {
    if (tabItem.isLoadSelected) {
      this.CompDetailSection = tabItem.componentSection;
    }

    if (tabItem.notifyChange) {
      this.OnTabChanges.emit(tabItem);
    }
  }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
