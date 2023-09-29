import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  EventEmitter,
  ViewChild,
  OnChanges,
} from '@angular/core';
import {
  GridsterItem,
  GridsterItemComponent,
  GridsterItemComponentInterface,
} from 'angular-gridster2';

import { SharedService } from '../../../services/shared.service';
import { ComponentData } from '../../app.core.shared.interfaces';

import {
  DisplayGrid,
  GridType,
  DashboardConfig,
  Dashboard,
} from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() dashboard: Dashboard;
  @Input() widgets: any;
  @ViewChild('gridsterItem') gridItem: GridsterItemComponent;

  resizeEvent: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();

  options: DashboardConfig;
  public unitHeight: number;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      scrollToNewItems: false,
      disableWarnings: false,
      ignoreMarginInRow: false,
      itemResizeCallback: this.itemResize.bind(this),
    };
    this.sharedService.isSideBarOpen.subscribe(() => {
      setTimeout(() => {
        this.changedOptions();
      }, 100);
    });
  }

  public itemResize(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    itemComponent.gridster.curRowHeight +=
      (item.cols * 100 - item.rows) / 10000;
    if (itemComponent.gridster.curRowHeight > 1) {
      this.unitHeight = itemComponent.gridster.curRowHeight;
    }
  }

  ngOnChanges(): void {
    this.changedOptions();

    if (this.gridItem && this.gridItem.gridster.curRowHeight > 1) {
      this.unitHeight = this.gridItem.gridster.curRowHeight;
    }
  }

  changedOptions(): void {
    if (this.options && this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  getDynamicComponentData(item: GridsterItem): ComponentData {
    return {
      componentType: this.widgets[item['component']],
    };
  }
}
