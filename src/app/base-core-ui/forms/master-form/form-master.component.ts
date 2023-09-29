import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  IterableDiffers,
  Injector,
  ChangeDetectorRef,
  DoCheck,
} from '@angular/core';
import { formatDate } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import {
  PageEvent,
  MatPaginator,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

import { GridDefine, ColumnDefine } from '../../app.core.shared.models';
import {
  ComponentData,
  PageDataInfo,
  SearchHeaderTextInfo,
  SearchHeaderNumberInfo,
  SearchHeaderDateInfo,
  SearchHeaderMultipleInfo,
  FormButtonItem,
} from '../../app.core.shared.interfaces';

import { SearchControlType, DataType } from '../../app.core.shared.enums';
import { CM_DateConfig } from '../../app.core.shared.const';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-formc-master',
  templateUrl: './form-master.component.html',
  styleUrls: ['./form-master.component.scss'],
})
export class FormMasterComponent implements AfterViewInit, DoCheck {
  @Input() GridDefinitions: GridDefine;
  @Input() DataSource: any[];

  @Input() CompDetailSection: ComponentData;
  @Input() IsStaticSource: boolean = false;
  @Input() EmptyFormText: string = 'form-master.emptyformtext';

  @Output() OnRowActions = new EventEmitter<any>();
  @Output() OnDetailSectionActions = new EventEmitter<any>();
  @Output() OnPageSourceChanged = new EventEmitter<any>();
  @Output() OnFormActions = new EventEmitter<any>();
  @Output() OnSearchActions = new EventEmitter<any>();
  @Output() OnClearSearchActions = new EventEmitter<any>();
  @Output() OnChangeSelection = new EventEmitter<any>();

