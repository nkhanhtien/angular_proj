import { Component, OnInit } from '@angular/core';
import {
  ComponentData,
  TabItem,
} from 'src/app/base-core-ui/app.core.shared.interfaces';
import { ComponentAComponent } from '../../components/component-a/component-a.component';
import { ComponentBComponent } from '../../components/component-b/component-b.component';
import { ComponentCComponent } from '../../components/component-c/component-c.component';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-demo-2-form',
  templateUrl: './demo-2-form.component.html',
  styleUrls: ['./demo-2-form.component.scss'],
})
export class Demo2FormComponent implements OnInit {
  compDetailSection: ComponentData;

  constructor(private demoService: DemoService) {}

  ngOnInit() {
    this.compDetailSection = {
      componentType: ComponentAComponent,
      inputs: {},
    };
  }

  get tabItems() {
    return this.demoService.tabItems;
  }

  onTabChanges(item: TabItem) {
    if (item === null || item === undefined) return;
    let componentName;
    if (item.key === 'tabRoles') {
      componentName = ComponentAComponent;
    }
    if (item.key === 'tabGroups') {
      componentName = ComponentBComponent;
    }
    if (item.key === 'tabTrees') {
      componentName = ComponentCComponent;
    }
    if (componentName !== undefined) {
      this.compDetailSection = {
        componentType: componentName,
        inputs: {},
      };
    }
  }
}
