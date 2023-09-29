import { Injectable, Injector } from '@angular/core';
import { ButtonItem, GridRequestInfo, SearchParamRequest } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { AutoCompleteTextBoxControlBase, ColumnDefine, ControlBase, DateTimeControlBase, DropdownControlBase, DropdownMultipleSelectControlBase, GridDefine, TextBoxControlBase, VerHorListControlBase } from 'src/app/base-core-ui/app.core.shared.models';
import { ActionTypes, MessageType } from 'src/app/common/const';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppBaseService } from 'src/app/services/service-base';
import { IActivity, IActivityStep } from '../models/activity.model';
import { Validators } from '@angular/forms';
import { KeycloakAdminService } from 'src/app/services/keycloak-admin.service';
import { HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { MasterService } from 'src/app/services/master-service';

@Injectable()
export class ActivityService extends AppBaseService {
    constructor(
        injector: Injector,
        configService: AppConfigService,
        private keycloakAdminService: KeycloakAdminService,
        private keycloakService: KeycloakService,
        private masterService: MasterService,
    ) {
        super(injector, configService)
    }

    async getActivities(gridInfo: GridRequestInfo, searchParamRequest?: SearchParamRequest[]) {
        const accessToken = await this.keycloakService.getToken();
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + accessToken
          });
        return this.baseAsyncGetHttpClientUrl('activity', gridInfo, searchParamRequest, headers);
    }

    createNewActivity(newActivity: IActivity) {

        const processedSteps = newActivity.steps.map((step: IActivityStep) => {
            if (step.element) {
                step.datasetElementId = step.element._id;
                delete step.element;
            }
            return step;
        });
        return this.baseAsyncPostHttpClientUrl('activity', { ...newActivity, steps: processedSteps });
    }

    updateActivity(id: string, newActivity: IActivity) {
        const processedSteps = newActivity.steps.map((step: IActivityStep) => {
            if (step.element) {
                step.datasetElementId = step.element._id;
                delete step.element;
            }
            return step;
        });
        return this.baseAsyncPutHttpClientUrl(`activity/${id}`, { ...newActivity, steps: processedSteps });
    }

    getActivityById(id: string) {
        return this.baseAsyncGetHttpClientWithUrl(`activity/${id}`);
    }
    
    getColumnDefine(): ColumnDefine[] {
        let columns: ColumnDefine[] = [
            new ColumnDefine({
                columnDef: 'name',
                header: 'Name',
                isVisible: true
            }),
            new ColumnDefine({
                columnDef: 'description',
                header: 'Description',
                isVisible: true,
            }),
            new ColumnDefine({
                columnDef: 'tagList',
                header: 'Tags',
                isVisible: true,
            }),
        ];
        return columns;
    }
    
    getDisplayedColumns(): string[] {
        let displayedColumns = [
            'name',
            'description',
            'tagList',
            'actions',
        ];
        return displayedColumns;
    }

    getGridDefinitions() {
        let columns: ColumnDefine[] = this.getColumnDefine();

        let displayedColumns = this.getDisplayedColumns();

        let gridDefinitions: GridDefine = {
            columns: columns,
            displayedColumns: displayedColumns,
            showSearchHeader: true,
            showNonePrimaryAction: true,
            rowActions: [
                {
                    actionKey: ActionTypes.Edit,
                    actionLabel: 'edit',
                    primaryAction: false,
                },
            ],
        };
        return gridDefinitions;
    }

    getAllControlForFilterForm(): ControlBase<any>[] {
        const controls =[
            new VerHorListControlBase({
                key: 'FilterRow1',
                order: 1,
                rowGroup: true,
                children: [
                    new TextBoxControlBase({
                        key: 'ActivityName',
                        label: 'Activity Name',
                        value: '',
                        order: 2,
                    }),
                    new AutoCompleteTextBoxControlBase({
                        key: 'CreatedBy',
                        label: 'Created by',
                        value: '',
                        items: [
                            { key: 'a', value: 'Admin A'},
                            { key: 'b', value: 'Admin B'},
                            { key: 'c', value: 'Admin C'},
                        ],
                        order: 3,
                    }),
                    new AutoCompleteTextBoxControlBase({
                        key: 'Dataset',
                        label: 'Dataset',
                        items: [
                            { key: 'dataset1', value: 'Dataset 1'},
                            { key: 'dataset2', value: 'Dataset 2'},
                            { key: 'dataset3', value: 'Dataset 3'},
                        ],
                        order: 4,
                    })
                ]
            }),
            new VerHorListControlBase({
                key: 'FilterRow2',
                rowGroup: true,
                order: 5,
                children: [
                    new DateTimeControlBase({
                        key: 'CreatedAfter',
                        label: 'Created After',
                        value: '',
                        order: 6,
                    }),
                    new AutoCompleteTextBoxControlBase({
                        key: 'Status',
                        label: 'Status',
                        items: [
                            { key: 'active', value: 'Active'},
                            { key: 'inactive', value: 'Inactive'}
                        ],
                        order: 7
                    }),
                ]
            }),
            new DateTimeControlBase({
                key: 'CreatedBefore',
                label: 'Created Before',
                value: '',
                order: 8,
            }),
        ]
        return controls;
    }
    
    getDefineCustomBlocksTEXT() {
        const defineBlock = [
          // TEXT
          {
            type: 'input_object',
            message0: 'Name: %1 Value: %2',
            args0: [
              {
                type: 'input_value',
                name: 'NAME',
                check: 'String',
              },
              {
                type: 'input_value',
                name: 'VALUE',
                check: 'String',
              },
            ],
            inputsInline: false,
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: '',
            helpUrl: '',
          },
          {
            type: 'input_object_directly',
            message0: 'Name: %1 Value: %2',
            args0: [
              {
                type: 'field_input',
                name: 'NAME',
                check: 'String',
              },
              {
                type: 'field_input',
                name: 'VALUE',
                check: 'String',
              },
            ],
            inputsInline: false,
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: '',
            helpUrl: '',
          },
          {
            type: 'input_id',
            message0: 'ID: %1',
            args0: [
              {
                type: 'input_value',
                name: 'ID',
                check: 'String',
              },
            ],
            inputsInline: false,
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: '',
            helpUrl: '',
          },
          {
            type: 'input_id_directly',
            message0: 'ID: %1',
            args0: [
              {
                type: 'field_input',
                name: 'ID',
                check: 'String',
              },
            ],
            inputsInline: false,
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: '',
            helpUrl: '',
          },
          {
            type: 'text',
            message0: '"%1"',
            args0: [
              {
                type: 'field_input',
                name: 'inputText',
                check: 'String',
              },
            ],
            inputsInline: false,
            output: null,
            colour: 230,
            tooltip: '',
            helpUrl: '',
          },
          {
            type: 'userInput',
            message0: 'userInput',
            inputsInline: false,
            output: null,
            colour: 230,
          },
          // JSON
          {
            type: 'object',
            message0: '{ }%1',
            args0: [
              {
                type: 'input_statement',
                name: 'object',
              },
            ],
            output: null,
          },
          {
            type: 'array',
            message0: '[ ]%1',
            args0: [
              {
                type: 'input_statement',
                name: 'array',
              },
            ],
            output: null,
          },
          // ACTION: Launch
          {
            type: 'action_launch',
            message0: 'Step: %1 - Launch url: %2 - Hint: %3',
            args0: [
              {
                type: 'input_dummy',
                name: 'STEP',
              },
              {
                type: 'field_input',
                name: 'URL',
                check: 'String',
              },
              {
                type: 'field_input',
                name: 'Hint',
                check: 'String',
              },
            ],
            extensions: ['dynamic_launch_extension'],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: 230,
          },
          {
            type: 'action_setValue',
            message0: 'Step: %1 Set value for %2 to %3 - Hint: %4',
            args0: [
              {
                type: 'input_dummy',
                name: 'STEP',
              },
              {
                type: 'input_dummy',
                name: 'controlType',
              },
              {
                type: 'input_value',
                name: 'controlValue',
                check: 'String',
              },
              {
                type: 'field_input',
                name: 'hint',
                check: 'String',
              },
            ],
            extensions: ['dynamic_setValue_extension'],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: 230,
          },
          // ACTION: Click
          {
            type: 'action_click',
            message0: 'Step: %1 Click %2 - Hint %3',
            args0: [
              {
                type: 'input_dummy',
                name: 'STEP',
              },
              {
                type: 'input_dummy',
                name: 'controlType',
              },
              {
                type: 'field_input',
                name: 'Hint',
                check: 'String',
              },
            ],
            extensions: ['dynamic_click_extension'],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: 230,
          },
        ];
        return defineBlock;
      }
      
    getAllControlForActivityForm(datasetList: any[], tagList: any[], activityData?: any, readonly?: boolean): ControlBase<any>[] {
      const controls = [
          new VerHorListControlBase({
            key: 'activityNameDesc',
            order: 1,
            rowGroup: true,
            children: [
              new TextBoxControlBase({
                key: 'name',
                label: 'Name',
                value: activityData?.name || '',
                require: true,
                disabled: readonly,
                order: 2,
                validators: [Validators.required],
                validationMessages: {
                  required: 'Activity name is required.',
                },
              }),
              new TextBoxControlBase({
                key: 'description',
                label: 'Description',
                value: activityData?.description || '',
                require: true,
                disabled: readonly,
                order: 3,
                validators: [Validators.required],
                validationMessages: {
                  required: 'Activity description is required.',
                },
              })
            ]
          }),
          new VerHorListControlBase({
            key: 'activityStatus',
            order: 4,
            rowGroup: true,
            children: [
              new TextBoxControlBase({
                key: 'queryUrl',
                label: 'Query string',
                value: activityData?.queryUrl || '',
                order: 5,
                disabled: readonly,
              }),
              new DropdownControlBase({
                key: 'status',
                label: 'Status',
                value: activityData?.status || 'ACTIVE',
                order: 6,
                require: true,
                disabled: readonly,
                items: [
                  { key: 'ACTIVE', value: 'ACTIVE' },
                  { key: 'INACTIVE', value: 'INACTIVE' },
                ],
                validators: [Validators.required],
                validationMessages: {
                  required: 'Activity status is required.',
                },
              })
            ]
          }),
          new VerHorListControlBase({
              key: 'userGroup',
              order: 7,
              rowGroup: true,
              children: [
                  new DropdownMultipleSelectControlBase({
                      key: 'datasets',
                      label: 'Datasets',
                      items: datasetList,
                      value: activityData?.datasets || [],
                      placeholder: 'Select multiple datasets',
                      order: 8,
                      notifyChanges: true,
                      disabled: readonly,
                  }),
                  new DropdownMultipleSelectControlBase({
                    key: 'tags',
                    label: 'Tags',
                    items: tagList,
                    value: activityData?.tags.map(item => item._id) || [],
                    placeholder: 'Select multiple Tags',
                    order: 9,
                    disabled: readonly,
                }),
              ]
          }),
      ]
      return controls;
    }

    getButtonListForForm(action: string): ButtonItem[] {
      switch (action) {
        case 'create':
          return [
            {
                buttonKey: 'submit',
                buttonLabel: 'submit',
                isVisible: true,
            },
          ];
        case 'view':
          return [
            {
                buttonKey: 'edit',
                buttonLabel: 'edit',
                isVisible: true,
            },
          ];

        case 'edit':
          return [
            {
                buttonKey: 'save',
                buttonLabel: 'save',
                isVisible: true,
            },
            {
              buttonKey: 'discard',
              buttonLabel: 'Discard',
              isVisible: true,
          },
          ];
      
        default:
          return [];
      };
  }

  showAlert(message: string, type: MessageType) {
    this.masterService.resetMessages();

    this.masterService.addMessages([
        {
            type: type,
            text: message,
        },
    ])
}
}