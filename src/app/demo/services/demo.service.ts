import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Validators } from '@angular/forms';
import {
  DropdownControlBase,
  TextBoxControlBase,
  DateTimeControlBase,
  CheckBoxControlBase,
  CheckBoxListControlBase,
  AutoCompleteTextBoxControlBase,
  ControlBase,
  RadioButtonListControlBase,
  SlideToggleControlBase,
  DropdownMultipleSelectControlBase,
  TextBoxMaskControlBase,
  TextViewControl,
  ColumnDefine,
  GridDefine,
  VerHorListControlBase,
} from '../../base-core-ui/app.core.shared.models';
import { MasterService } from '../../services/master-service';
import { delay } from 'rxjs/operators';
import {
  ActionTypes,
  AppConst,
  HttpResponse,
  MessageType,
} from '../../common/const';
import { AppBaseService } from '../../services/service-base';
import {
  ButtonItem,
  SearchParamRequest,
  SelectedItem,
  TabItem,
  TreeItemNode,
} from '../../base-core-ui/app.core.shared.interfaces';
import {
  DataType,
  ParamRequestSearchType,
  SearchControlType,
} from '../../base-core-ui/app.core.shared.enums';
import { User } from '../models/demo.models';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ComponentAComponent } from '../components/component-a/component-a.component';
import { ComponentBComponent } from '../components/component-b/component-b.component';
import { ComponentCComponent } from '../components/component-c/component-c.component';

@Injectable()
export class DemoService extends AppBaseService {
  filterSelectObj: any[] = [];
  protected baseClientSourceUrl = 'clients';

