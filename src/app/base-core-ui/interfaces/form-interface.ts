import { Injector, Type } from '@angular/core';
import { DragItemType, EnControlType } from '../app.core.shared.enums';
import { ControlBase } from '../models/control-base-model';

export interface ComponentData {
  key?: any;
  componentType: Type<any>;
  inputs?: any;
  outputs?: any;
  injector?: Injector;
}

export interface FormCategory {
  categoryKey: string;
  categoryName: string;
  isVisible: boolean;
  controls: ControlBase<any>[];
  expandedDefault?: boolean;
}

export interface FormSection {
  sectionKey: string;
  sectionName: string;
  isVisible: boolean;
  selectedDefault?: boolean;
  sectionData: ComponentData;
  selected?: boolean;
  error?: boolean;
  isLoaded?: boolean;
}

export interface RowAction {
  actionKey: string;
  actionLabel: string;
  primaryAction: boolean;
  showDetail?: boolean;
  icon_type?: string;
  iconColor?: string;
  customClass?: string;
}

export interface PageDataInfo {
  pageSize?: number;
  total?: number;
  pageSizeOptions?: any;
  resetPage?: boolean;
}

export interface SelectedItem {
  key: string;
  text: string;
}

export interface SearchHeaderTextInfo {
  columnName: string;
  columnDef: string;
  value: string;
  type: string;
}

export interface SearchHeaderNumberInfo {
  columnName: string;
  columnDef: string;
  minValue?: number;
  maxValue?: number;
  type: string;
}

export interface SearchHeaderDateInfo {
  columnName: string;
  columnDef: string;
  fromDate?: Date;
  toDate?: Date;
  type: string;
}

export interface SearchHeaderMultipleInfo {
  columnName: string;
  columnDef: string;
  selectOptions: SelectedItem[];
  type: string;
  valueType: string;
}

export interface SearchHeaderInfo {
  searchTextItems?: SearchHeaderTextInfo[];
  searchNumberItems?: SearchHeaderNumberInfo[];
  searchDateItems?: SearchHeaderDateInfo[];
  searchMultipleItems?: SearchHeaderMultipleInfo[];
}

export interface SearchDefaultHeaderInfo {
  searchTextItem?: SearchHeaderTextInfo;
  searchNumberItem?: SearchHeaderNumberInfo;
  searchDateItem?: SearchHeaderDateInfo;
  searchMultipleItem?: SearchHeaderMultipleInfo;
}

export interface CarouselItem {
  src: string;
  alt: string;
  index: number;
  selected: boolean;
}
export interface CarouselInfo {
  id: string;
  css: string;
  items: CarouselItem[];
}

export interface ButtonItem {
  buttonKey: string;
  buttonLabel: string;
  isVisible: boolean;
  customClass?: string;
  menuItems?: ButtonItem[];
}

export interface SubLinkView {
  linkKey: string;
  linkLabel?: string;
  linkData?: any;
}

export interface FormButtonItem extends ButtonItem {
  showDetail: boolean;
}

export interface WizardFormButtonItem extends ButtonItem {
  ActionName: string;
}

export interface TabItem {
  key?: string;
  label?: string;
  isDefault?: boolean;
  notifyChange?: boolean;
  isLoadSelected?: boolean;
  componentSection: ComponentData;
}

export interface DragItemBox {
  title?: string;
  items: DragDropItem[];
}

export interface DragDropItem {
  id: string;
  text: string;
}
export interface DragDropGroup {
  groupId: string;
  groupTitle: string;
  items: DragDropItem[];
}

export interface CardItem {
  cardClass: string;
  cardTitle: string;
  cardSubTitle: string;
  cardContent: string;
  cardAvatarClass: string;
  showAvatar?: boolean;
  cardImageUrl: string;
  cardAvatarUrl?: string;
  cardActions: ButtonItem[];
}

export interface NavBox {
  NavSearch: string;
  NavSelectedGroup: NavItem[];
  NavShowedGroup: NavItem[];
  NavSource: NavItem[];
  RootIcon: string;
}

export interface RootNavItem {
  title: string;
  items: NavItem[];
  icon: string;
}
export interface NavItem {
  title: string;
  items?: NavItem[];
  isGroup: boolean;
  icon: string;
  navKey: string;
  level: number;
  parentKey?: string;
  path?: string;
  showItems?: boolean;
}
export interface PromptModel {
  title: string;
  searchBox: string;
}

export interface AlertModel {
  title: string;
  message: string;
}

export interface ConfirmModel {
  title: string;
  message: string;
}

/*Node for to-do item*/
export class TreeItemNode {
  name: string;
  key: string;
  level?: number;
  selected?: boolean = false;
  indeterminate?: boolean = false;
  children?: TreeItemNode[] = [];
  customKey?: string;
  nameKey?: string;
}

/** Flat to-do item node with expandable and level information */
export class TreeItemFlatNode {
  name: string;
  key: string;
  level: number;
  selected?: boolean = false;
  indeterminate?: boolean = false;
  expandable: boolean;
  customKey?: string;
  nameKey?: string;
}

export interface DragPageItem {
  type: DragItemType;
  key: number;
  icon: string;
  top: number;
  left: number;
  width: number;
  height: number;
  dragDisable: boolean;
  disableText: boolean;
  dragDisplay: boolean;
  properties?: any;
}

export interface PageItem {
  pageId: number;
  items: DragPageItem[];
  width: number;
  height: number;
  pageIndex: number;
}

export interface DragTextBoxProperty {
  text: string;
  font: string;
  color: string;
}

export interface DragDropDownProperty {
  value: string;
  items: SelectedItem[];
}

/********* */
export interface PointTime {
  hour: number;
  period: string;
}

export interface CalendarItem {
  title: string;
  css?: string;
  startTime: PointTime;
  endTime: PointTime;
}

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  label: string;
  css?: string;
  items: CalendarItem[];
}

export interface CalendarWeek {
  index: number;
  days: CalendarDay[];
}

export interface CalendarMonth {
  month: number;
  year: number;
  label: string;
  weeks: CalendarWeek[];
}

export interface CalendarMember {
  key: string;
  name: string;
  icon: string;
  displayWeek?: CalendarWeek;
  days?: CalendarDay[];
}

export interface OrgCalendarWeekOfMonth {
  members: CalendarMember[];
  weeks: CalendarWeek[];
}

export interface OrgCalendarMemberFullMonth {
  members: CalendarMember[];
  days: CalendarDay[];
  titleDays: string[];
}

export interface OrgCalendarWeek {
  members: CalendarMember[];
  weeks: CalendarWeek[];
}

export interface FormActions {
  OnDetailActions(): any;
  OnComponentActions(): any;
}
