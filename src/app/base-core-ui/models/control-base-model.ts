import { AbstractControlOptions } from '@angular/forms';
import { ControlBaseComponent } from '../base-components/control-base.component';
import { EnControlType } from '../enums/control-types.enum';
import { SubLinkView } from '../interfaces/form-interface';
import { ServiceBase } from './service-base-model';

export class ControlBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: EnControlType;
  options: { key: string; value: string }[];
  autoLoad?: boolean;
  validationMessages?: any;
  validators?: any[];
  asyncValidators?: any[];
  services?: ServiceBase[];
  notifyChanges?: boolean;
  component?: ControlBaseComponent;
  category?: string;
  updateOn?: AbstractControlOptions['updateOn'];
  style?: any;
  disabled?: boolean;
  rowGroup?: boolean;
  children?: ControlBase<T>[];
  hideTextHeader: boolean;
  classCss: string;
  subLinkUrl: SubLinkView[];
  showVertical: boolean;
  subfixTextView: string;
  [propName: string]: any;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: EnControlType;
      type?: string;
      options?: { key: string; value: string }[];

      validationMessages?: {};
      validators?: any[];
      asyncValidators?: any[];
      services?: ServiceBase[];
      autoLoad?: boolean;
      notifyChanges?: boolean;
      component?: ControlBaseComponent;
      category?: string;
      updateOn?: AbstractControlOptions['updateOn'];
      style?: {};
      disabled?: boolean;
      rowGroup?: boolean;
      children?: ControlBase<T>[];
      hideTextHeader?: boolean;
      classCss?: string;
      subLinkUrl?: SubLinkView[];
      showVertical?: boolean;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || EnControlType.TextBox;
    this.options = options.options || [];

    this.validators = options.validators;
    this.asyncValidators = options.asyncValidators;
    this.validationMessages = options.validationMessages;
    this.autoLoad = options.autoLoad ? options.autoLoad : false;
    this.services = options.services;
    this.notifyChanges = options.notifyChanges ? options.notifyChanges : false;
    this.category = options.category;
    this.updateOn = options.updateOn ? options.updateOn : 'change';
    this.style = options.style;
    this.disabled = options.disabled ? options.disabled : false;
    this.rowGroup = options.rowGroup ? options.rowGroup : false;
    this.children = options.children ? options.children : [];
    this.hideTextHeader = options.hideTextHeader
      ? options.hideTextHeader
      : false;
    this.classCss = options.classCss ? options.classCss : '';
    this.subLinkUrl = options.subLinkUrl ? options.subLinkUrl : [];
    this.showVertical = options.showVertical ? options.showVertical : false;
  }
}
