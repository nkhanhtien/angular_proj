import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { MatPaginatedTabHeader } from '@angular/material/tabs';
import { TabItem } from '../../app.core.shared.interfaces';

@Component({
  selector: 'app-ctr-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsControlComponent implements OnInit, AfterViewInit {
  @Input() TabItems: TabItem[] = [];
  @Input() TabStyle: any;

  @Output() OnTabChanges = new EventEmitter<any>();

  @ViewChild('MatTabGroup') matTab: {
    _tabHeader: MatPaginatedTabHeader;
    selectedIndex: number;
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (
      this.TabItems.length > 0 &&
      this.TabItems.filter((item) => item.isDefault).length <= 0
    ) {
      this.TabItems[0].isDefault = true;
    }
  }

  ngAfterViewInit() {
    if (this.matTab && (this.matTab._tabHeader as MatPaginatedTabHeader)) {
      this.matTab.selectedIndex = this.TabItems.findIndex(
        (item) => item.isDefault
      );
    }
    this.cdr.detectChanges();
  }

  selectedTabValue(event: any) {
    let tabSelected = this.TabItems.filter(
      (item) =>
        item.key === event.tab._viewContainerRef.element.nativeElement.id
    );
    if (tabSelected && tabSelected.length > 0) {
      this.onTabsChange(tabSelected[0]);
    }
  }

  onTabsChange(item: any) {
    this.updateTabDefault(item);
    this.OnTabChanges.emit(item);
  }

  updateTabDefault(item: any) {
    this.TabItems.forEach((tabControl) => {
      if (tabControl.key === item.key) {
        tabControl.isDefault = true;
      } else tabControl.isDefault = false;
    });
  }
}
