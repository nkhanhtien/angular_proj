import {
  Draggable,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  PushDirections,
  Resizable,
} from 'angular-gridster2';

export enum DisplayGrid {
  Always = 'always',
  OnDragAndResize = 'onDrag&Resize',
  None = 'none',
}

export enum GridType {
  Fit = 'fit',
  ScrollVertical = 'scrollVertical',
  ScrollHorizontal = 'scrollHorizontal',
  Fixed = 'fixed',
  VerticalFixed = 'verticalFixed',
  HorizontalFixed = 'horizontalFixed',
}

export interface DashboardConfig extends GridsterConfig {}

export interface DashboardItem extends GridsterItem {
  component: string;
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

export interface DashboardItemComponentInterface
  extends GridsterItemComponentInterface {}

export interface DashboardWidget extends DashboardItem {}

export class Dashboard {
  splice(arg0: any, arg1: number) {
    throw new Error('Method not implemented.');
  }
  indexOf(item: any): any {
    throw new Error('Method not implemented.');
  }
  push(arg0: { x: number; y: number; cols: number; rows: number }) {
    throw new Error('Method not implemented.');
  }
  id: string;
  name: string;
  widgets: Array<DashboardWidget>;
  constructor() {
    this.id = '';
    this.name = '';
    this.widgets = new Array<DashboardWidget>();
  }
}
