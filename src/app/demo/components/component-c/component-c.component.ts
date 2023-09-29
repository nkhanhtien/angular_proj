import { Component } from '@angular/core';
import { DemoService } from '../../services/demo.service';
import { GridDefine } from 'src/app/base-core-ui/app.core.shared.models';
@Component({
  selector: 'app-component-c',
  templateUrl: './component-c.component.html',
  styleUrls: ['./component-c.component.scss'],
})
export class ComponentCComponent {
  gridDefinitions: GridDefine = new GridDefine();
  dataSource: any[];

  constructor(private demoService: DemoService) {}

  get DataTreeNode2() {
    return this.demoService.TREE_DATA2;
  }
}