  @Input() PageInfo: PageDataInfo;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('menuSearchTextTrigger', { static: false })
  menuSearchTextTrigger: MatMenuTrigger;
  @ViewChild('menuSearchNumberTrigger', { static: false })
  menuSearchNumberTrigger: MatMenuTrigger;
  @ViewChild('menuSearchDateTrigger', { static: false })
  menuSearchDateTrigger: MatMenuTrigger;
  @ViewChild('menuSearchMultipleSelectedTrigger', { static: false })
  menuSearchMultipleSelectedTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    if (this.IsStaticSource) {
      this.GridSource.paginator = this.paginator;
      this.GridSource.sort = this.sort;
    }
  }

  @Input() ButtonList: FormButtonItem[];
  @Input() IsMultiSelect: boolean = true;

  GridSource: MatTableDataSource<any>;
  SearchType = SearchControlType;
  DataColumnType = DataType;
  selection = new SelectionModel<any>(true, []);
  showDetailSection: boolean;
  showPaginator: boolean;
  isSearching: boolean = false;
  searchingText: string = '';

  pageEventInfo: PageEvent;
  sortEventInfo: Sort;

  searchDefaultObject = {
    searchTextInfo: { value: '' },
    searchNumberInfo: { minValue: undefined, maxValue: undefined },
    searchDateInfo: { fromDate: undefined, toDate: undefined },
    searchMultipleInfo: { selectOptions: [] },
  };

  searchHeaderTextInfoObject: SearchHeaderTextInfo = {
    columnName: '',
    columnDef: '',
    value: '',
    type: 'Text',
  };
  searchHeaderNumberInfoObject: SearchHeaderNumberInfo = {
    columnName: '',
    columnDef: '',
    minValue: undefined,
    maxValue: undefined,
    type: 'Number',
  };
  searchHeaderDateInfoObject: SearchHeaderDateInfo = {
    columnName: '',
    columnDef: '',
    fromDate: undefined,
    toDate: undefined,
    type: 'DateTime',
  };
  searchHeaderMultipleSelectedInfoObject: SearchHeaderMultipleInfo = {
    columnName: '',
    columnDef: '',
    selectOptions: [],
    type: 'Multiple',
    valueType: '',
  };

  searchMultipleSelectedControl = new FormControl();

  private differ: any;
  private differs: IterableDiffers | null;

  constructor(injector: Injector, private cdr: ChangeDetectorRef) {
    this.showDetailSection = false;
    this.GridSource = new MatTableDataSource<any>();

    this.differs = injector.get(IterableDiffers, null);
    if (this.differs !== null) {
      this.differ = this.differs.find([]).create();
    }
  }
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */

  isSortColumn(columnDef: any) {
    if (
      this.sortEventInfo &&
      this.sortEventInfo.direction !== '' &&
      columnDef === this.sortEventInfo.active
    ) {
      return true;
    }
    return false;
  }

  ngAfterViewInit() {
    this.selection = new SelectionModel<any>(this.IsMultiSelect, []);
    this.selection.changed.subscribe((value) => {
      this.OnChangeSelection.emit(value);
    });
    //this.GridSource.paginator = this.paginator;

    //your code to update the model
    this.cdr.detectChanges();
  }

  ngDoCheck() {
    const change = this.differ.diff(this.DataSource);
    if (change) {
      this.GridSource = new MatTableDataSource<any>(this.DataSource);

      let dataSelection = this.GridSource.data.filter(
        (source) =>
          this.selection.selected.filter(
            (selected) =>
              source[Object.keys(source)[0]] ===
              selected[Object.keys(selected)[0]]
          ).length > 0
      );
      this.selection.clear();
      dataSelection.forEach((data) => {
        this.selection.select(data);
      });

      if (this.IsStaticSource) {
        this.GridSource.paginator = this.paginator;
        this.GridSource.sort = this.sort;

        // Overrride default filter behaviour of Material Datatable
        this.GridSource.filterPredicate = this.createStaticFilter();
      } else if (this.paginator && this.DataSource) {
        if (this.PageInfo.resetPage) {
          this.PageInfo.resetPage = false;
          this.paginator.firstPage();
        } else if (
          this.DataSource.length <= 0 &&
          (this.PageInfo.total ? this.PageInfo.total : 0) > 0 &&
          this.paginator.hasPreviousPage()
        ) {
          this.paginator.previousPage();
        }
      }

      this.showPaginator = true;
    }
  }

  isShowEmptyForm() {
    return (
      this.GridSource === null ||
      this.GridSource === undefined ||
      this.PageInfo === null ||
      this.PageInfo === undefined ||
      this.PageInfo.total === undefined ||
      (this.GridSource.data.length <= 0 && this.PageInfo.total <= 0)
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.GridSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.GridSource.data.forEach((row) => this.selection.select(row));
  }

  RowActions(action: any, row: any) {
    this.showDetailSection =
      action.showDetail !== null ? action.showDetail : false;

    this.OnRowActions.emit({ action, row });
  }

  onDetailEvents(event: any) {
    if (
      event !== null &&
      event !== undefined &&
      event.hasOwnProperty('showDetailSection')
    ) {
      this.showDetailSection =
        event.showDetailSection !== null ? event.showDetailSection : false;
    }
    this.OnDetailSectionActions.emit(event);
  }

  onPageChange(pageEvent: PageEvent) {
    if (!this.IsStaticSource) {
      this.pageEventInfo = pageEvent;
      this.onFireSourceChanged(this.pageEventInfo, this.sortEventInfo);
    }
  }
  onSortChange(sort: Sort) {
    if (!this.IsStaticSource) {
      this.sortEventInfo = sort;
      this.onFireSourceChanged(this.pageEventInfo, this.sortEventInfo);
    }
  }

  onFireSourceChanged(pageInfo: PageEvent, sortInfo: Sort) {
    if (!this.IsStaticSource) {
      this.OnPageSourceChanged.emit({
        pageIndex: pageInfo ? pageInfo.pageIndex : 0,
        pageSize:
          pageInfo ? pageInfo.pageSize : this.PageInfo.pageSize,
        sortName: sortInfo ? sortInfo.active : '',
        sortDesc: sortInfo ? sortInfo.direction : '',
      });
    }
  }

  ActionClicked(item: any) {
    this.showDetailSection = item.showDetail !== null ? item.showDetail : false;
    this.OnFormActions.emit(item);
  }

  menuSearchTextOpened(column: ColumnDefine) {
    this.searchHeaderTextInfoObject.columnName = column.header;
    this.searchHeaderTextInfoObject.columnDef = column.columnDef;
    this.searchHeaderTextInfoObject.value = '';
  }

  menuSearchNumberOpened(column: ColumnDefine) {
    this.searchHeaderNumberInfoObject.columnName = column.header;
    this.searchHeaderNumberInfoObject.columnDef = column.columnDef;
    this.searchHeaderNumberInfoObject.minValue = undefined;
    this.searchHeaderNumberInfoObject.maxValue = undefined;
  }

  menuSearchDateOpened(column: ColumnDefine) {
    this.searchHeaderDateInfoObject.columnName = column.header;
    this.searchHeaderDateInfoObject.columnDef = column.columnDef;
    this.searchHeaderDateInfoObject.fromDate = undefined;
    this.searchHeaderDateInfoObject.toDate = undefined;
  }

  menuSearchMultipleSelectedOpened(column: ColumnDefine) {
    this.searchHeaderMultipleSelectedInfoObject.columnName = column.header;
    this.searchHeaderMultipleSelectedInfoObject.columnDef = column.columnDef;
    this.searchHeaderMultipleSelectedInfoObject.selectOptions = [];
    if (
      column.searchDefaultInfo &&
      column.searchDefaultInfo.searchMultipleItem &&
      column.searchDefaultInfo.searchMultipleItem.selectOptions
    ) {
      this.searchHeaderMultipleSelectedInfoObject.valueType =
        column.searchDefaultInfo.searchMultipleItem.valueType;
      this.searchHeaderMultipleSelectedInfoObject.selectOptions =
        column.searchDefaultInfo.searchMultipleItem.selectOptions;
    }
  }

  menuSearchTextAction(data: any) {
    this.menuSearchTextTrigger.closeMenu();
    let item = data.searchItem as SearchHeaderTextInfo;
    if (data.action === 'search' && item.value !== '') {
      this.isSearching = true;
      this.searchingText =
        'Searching By ' + item.columnName + ': ' + item.value;
    }
    if (this.IsStaticSource) {
      if (data.action === 'search') {
        this.staticFilterChange(item);
      }
    } else {
      if (data.action === 'search') {
        this.OnSearchActions.emit(data.searchItem);
      }
    }
  }

  menuSearchNumberAction(data: any) {
    this.menuSearchNumberTrigger.closeMenu();
    let item = data.searchItem as SearchHeaderNumberInfo;
    if (data.action === 'search' && (item.minValue || item.maxValue)) {
      this.isSearching = true;
      let fromValue = '';
      let toValue = '';
      if (item.minValue) fromValue = ' From ' + item.minValue;
      if (item.maxValue) toValue = ' To ' + item.maxValue;
      this.searchingText =
        'Searching By ' + item.columnName + ': ' + fromValue + toValue;
    }
    if (this.IsStaticSource) {
      if (data.action === 'search') {
        this.staticFilterChange(item);
      }
    } else {
      if (data.action === 'search') {
        this.OnSearchActions.emit(data.searchItem);
      }
    }
  }

  menuSearchDateAction(data: any) {
    this.menuSearchDateTrigger.closeMenu();
    let item = data.searchItem as SearchHeaderDateInfo;

    if (data.action === 'search' && (item.fromDate || item.toDate)) {
      this.isSearching = true;
      let fromValue = '';
      let toValue = '';

      if (item.fromDate)
        fromValue =
          ' From Date ' +
          formatDate(item.fromDate, CM_DateConfig.format, CM_DateConfig.locale);
      if (item.toDate)
        toValue =
          ' To Date ' +
          formatDate(item.toDate, CM_DateConfig.format, CM_DateConfig.locale);
      this.searchingText =
        'Searching By ' + item.columnName + ': ' + fromValue + toValue;
    }
    if (this.IsStaticSource) {
      if (data.action === 'search') {
        this.staticFilterChange(item);
      }
    } else {
      if (data.action === 'search') {
        this.OnSearchActions.emit(data.searchItem);
      }
    }
  }

  menuSearchMultipleSelectedAction(data: any) {
    this.menuSearchMultipleSelectedTrigger.closeMenu();
    let item = data.searchItem as SearchHeaderMultipleInfo;
    if (
      data.action === 'search' &&
      item.selectOptions &&
      item.selectOptions.length > 0
    ) {
      this.isSearching = true;
      let values = item.selectOptions.map((s) => s.text);
      this.searchingText =
        'Searching By ' + item.columnName + ': ' + values.join('|');
    }
    if (this.IsStaticSource) {
      if (data.action === 'search') {
        this.staticFilterChange(item);
      }
    } else {
      if (data.action === 'search') {
        this.OnSearchActions.emit(data.searchItem);
      }
    }
  }

  createStaticFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;

      let searchText = searchTerms as SearchHeaderTextInfo;
      let searchNumber = searchTerms as SearchHeaderNumberInfo;
      let searchDateTime = searchTerms as SearchHeaderDateInfo;
      let searchMultiple = searchTerms as SearchHeaderMultipleInfo;

      if (searchTerms.type === 'Text') {
        if (searchText.value !== '') {
          isFilterSet = true;
        }
      }

      if (searchTerms.type === 'Number') {
        if (searchNumber.minValue || searchNumber.maxValue) {
          isFilterSet = true;
        }
      }

      if (searchTerms.type === 'DateTime') {
        if (searchDateTime.fromDate || searchDateTime.toDate) {
          isFilterSet = true;
        }
      }

      if (searchTerms.type === 'Multiple') {
        if (
          searchMultiple.selectOptions &&
          searchMultiple.selectOptions.length > 0
        ) {
          isFilterSet = true;
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet && searchTerms.type === 'Text') {
          let value = searchText.value.trim().toLowerCase().split(' ');
          if (
            data[searchText.columnDef]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1 &&
            isFilterSet
          ) {
            found = true;
          }
          return found;
        } else if (isFilterSet && searchTerms.type === 'Number') {
          let searchData = data[searchNumber.columnDef].toString();
          let colNum: number = 0;
          if (!isNaN(Number(searchData))) {
            colNum = Number(searchData);
            if (searchNumber.minValue && searchNumber.maxValue) {
              found =
                colNum >= searchNumber.minValue &&
                colNum <= searchNumber.maxValue;
            } else if (searchNumber.minValue) {
              found = colNum >= searchNumber.minValue;
            } else if (searchNumber.maxValue) {
              found = colNum <= searchNumber.maxValue;
            }
          }
          return found;
        } else if (isFilterSet && searchTerms.type === 'DateTime') {
          let searchData = data[searchDateTime.columnDef].toString();
          if (!isNaN(Date.parse(searchData))) {
            let colDate: Date = data[searchDateTime.columnDef];
            if (searchDateTime.fromDate && searchDateTime.toDate) {
              found =
                colDate >= new Date(searchDateTime.fromDate) &&
                colDate <= new Date(searchDateTime.toDate);
            } else if (searchDateTime.fromDate) {
              found = colDate >= new Date(searchDateTime.fromDate);
            } else if (searchDateTime.toDate) {
              found = colDate <= new Date(searchDateTime.toDate);
            }
          }
          return found;
        } else if (isFilterSet && searchTerms.type === 'Multiple') {
          let searchData = data[searchMultiple.columnDef].toString();
          let selectedValues: string[] = searchMultiple.selectOptions.map(
            (s) => s.text
          );
          found = selectedValues.includes(searchData);
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }
  // Called on Filter change
  staticFilterChange(searchItem: any) {
    this.GridSource.filter = JSON.stringify(searchItem);
  }

  // Reset table filters
  staticResetFilters() {
    this.GridSource.filter = '';
  }

  onClearSearch() {
    this.isSearching = false;
    this.searchingText = '';
    this.staticResetFilters();
    this.OnClearSearchActions.emit();
  }

  disabledRow(row: any) {
    if (row.Disabled) return true;
    return false;
  }

  displayActions(row: any) {
    let displayActions: any = [];
    let listColumnActions: any = [];
    this.GridDefinitions.columns.forEach((column) => {
      if (listColumnActions.indexOf(column.linkAction) === -1) {
        listColumnActions.push(column.linkAction);
      }
    });

    this.GridDefinitions.rowActions.forEach((action) => {
      if (
        (!row.DisabledActions ||
          row.DisabledActions.indexOf(action.actionKey) === -1) &&
        listColumnActions.indexOf(action.actionKey) === -1
      ) {
        displayActions.push(action);
      }
    });

    return displayActions;
  }

  isDisplayedLinkAction(row: any, linkAction: any) {
    let isShow = false;

    this.GridDefinitions.rowActions.forEach((action) => {
      if (
        (!row.DisabledActions ||
          row.DisabledActions.indexOf(linkAction) === -1) &&
        action.actionKey === linkAction
      )
        isShow = true;
    });

    return isShow;
  }

  executeLinkAction(linkAction: any, row: any) {
    this.GridDefinitions.rowActions.forEach((action) => {
      if (action.actionKey === linkAction) this.RowActions(action, row);
    });
  }

  columnsWithoutAction() {
    return this.GridDefinitions.columns.filter(
      (item) => item.columnDef !== 'actions'
    );
  }

  checkDefinedColumnAction() {
    return (
      this.GridDefinitions.columns.filter(
        (item) => item.columnDef === 'actions'
      ).length > 0
    );
  }

  get columnAction() {
    return this.GridDefinitions.columns.filter(
      (item) => item.columnDef === 'actions'
    )[0];
  }
}

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  ITEMS_PER_PAGE = 'paginator.items_per_page';
  NEXT_PAGE = 'paginator.next_page';
  PREV_PAGE = 'paginator.previous_page';
  FIRST_PAGE = 'paginator.first_page';
  LAST_PAGE = 'paginator.last_page';
  OF = 'paginator.of';

  public constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange.subscribe((e: Event) => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }
  public override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    length = Math.max(length, 0);
    const of = this.translate.instant(this.OF);
    let startIndex: number = page * pageSize;
    let endIndex: number = Math.min(startIndex + pageSize, length);
    startIndex = Math.min(startIndex + 1, length);

    return `${startIndex} - ${endIndex} ${of} ${length}`;
  };

  public getAndInitTranslations(): void {
    this.translate
      .get([
        this.ITEMS_PER_PAGE,
        this.NEXT_PAGE,
        this.PREV_PAGE,
        this.FIRST_PAGE,
        this.LAST_PAGE,
      ])
      .subscribe((translation: any) => {
        this.itemsPerPageLabel = translation[this.ITEMS_PER_PAGE];
        this.nextPageLabel = translation[this.NEXT_PAGE];
        this.previousPageLabel = translation[this.PREV_PAGE];
        this.firstPageLabel = translation[this.FIRST_PAGE];
        this.lastPageLabel = translation[this.LAST_PAGE];

        this.changes.next();
      });
  }
}

/* matSortDisabled= "true/false" : binding this value if you want enable or disable sort function on table.
 * disabled = "true/false"  on a single mat-sort-header to enable or disable sort function on a column.
 *
 */
