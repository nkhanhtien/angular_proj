import { EnControlType } from '../enums/control-types.enum';
import { ControlBase } from './control-base-model';

export class SlideToggleControlBase extends ControlBase<string> {
  override controlType = EnControlType.SlideToggle;
  type: string;
  labelTrue: string;
  labelFalse: string;

  constructor(options: any = {}) {
    super(options);
    this.type = options['type'] || '';
    this.labelTrue = options['labelTrue'] || '';
    this.labelFalse = options['labelFalse'] || '';
  }
}

export class AutoCompleteTextBoxControlBase extends ControlBase<string> {
  override controlType = EnControlType.AutoCompleteTextBox;
  type: string;
  items: any[] = [];
  placeholder: string;

  constructor(options: any = {}) {
    super(options);
    this.type = options['type'] || '';
    this.items = options['items'] || [];
    this.placeholder = options['placeholder'] || '';
  }
}

export class TextBoxControlBase extends ControlBase<string> {
  override controlType = EnControlType.TextBox;
  type: string;
  placeholder: string;
  icon: string;
  numberDecimal: number;

  constructor(options: any = {}) {
    super(options);
    this.type = options['type'] || '';
    this.placeholder = options['placeholder'] || '';
    this.icon = options['icon'];
    this.numberDecimal = options['numberDecimal'] || 0;
  }
}

export class TextBoxPasswordControlBase extends ControlBase<string> {
  override controlType = EnControlType.TextBoxPassword;
  type: string;
  placeholder: string;
  constructor(options: any = {}) {
    super(options);
    this.type = options['type'] || '';
    this.placeholder = options['placeholder'] || '';
  }
}

export class TextBoxMaskControlBase extends ControlBase<string> {
  override controlType = EnControlType.TextBoxMask;
  type: string;
  placeholder: string;
  mask: string;
  suffix: string;
  prefix: string;
  dropSpecialCharacters: boolean;
  showMaskTyped: boolean;
  patterns: any;
  specialCharacters: string[];
  allowNegativeNumbers: boolean;
  thousandSeparator: string;
  separatorLimit: string;
  hiddenInput: boolean;
  leadZeroDateTime: boolean;
  validation: boolean;

  constructor(options: any = {}) {
    super(options);
    this.type = options['type'] || '';
    this.placeholder = options['placeholder'] || '_';
    this.mask = options['mask'] || '';
    this.suffix = options['suffix'] || '';
    this.prefix = options['prefix'] || '';
    this.dropSpecialCharacters = options['dropSpecialCharacters'] || false;
    this.specialCharacters = options['specialCharacters'] || [];
    this.showMaskTyped =
      options['showMaskTyped'] === undefined ||
      options['showMaskTyped'] === true
        ? true
        : false;
    this.patterns = options['patterns'] || null;
    this.allowNegativeNumbers = options['allowNegativeNumbers'] || false;
    this.thousandSeparator = options['thousandSeparator'] || '';
    this.separatorLimit = options['separatorLimit'] || '';
    this.hiddenInput = options['hiddenInput'] || false;
    this.leadZeroDateTime = options['leadZeroDateTime'] || false;
    this.validation = options['validation'] || true;
  }
}

export class DropdownControlBase extends ControlBase<string> {
  override controlType = EnControlType.Dropdown;
  items: any[] = [];
  placeholder: string;

  constructor(options: any = {}) {
    super(options);
    this.items = options['items'] || [];
    this.placeholder = options['placeholder'] || '';
  }
}

export class DropdownMultipleSelectControlBase extends ControlBase<string> {
  override controlType = EnControlType.DropdownMultipleSelect;
  items: any[] = [];
  placeholder: string;

  constructor(options: any = {}) {
    super(options);
    this.items = options['items'] || [];
    this.placeholder = options['placeholder'] || '';
  }
}

export class DateTimeControlBase extends ControlBase<string> {
  override controlType = EnControlType.DateTime;
  type: string;
  minDate: Date;

  constructor(options: any = {}) {
    super(options);
    this.type = options['type'] || '';
    this.minDate = options['minDate'] || new Date(1900, 0, 1);
  }
}

export class CheckBoxListControlBase extends ControlBase<string> {
  override controlType = EnControlType.CheckBoxList;
  items: any[] = [];

  constructor(options: any = {}) {
    super(options);
    this.items = options['items'] || [];
  }
}

export class CheckBoxControlBase extends ControlBase<string> {
  override controlType = EnControlType.CheckBox;
  type: string;

  constructor(options: any = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class RadioButtonListControlBase extends ControlBase<string> {
  override controlType = EnControlType.RadioButtonList;
  items: any[] = [];
  constructor(options: any = {}) {
    super(options);
    this.items = options['items'] || [];
  }
}

export class VerHorListControlBase extends ControlBase<string> {
  override controlType = EnControlType.VerticalHorizontalList;
  constructor(options: any = {}) {
    super(options);
  }
}

export class EmptyControl extends ControlBase<string> {
  override controlType = EnControlType.EmptyControl;
  constructor(options: any = {}) {
    super(options);
  }
}

export class TextViewControl extends ControlBase<string> {
  override controlType = EnControlType.TextViewControl;
  constructor(options: any = {}) {
    super(options);
  }
}

export class WizardBottomControlBase extends ControlBase<string> {
  override controlType = EnControlType.WizardBottomControl;
  prefix: string;
  suffix: string;
  constructor(options: any = {}) {
    super(options);

    this.prefix = options['prefix'] || '';
    this.suffix = options['suffix'] || '';
  }
}

export class MenuItem {
  public id: number;
  public name: string;
  public children: MenuItem[];
  public icon: string;
  public visible: boolean;
  public expand: boolean;
  public link: string;

  constructor(
    id: number,
    name: string,
    children: MenuItem[],
    icon: string,
    visible: boolean = true,
    link: string = ''
  ) {
    this.name = name;
    this.children = children;
    this.icon = icon;
    this.visible = visible;
    this.id = id;
    this.link = link;
    this.expand = this.children && this.children.length > 0;
  }

  // check if this menu item has children
  public haveChildren(): boolean {
    return (
      this.children !== null &&
      this.children !== undefined &&
      this.children.length > 0
    );
  }

  // recursive loop to interate menu item's internal children with action
  public static iterateThroughAllChildrenOfMenuItem(
    menuItem: MenuItem,
    action: (menuItem: MenuItem) => void
  ) {
    if (menuItem.haveChildren() === true) {
      for (let child of menuItem.children) {
        MenuItem.iterateThroughAllChildrenOfMenuItem(child, action);
        if (typeof action === 'function') {
          action(child);
        }
      }
    }
  }

  // atleast 1 visible child
  public hasVisibleChild(): boolean {
    for (let item of this.children) {
      if (item.visible === true) return true;
    }
    return false;
  }
}

export class Menu {
  public name: string;

  public menuItems: MenuItem[];

  // have menu filter search
  public haveSearchBar: boolean;

  public isShow: boolean;

  constructor(
    name: string,
    menuItems: MenuItem[],
    haveSearchBar: boolean = true,
    isShow: boolean = true
  ) {
    this.name = name;
    this.menuItems = menuItems;
    this.haveSearchBar = haveSearchBar;
    this.isShow = isShow;
  }

  // loop through all menu items of menu
  public iterateThroughMenu(
    menu: Menu,
    action: (menuItm: MenuItem) => void
  ): void {
    for (let rootLevelItem of menu.menuItems) {
      MenuItem.iterateThroughAllChildrenOfMenuItem(rootLevelItem, action);
      action(rootLevelItem);
    }
  }
}