  constructor(
    injector: Injector,
    private masterService: MasterService,
    configService: AppConfigService
  ) {
    super(injector, configService);
    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'Symbol',
        columnProp: 'symbol',
        options: [],
      },
      {
        name: 'NAME',
        columnProp: 'name',
        options: [],
      },
    ];

    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.data, o.columnProp);
    });
  }

  showAlert() {
    this.masterService.resetMessages();

    if (Math.random() > 0.5) {
      this.masterService.addMessages([
        {
          type: MessageType.Error,
          text: 'This alert box could indicate a dangerous or potentially negative action.',
        },
      ]);
    }
    if (Math.random() > 0.5) {
      this.masterService.addMessages([
        {
          type: MessageType.Warning,
          text: 'This alert box could indicate a warning that might need attention.',
        },
      ]);
    }
    if (Math.random() > 0.5) {
      this.masterService.addMessages([
        {
          type: MessageType.Info,
          text: 'This alert box could indicate a neutral informative change or action.',
        },
      ]);
    }
    if (Math.random() > 0.5) {
      this.masterService.addMessages([
        {
          type: MessageType.None,
          text: 'Indicates a slightly less important action.',
        },
      ]);
    }
  }

  getListOfCorporations() {
    return [
      { id: '1', name: 'Katalon' },
      { id: '2', name: 'Fanuszi' },
      { id: '3', name: 'Xcon' },
      { id: '4', name: 'Bacon' },
      { id: '5', name: 'Tuna' },
    ];
  }

  getAllControlForFormPopUp(): ControlBase<any>[] {
    const items = this.getListOfCorporations().map((item) => ({
      key: item.id,
      value: item.name,
    }));
    return [
      new DropdownControlBase({
        key: 'corporation',
        label: 'Corporation',
        placeholder: 'Select a corporation',
        value: '1',
        items: items,
        required: true,
        order: 26,
        validationMessages: {
          required: 'Corporation is required',
        },
        validators: [Validators.required],
      }),
    ];
  }

  getAllControlForForm(): ControlBase<any>[] {
    let controls = [
      new DropdownMultipleSelectControlBase({
        key: 'colors',
        label: 'Favorite colors',
        required: true,
        items: [
          { key: 'red', text: 'Red' },
          { key: 'blue', text: 'Blue' },
          { key: 'green', text: 'Green' },
          { key: 'yellow', text: 'Yellow' },
        ],
        value: ['red', 'blue'],
        validationMessages: {
          required: 'Favorite Colors is required.',
        },
        order: 3,
        validators: [Validators.required],
      }),

      new DropdownControlBase({
        key: 'brave',
        label: 'Bravery Rating',
        required: true,
        items: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        validationMessages: {
          required: 'Bravery Rating is required.',
        },
        order: 3,
        validators: [Validators.required],
      }),

      new TextBoxControlBase({
        key: 'firstName',
        label: 'demo.demo1.first-name',
        value: '', //Bombasto
        required: true,
        order: 1,
        validationMessages: {
          required: 'Name is required.',
          minlength: 'Name must be at least 4 characters long.',
          maxlength: 'Name cannot be more than 24 characters long.',
        },
        validators: [Validators.required],
      }),

      new TextBoxControlBase({
        key: 'emailAddress',
        label: 'email',
        value: 'paul@example.com',
        type: 'email',
        order: 2,
        updateOn: 'blur',
        validationMessages: {
          required: 'emailAddress is required.',
          email: 'Wrong format for email.',
          isValidEmail: 'the email is existed, please enter other email.',
          minlength: 'Min Length is 5.',
        },
        validators: [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
        ],
      }),

      new TextBoxControlBase({
        key: 'password',
        label: 'Password',
        value: '', //Bombasto
        order: 4,
        validators: [Validators.required, Validators.minLength(5)],
        validationMessages: {
          required: 'Password is required.',
          minlength: 'Min Length is 5.',
        },
      }),

      new TextBoxControlBase({
        key: 'confirmPassword',
        label: 'Confirm Password',
        value: '', //Bombasto
        order: 5,
        validationMessages: {
          MatchPassword: 'Password not match',
        },
      }),

      new DateTimeControlBase({
        key: 'startDate',
        label: 'Start Date',
        value: new Date('2017/12/19'), //new Date(2017, 11, 19)
        order: 6,
        validators: [Validators.required],
        validationMessages: {
          required: 'Start Date is required.',
        },
      }),

      new CheckBoxControlBase({
        key: 'gender',
        label: 'Male',
        value: true,
        order: 7,
        validators: [Validators.required],
        validationMessages: {
          required: 'Gender is required.',
        },
      }),

      new TextBoxMaskControlBase({
        key: 'phone',
        label: 'Phone',
        value: '', //Bombasto
        required: true,
        order: 5,
        patterns: { '0': { pattern: new RegExp('[a-zA-Z0-9]') } },
        prefix: '+',
        placeholder: '_',
        specialCharacters: "[ '(' ,')' , '||' ]",
        mask: '(000) 000-0000-000||(00) 000-0000-000||(00) 000-000-000',
        validationMessages: {
          required: 'Name is required.',
          minlength: 'Name must be at least 4 characters long.',
          maxlength: 'Name cannot be more than 24 characters long.',
        },
        validators: [Validators.required],
      }),
      new TextBoxMaskControlBase({
        key: 'Facebook',
        value: '',
        prefix: 'Facebook: ',
        placeholder: ' ',
        patterns: { '0': { pattern: new RegExp('[a-zA-Z0-9:/.?=@]') } },
        mask: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        order: 6,
        hideTextHeader: true,
        validationMessages: {
          required: 'Address 1 is required.',
        },
        validators: [Validators.required],
      }),
      new VerHorListControlBase({
        key: 'Address1111',
        label: 'Address',
        category: 'Default',
        rowGroup: true,
        disabled: false,
        order: 31,
        children: [
          new DropdownControlBase({
            key: 'asddress3333',
            label: 'Bravery Rating',
            required: true,
            // hideTextHeader: true,
            items: [
              { key: 'solid', value: 'Solid' },
              { key: 'great', value: 'Great' },
              { key: 'good', value: 'Good' },
              { key: 'unproven', value: 'Unproven' },
            ],
            validationMessages: {
              required: 'Bravery Rating is required.',
            },
            order: 3,
            validators: [Validators.required],
          }),
          new TextBoxMaskControlBase({
            key: 'Address11',
            label: 'Address 1',
            disabled: true,
            value: '',
            prefix: 'Facebook: ',
            placeholder: ' ',
            patterns: { '0': { pattern: new RegExp('[a-zA-Z0-9:/.?=@]') } },
            mask: '0000000000000000000000000000000000000',
            order: 32,
            // hideTextHeader: true,
            validationMessages: {
              required: 'Address 1 is required.',
            },
            validators: [Validators.required],
          }),
          new TextBoxControlBase({
            key: 'Address22',
            label: 'Address 2',
            value: '',
            order: 33,
            // hideTextHeader: true,
          }),
        ],
      }),

      new SlideToggleControlBase({
        key: 'slide_toggle',
        label: 'Slide Toggle',
        value: true,
        showVertical: true,
        order: 15,
      }),

      new AutoCompleteTextBoxControlBase({
        key: 'textAutoCompleteTextBox1111',
        label: 'Auto Complete TextBox',
        value: 1,
        order: 16,
        items: [
          { key: '', value: '' },
          { key: 1, value: 'Mary' },
          { key: 2, value: 'Shelley' },
          { key: 3, value: 'Igor' },
          { key: 4, value: 'a1' },
          { key: 5, value: 'a2' },
          { key: 6, value: 'a3' },
          { key: 7, value: 'a4' },
          { key: 8, value: 'A5' },
          { key: 9, value: 'A6' },
          { key: 10, value: 'a7' },
          { key: 11, value: 'A8' },
          { key: 12, value: 'A9' },
          { key: 13, value: 'A10' },
          { key: 14, value: 'a11' },
          { key: 15, value: 'A12' },
        ],
      }),

      new CheckBoxListControlBase({
        key: 'certificates',
        label: 'Certificates',
        value: [], // [{ key: 'solid', value: true, label: 'solid' }],
        order: 20,
        showVertical: true,
        items: [
          { key: 'solid', value: false, label: 'solid' },
          { key: 'great', value: false, label: 'great' },
          { key: 'good', value: false, label: 'good' },
          { key: 'unproven', value: false, label: 'unproven' },
        ],
        validators: [Validators.required],
        validationMessages: {
          required: 'Certificates is required.',
        },
      }),

      new RadioButtonListControlBase({
        key: 'region',
        label: 'Region',
        value: 'us', // [{ key: 'solid', value: true, label: 'solid' }],
        order: 25,
        items: [
          { key: 'vn', label: 'VietNam' },
          { key: 'us', label: 'UnitedState' },
        ],
        validators: [Validators.required],
      }),

      new TextViewControl({
        key: 'textView',
        label: 'Text View Control',
        hideTextHeader: false,
        value: 'Hello World!!!',
        order: 30,
      }),
    ];

    return controls.sort((a, b) => {
      return a.order - b.order;
    });
  }

  getControlForSearchForm(): ControlBase<any>[] {
    const controls: ControlBase<any>[] = [
      new DropdownControlBase({
        key: 'brave',
        required: true,
        items: [
          { key: 'active', value: 'Actived' },
          { key: 'disable', value: 'Disable' },
        ],
        validationMessages: {
          required: 'Bravery Rating is required.',
        },
        order: 3,
        validators: [Validators.required],
        style: {
          width: '150px',
        },
      }),

      new TextBoxControlBase({
        key: 'userName',
        placeholder: 'demo.user-name',
        value: '', //Bombasto
        required: true,
        order: 1,
        validationMessages: {
          required: 'validate-control.validate-name',
          minlength: 'validate-control.validate-minlength',
          maxlength: 'validate-control.validate-maxlength',
        },
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24),
        ],
        style: {
          width: '200px',
        },
      }),
      new TextBoxControlBase({
        key: 'email',
        placeholder: 'Email',
        value: '', //Bombasto
        required: true,
        order: 1,
        validationMessages: {
          required: 'validate-control.validate-email',
          minlength: 'validate-control.validate-email-minlength',
          maxlength: 'validate-control.validate-email-maxlength',
        },
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24),
        ],
        style: {
          width: '200px',
        },
      }),
    ];

    return controls.sort((a, b) => {
      return a.order - b.order;
    });
  }

  getLeftControlWizard(): ControlBase<any> {
    const controls: ControlBase<any> =
      // new TextBoxControlBase({
      //     key: 'total',
      //     value: 0,
      //     label: 'TOTAL: '
      // });
      new TextBoxMaskControlBase({
        key: 'total',
        value: 0,
        label: 'TOTAL: ',
        suffix: ' USD/MONTH',
        prefix: '$',
      });

    return controls;
  }

  getControlForDataFormConfirm(): ControlBase<any>[] {
    const controls: ControlBase<any>[] = [
      new TextBoxControlBase({
        key: 'licensePackage',
        label: 'License Package',
        value: '',
        order: 1,
      }),
      new TextBoxControlBase({
        key: 'policy',
        label: 'Policy',
        value: '',
        order: 2,
      }),
      new TextBoxControlBase({
        key: 'recurrence',
        label: 'Recurrence',
        value: '',
        order: 3,
      }),
      new TextBoxControlBase({
        key: 'name',
        label: 'Client Name',
        value: '',
        order: 4,
      }),
      new TextBoxControlBase({
        key: 'email',
        label: 'Email',
        value: '',
        order: 5,
      }),
      new TextBoxControlBase({
        key: 'phone',
        label: 'Phone',
        value: '',
        order: 6,
      }),
      new TextBoxControlBase({
        key: 'address',
        label: 'Address',
        value: '',
        order: 7,
      }),
      new TextBoxControlBase({
        key: 'provinceOrDistrict',
        label: 'Province/District',
        value: '',
        order: 8,
      }),
      new TextBoxControlBase({
        key: 'country',
        label: 'Country',
        value: '',
        order: 9,
      }),
    ];

    return controls;
  }

  getControlForDataForm2(): ControlBase<any>[] {
    const controls: ControlBase<any>[] = [
      new CheckBoxListControlBase({
        key: 'certificates',
        value: [],
        order: 20,
        showVertical: true,
        items: [
          { key: 'policyA', value: false, label: 'Policy A: Security' },
          { key: 'policyB', value: false, label: 'Policy A: Security, Adware' },
          {
            key: 'policyC',
            value: false,
            label: 'Policy A: Security, Adware, Adult',
          },
          {
            key: 'policyD',
            value: false,
            label: 'Policy A: Security, Adware, Adult, Privacy',
          },
          { key: 'policyE', value: false, label: 'Policy A: Security, Adult' },
          {
            key: 'policyF',
            value: false,
            label: 'Policy A: Security, Privacy',
          },
        ],
        validators: [Validators.required],
        validationMessages: {
          required: 'Certificates is required.',
        },
      }),
    ];

    return controls;
  }

  async getControlForDataForm3(): Promise<ControlBase<any>[]> {
    // let clientService: ServiceBase[] = [{
    //     serviceType: EnServiceType.autoLoad,
    //     value: {
    //         serviceName: 'DemoService',
    //         serviceMethod: 'getAsyncClientDatasource',
    //         serviceParams: {},
    //         dropdownMapping: {key: 'id', value: 'name'},
    //         checkBoxListMapping: {key: 'id', value: 'name'},
    //         radioListMapping: {key: 'id', value: 'name'},
    //         dropdownMultipleSelectMapping: {key: 'id', value: 'name'}
    //     }
    // }]

    let data = await this.getAsyncClientDatasource();
    let clientItems: any = [];
    data.forEach((i: any) => {
      clientItems.push({ key: i.id, value: i.name });
    });

    const controls: ControlBase<any>[] = [
      new DropdownControlBase({
        key: 'clients',
        label: 'Client',
        required: true,
        autoLoad: true,
        notifyChanges: true,
        items: clientItems,
        validationMessages: {
          required: 'Client is required.',
        },
        order: 1,
        validators: [Validators.required],
        // services: clientService
      }),

      new TextBoxControlBase({
        key: 'name',
        label: 'Client Name',
        value: '',
        order: 4,
      }),
      new TextBoxControlBase({
        key: 'email',
        label: 'Email',
        value: '',
        order: 5,
      }),
      new TextBoxControlBase({
        key: 'phone',
        label: 'Phone',
        value: '',
        order: 6,
        validationMessages: {
          required: 'Phone is required.',
        },
        validators: [Validators.required],
      }),
      new TextBoxControlBase({
        key: 'address',
        label: 'Address',
        value: '',
        order: 7,
      }),
      new TextBoxControlBase({
        key: 'provinceOrDistrict',
        label: 'Province/District',
        value: '',
        order: 8,
      }),
      new TextBoxControlBase({
        key: 'country',
        label: 'Country',
        value: '',
        order: 9,
      }),
    ];

    return controls;
  }

  // get group management in action
  private async getClients(searchInfo: any): Promise<any> {
    const params: SearchParamRequest[] = [];

    for (let p in searchInfo)
      params.push({
        Key: p,
        Type: ParamRequestSearchType.Contains,
        Value: searchInfo[p],
      });

    const res = await this.baseAsyncGetHttpClientUrl(
      this.baseClientSourceUrl,
      undefined,
      params
    );
    const response = Object.assign(new HttpResponse(), res);
    if (response.msg === AppConst.ResponseMessage.OK) {
      return response.data;
    }
    return [];
  }

  // get group management in action
  async getClient(clientId: any): Promise<any> {
    let res = await this.baseAsyncGetHttpClientUrl(
      this.baseClientSourceUrl + '/' + clientId
    );
    let response = Object.assign(new HttpResponse(), res);
    if (response.msg === AppConst.ResponseMessage.OK) {
      return response.data;
    }
    return null;
  }

  async getAsyncClientDatasource() {
    let data = await this.getClients({});
    data.push({ key: '', value: '' });
    return data;
  }

  getButtonListForForm(): ButtonItem[] {
    return [
      {
        buttonKey: 'submit',
        buttonLabel: 'submit',
        isVisible: true,
      },
    ];
  }

  getGridDefinitions() {
    let symbols: SelectedItem[] = [];
    let options: [] = this.filterSelectObj.filter(
      (r) => r.columnProp === 'symbol'
    )[0].options;
    options.forEach((o) => symbols.push({ key: o, text: o }));

    let columns: ColumnDefine[] = [
      new ColumnDefine({
        columnDef: 'position',
        header: 'No.',
        isVisible: true,
      }),
      new ColumnDefine({
        columnDef: 'name',
        header: 'Name',
        isVisible: true,
        showSearch: true,
        searchType: SearchControlType.Text,
      }),
      new ColumnDefine({
        columnDef: 'weight',
        header: 'Weight',
        isVisible: true,
        showSearch: true,
        searchType: SearchControlType.Number,
      }),
      new ColumnDefine({
        columnDef: 'symbol',
        header: 'Symbol',
        isVisible: true,
        showSearch: true,
        searchType: SearchControlType.MultipleSelected,
        searchDefaultInfo: {
          searchMultipleItem: {
            type: 'Multiple',
            columnDef: 'symbol',
            columnName: 'Symbol',
            valueType: 'Text',
            selectOptions: symbols,
            /*valueType: 'Number',
                        selectOptions: [
                            { key: '1', text: 'Extra cheese' },
                            { key: '2', text: 'Mushroom' },
                            { key: '3', text: 'Onion' },
                            { key: '4', text: 'Pepperoni' },
                            { key: '5', text: 'Sausage' },
                            { key: '6', text: 'Tomato' }]*/
          },
        },
      }),
      new ColumnDefine({
        columnDef: 'buyDate',
        header: 'Buy Date',
        isVisible: true,
        showSearch: true,
        searchType: SearchControlType.DateTime,
        dataType: DataType.DateTime,
        dataFormat: 'yyyy-MM-dd',
      }),
    ];

    let displayedColumns = [
      'select',
      'position',
      'name',
      'weight',
      'symbol',
      'buyDate',
      'actions',
    ];

    let gridDefinitions: GridDefine = {
      columns: columns,
      displayedColumns: displayedColumns,
      showSearchHeader: true,
      showNonePrimaryAction: true,
      rowActions: [
        {
          actionKey: ActionTypes.View,
          actionLabel: 'view',
          primaryAction: true,
        },
        {
          actionKey: ActionTypes.Edit,
          actionLabel: 'edit',
          primaryAction: false,
        },
      ],
    };
    return gridDefinitions;
  }

  getDatasourseForMasterForm(): Observable<any[]> {
    /*const data = [
      {
        position: 1,
        name: "Hydrogen",
        weight: 1.0079,
        symbol: "H",
        buyDate: new Date(2020, 0o6, 0o5),
      },
      {
        position: 2,
        name: "Helium",
        weight: 4.0026,
        symbol: "He",
        buyDate: new Date(2020, 0o5, 0o5),
      },
      {
        position: 3,
        name: "Lithium",
        weight: 6.941,
        symbol: "Li",
        buyDate: new Date(2019, 10, 0o5),
      },
      {
        position: 4,
        name: "Beryllium",
        weight: 9.0122,
        symbol: "Be",
        buyDate: new Date(2018, 0o5, 0o5),
      },
      {
        position: 5,
        name: "Boron",
        weight: 10.811,
        symbol: "B",
        buyDate: new Date(2020, 10, 0o5),
      },
      {
        position: 6,
        name: "Carbon",
        weight: 12.0107,
        symbol: "C",
        buyDate: new Date(2020, 0o5, 0o5),
      },
      {
        position: 7,
        name: "Nitrogen",
        weight: 14.0067,
        symbol: "N",
        buyDate: new Date(2020, 0o5, 0o5),
      },
      {
        position: 8,
        name: "Oxygen",
        weight: 15.9994,
        symbol: "O",
        buyDate: new Date(2020, 0o5, 0o5),
      },
      {
        position: 9,
        name: "Fluorine",
        weight: 18.9984,
        symbol: "F",
        buyDate: new Date(2019, 10, 0o5),
      },
      {
        position: 10,
        name: "Neon",
        weight: 20.1797,
        symbol: "Ne",
        buyDate: new Date(2018, 0o5, 0o5),
      },
      {
        position: 11,
        name: "Sodium",
        weight: 22.9897,
        symbol: "Na",
        buyDate: new Date(2010, 10, 0o5),
      },
      {
        position: 12,
        name: "Magnesium",
        weight: 24.305,
        symbol: "Mg",
        buyDate: new Date(2019, 0o5, 0o5),
      },
      {
        position: 13,
        name: "Aluminum",
        weight: 26.9815,
        symbol: "Al",
        buyDate: new Date(2019, 0o5, 0o5),
      },
      {
        position: 14,
        name: "Silicon",
        weight: 28.0855,
        symbol: "Si",
        buyDate: new Date(2020, 10, 0o5),
      },
      {
        position: 15,
        name: "Phosphorus",
        weight: 30.9738,
        symbol: "P",
        buyDate: new Date(2010, 0o5, 0o5),
      },
      {
        position: 16,
        name: "Sulfur",
        weight: 32.065,
        symbol: "S",
        buyDate: new Date(2020, 0o5, 0o5),
      },
      {
        position: 17,
        name: "Chlorine",
        weight: 35.453,
        symbol: "Cl",
        buyDate: new Date(2020, 10, 0o5),
      },
      {
        position: 18,
        name: "Argon",
        weight: 39.948,
        symbol: "Ar",
        buyDate: new Date(2019, 0o5, 0o5),
      },
      {
        position: 19,
        name: "Potassium",
        weight: 39.0983,
        symbol: "K",
        buyDate: new Date(2020, 10, 0o5),
      },
      {
        position: 20,
        name: "Calcium",
        weight: 40.078,
        symbol: "Ca",
        buyDate: new Date(2020, 12, 0o5),
      },
    ];*/
    return of(this.data).pipe(delay(1000));
  }

  TREE_DATA1: TreeItemNode[] = [
    {
      name: 'Application Route',
      key: '0',
      indeterminate: false,
      children: [
        {
          name: 'User Management',
          key: '1',
          indeterminate: false,
          children: [
            {
              name: 'Users',
              key: '10',
              indeterminate: false,
              children: undefined,
            },
            {
              name: 'Roles',
              key: '11',
              indeterminate: false,
              children: undefined,
            },
            {
              name: 'Groups',
              key: '12',
              indeterminate: false,
              children: undefined,
            },
          ],
        },
        {
          name: 'Computer Store',
          key: '2',
          indeterminate: false,
          children: [
            {
              name: 'Laptops',
              key: '20',
              indeterminate: false,
              children: undefined,
            },
            {
              name: 'Shop',
              key: '21',
              indeterminate: false,
              children: undefined,
            },
          ],
        },
        {
          name: 'Cake Store',
          key: '3',
          indeterminate: false,
          children: [
            {
              name: 'Cakes',
              key: '30',
              indeterminate: false,
              children: undefined,
            },
            {
              name: 'Shop',
              key: '31',
              indeterminate: false,
              children: undefined,
            },
          ],
        },
      ],
    },
  ];

  TREE_DATA2: TreeItemNode[] = [
    {
      name: 'User Management',
      key: '1',
      indeterminate: false,
      children: [
        {
          name: 'Users',
          key: '10',
          selected: true,
          indeterminate: false,
          children: undefined,
        },
        {
          name: 'Roles',
          key: '11',
          indeterminate: false,
          children: undefined,
        },
      ],
    },
    {
      name: 'Team',
      key: '3',
      indeterminate: false,
      children: [
        {
          name: 'Groups',
          key: '12',
          indeterminate: false,
          children: undefined,
        },
      ],
    },
    {
      name: 'Computer Store',
      key: '2',
      indeterminate: false,
      children: [
        {
          name: 'Laptops',
          key: '20',
          indeterminate: false,
          children: [
            {
              name: 'HP',
              key: '201',
              indeterminate: false,
              children: undefined,
            },
            {
              name: 'ACER',
              key: '202',
              indeterminate: false,
              children: [
                {
                  name: 'Acer 1',
                  key: '2021',
                  children: [],
                  indeterminate: false,
                  selected: true,
                },
                {
                  name: 'Acer 2',
                  key: '2022',
                  children: [],
                  indeterminate: false,
                  selected: false,
                },
              ],
              selected: true,
            },
            {
              name: 'DELL',
              key: '203',
              indeterminate: false,
              children: undefined,
            },
          ],
        },
        {
          name: 'Shop',
          key: '21',
          indeterminate: false,
          children: undefined,
        },
      ],
    },
    {
      name: 'Cake Store',
      key: '4',
      indeterminate: false,
      children: [
        {
          name: 'Cakes',
          key: '30',
          indeterminate: false,
          children: undefined,
          selected: true,
        },
        {
          name: 'Shop',
          key: '31',
          indeterminate: false,
          children: undefined,
          selected: true,
        },
      ],
    },
  ];

  tabItems: TabItem[] = [
    {
      key: 'tabRoles',
      label: 'Roles',
      isDefault: true,
      isLoadSelected: false,
      notifyChange: true,
      componentSection: { componentType: ComponentAComponent, inputs: {} },
    },
    {
      key: 'tabGroups',
      label: 'Groups',
      isDefault: false,
      isLoadSelected: false,
      notifyChange: true,
      componentSection: { componentType: ComponentBComponent, inputs: {} },
    },
    {
      key: 'tabTrees',
      label: 'Tree',
      isDefault: false,
      isLoadSelected: false,
      notifyChange: true,
      componentSection: { componentType: ComponentCComponent, inputs: {} },
    },
  ];

  data = [
    {
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      buyDate: new Date(2020, 0o6, 0o5),
    },
    {
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      buyDate: new Date(2020, 0o5, 0o5),
    },
    {
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      buyDate: new Date(2019, 10, 0o5),
    },
    {
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      buyDate: new Date(2018, 0o5, 0o5),
    },
    {
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      buyDate: new Date(2020, 10, 0o5),
    },
    {
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C',
      buyDate: new Date(2020, 0o5, 0o5),
    },
    {
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N',
      buyDate: new Date(2020, 0o5, 0o5),
    },
    {
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O',
      buyDate: new Date(2020, 0o5, 0o5),
    },
    {
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F',
      buyDate: new Date(2019, 10, 0o5),
    },
    {
      position: 10,
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne',
      buyDate: new Date(2018, 0o5, 0o5),
    },
    {
      position: 11,
      name: 'Sodium',
      weight: 22.9897,
      symbol: 'Na',
      buyDate: new Date(2010, 10, 0o5),
    },
    {
      position: 12,
      name: 'Magnesium',
      weight: 24.305,
      symbol: 'Mg',
      buyDate: new Date(2019, 0o5, 0o5),
    },
    {
      position: 13,
      name: 'Aluminum',
      weight: 26.9815,
      symbol: 'Al',
      buyDate: new Date(2019, 0o5, 0o5),
    },
    {
      position: 14,
      name: 'Silicon',
      weight: 28.0855,
      symbol: 'Si',
      buyDate: new Date(2020, 10, 0o5),
    },
    {
      position: 15,
      name: 'Phosphorus',
      weight: 30.9738,
      symbol: 'P',
      buyDate: new Date(2010, 0o5, 0o5),
    },
    {
      position: 16,
      name: 'Sulfur',
      weight: 32.065,
      symbol: 'S',
      buyDate: new Date(2020, 0o5, 0o5),
    },
    {
      position: 17,
      name: 'Chlorine',
      weight: 35.453,
      symbol: 'Cl',
      buyDate: new Date(2020, 10, 0o5),
    },
    {
      position: 18,
      name: 'Argon',
      weight: 39.948,
      symbol: 'Ar',
      buyDate: new Date(2019, 0o5, 0o5),
    },
    {
      position: 19,
      name: 'Potassium',
      weight: 39.0983,
      symbol: 'K',
      buyDate: new Date(2020, 10, 0o5),
    },
    {
      position: 20,
      name: 'Calcium',
      weight: 40.078,
      symbol: 'Ca',
      buyDate: new Date(2020, 12, 0o5),
    },
  ];
  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  isValidEmail(email: string) {
    //: Observable<User | undefined>
    //return this.http
    //    .get('users.json')
    //    .delay(1000)
    //    .map(res => res.json())
    //    .map(users => users.filter(user => user.email === email))
    //    .map(users => !users.length);

    let users: User[] = [
      { name: 'Paul', email: 'paul@example.com' },
      { name: 'Ringo', email: 'ringo@example.com' },
      { name: 'John', email: 'john@example.com' },
      { name: 'George', email: 'george@example.com' },
    ];
    const user = users.find((user) => user.email === email);
    //return of(this.data).pipe(delay(1000));
    return of(user ? false : true).pipe(delay(1000)); // simulate latency with delay
  }
}
