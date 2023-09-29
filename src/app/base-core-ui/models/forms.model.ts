import { DataType, SearchControlType } from '../app.core.shared.enums';
import {
  SearchDefaultHeaderInfo,
  RowAction,
} from '../app.core.shared.interfaces';
export class ColumnDefine {
  columnDef: string;
  header: string;
  dataType?: DataType;
  dataFormat?: string;
  showSearch?: boolean;
  notSort?: boolean;
  searchType?: SearchControlType;
  searchDefaultInfo?: SearchDefaultHeaderInfo;
  style?: {};
  linkAction?: string;

  cell(element: any) {
    return element[this.columnDef];
  }
  isVisible: boolean;
  constructor(options: {
    columnDef: string;
    header: string;
    dataType?: DataType;
    dataFormat?: string;
    isVisible?: boolean;
    showSearch?: boolean;
    notSort?: boolean;
    searchType?: SearchControlType;
    searchDefaultInfo?: SearchDefaultHeaderInfo;
    style?: {};
    linkAction?: string;
  }) {
    this.columnDef = options.columnDef;
    this.header = options.header;
    this.dataType = options.dataType || DataType.Text;
    this.dataFormat = options.dataFormat || '';
    this.isVisible = options.isVisible || false;
    this.showSearch = options.showSearch || false;
    this.notSort = options.notSort || false;
    this.searchType = options.searchType || SearchControlType.Text;
    this.searchDefaultInfo = options.searchDefaultInfo;
    this.style = options.style;
    this.linkAction = options.linkAction || '';
  }
}

export class GridDefine {
  columns: ColumnDefine[] = [];
  displayedColumns: string[];
  rowActions: RowAction[];
  showSearchHeader?: boolean;
  showNonePrimaryAction?: boolean;
  constructor() {
    this.columns = [];
    this.displayedColumns = [];
    this.rowActions = [];
    this.showSearchHeader = false;
    this.showNonePrimaryAction = false;
  }
  //constructor(options: {
  //    columns?: ColumDefine[],
  //    displayedColumns?: string[],
  //    rowActions?: RowAction[],
  //}) {
  //    this.columns = options.columns ? options.columns : [];
  //    this.displayedColumns = options.displayedColumns ? options.displayedColumns : [];
  //    this.rowActions = options.rowActions ? options.rowActions : [];
  //}
}
