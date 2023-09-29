import { Injectable, Injector } from "@angular/core";
import { Validators } from "@angular/forms";
import { ButtonItem, GridRequestInfo } from "src/app/base-core-ui/app.core.shared.interfaces";
import { ColumnDefine, ControlBase, DropdownControlBase, GridDefine, TextBoxControlBase, VerHorListControlBase } from "src/app/base-core-ui/app.core.shared.models";
import { ActionTypes, MessageType } from "src/app/common/const";
import { AppConfigService } from "src/app/services/app-config.service";
import { MasterService } from "src/app/services/master-service";
import { AppBaseService } from "src/app/services/service-base";

@Injectable()
export class DatasetService extends AppBaseService {
    path: string = 'dataset';
    constructor(
        injector: Injector,
        configService: AppConfigService,
        private masterService: MasterService,
    ) {
        super(injector, configService);
    }

    getDatasets(gridInfo: GridRequestInfo | undefined) {
        return this.baseAsyncGetHttpClientUrl(this.path, gridInfo)
    }

    getColumnDefine(): ColumnDefine[] {
        let columns: ColumnDefine[] = [
            new ColumnDefine({
                columnDef: 'projectName',
                header: 'Name',
                isVisible: true,
            }),
            new ColumnDefine({
                columnDef: 'description',
                header: 'Description',
                isVisible: true,
            })
        ];
        return columns;
    }

    getDisplayedColumns(): string[] {
        let displayedColumns = [
            'projectName',
            'description',
            'actions',
        ];
        return displayedColumns;
    }

    getGridDefinitions(): GridDefine {
        let columns: ColumnDefine[] = this.getColumnDefine();

        let displayedColumns = this.getDisplayedColumns();

        let gridDefinitions: GridDefine = {
            columns: columns,
            displayedColumns: displayedColumns,
            showSearchHeader: false,
            showNonePrimaryAction: true,
            rowActions: [
                {
                    actionKey: ActionTypes.View,
                    actionLabel: 'view',
                    primaryAction: false
                },
            ]
        };
        return gridDefinitions;
    }

    getDatasetControlForCreateUpdateForm(datasetData: any | undefined, readonly?: boolean): ControlBase<any>[] {
        let controls = [
            new VerHorListControlBase({
                key: 'datasetNameAndStatus',
                order: 1,
                rowGroup: true,
                children: [
                    new TextBoxControlBase({
                        key: 'datasetName',
                        label: 'Dataset Name',
                        value: datasetData?.projectName || '',
                        order: 2,
                        disabled: readonly,
                        require: true,
                        validators: [Validators.required, Validators.minLength(5)],
                        validationMessages: {
                            required: 'Dataset Name is required.',
                            minlength: 'Min length is 5.',
                        },
                    }),
                    new DropdownControlBase({
                        key: 'status',
                        label: 'Status',
                        required: true,
                        disabled: readonly,
                        items: [
                            { key: 'active', value: 'Active' },
                            { key: 'inactive', value: 'Inactive' },
                        ],
                        value: datasetData?.status || 'active',
                        validationMessages: {
                            required: 'Status is required.',
                        },
                        order: 3,
                        validators: [Validators.required],
                    }),
                ]
            }),
            new TextBoxControlBase({
                key: 'description',
                label: 'Description',
                value: datasetData?.description || '',
                order: 4,
                disabled: readonly,
                require: true,
                validators: [Validators.required, Validators.minLength(10)],
                validationMessages: {
                    required: 'Description is required.',
                    minlength: 'Min length is 10.',
                },
            })
        ];

        return controls;
    }

    getButtonListForForm(isEditMode: boolean, readonly?: boolean): ButtonItem[] {
        if (isEditMode) {
            if (readonly) {
                return [
                    {
                        buttonKey: 'edit',
                        buttonLabel: 'edit',
                        isVisible: true,
                    },
                ]
            } else {
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
                ]
            }
        } else {
            return [
                {
                    buttonKey: 'submit',
                    buttonLabel: 'submit',
                    isVisible: true,
                },
            ];
        }
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

    createNewDataset(newDataset: { projectName: string; description: string; status: string; }) {
        return this.baseAsyncPostHttpClientUrl(this.path, newDataset);
    }

    updateDataset(id: string, newDataset: { projectName: string; description: string; status: string; }) {
        return this.baseAsyncPutHttpClientUrl(`${this.path}/${id}`, newDataset);
    }

    getDatasetById(id: string) {
        return this.baseAsyncGetHttpClientWithUrl(`${this.path}/${id}`);
    }

    getDatasetElementsByDatasetId(datasetId: string) {
        return this.baseAsyncGetHttpClientWithUrl(`dataset-element/dataset/${datasetId}`);
    }

    getDatasetElementControlForForm(selectedDatasetElement: any | undefined, readonly?: boolean, formValue?: any): ControlBase<any>[] {
        let controls = [
            new VerHorListControlBase({
                key: 'elementType',
                order: 1,
                rowGroup: true,
                children: [
                    new DropdownControlBase({ // link, input, button, singleSelect, singleCheckbox, inputFile, radio, datetime
                        key: 'controlType',
                        label: 'Control type',
                        required: true,
                        disabled: readonly,
                        items: [
                            { key: 'link', value: 'Link' },
                            { key: 'input', value: 'Input' },
                            { key: 'button', value: 'Button' },
                            { key: 'singleSelect', value: 'Single Select' },
                            { key: 'singleCheckbox', value: 'Single Checkbox' },
                            { key: 'inputFile', value: 'Input File' },
                            { key: 'radio', value: 'Radio' },
                            { key: 'datetime', value: 'Datetime' },
                        ],
                        value: formValue?.controlType || selectedDatasetElement?.controlType || '',
                        validationMessages: {
                            required: 'Control type is required.',
                        },
                        order: 2,
                        validators: [Validators.required],
                    }),
                    new DropdownControlBase({
                        key: 'type',
                        label: 'Type',
                        required: true,
                        disabled: readonly,
                        items: [
                            { key: 'id', value: 'ID' },
                            { key: 'condition', value: 'Condition' },
                        ],
                        value: formValue?.type || selectedDatasetElement?.type || '',
                        validationMessages: {
                            required: 'Type is required.',
                        },
                        order: 3,
                        validators: [Validators.required],
                    }),
                ]
            }),
            new VerHorListControlBase({
                key: 'elementLabelValue',
                order: 4,
                rowGroup: true,
                children: [
                    new TextBoxControlBase({
                        key: 'label',
                        label: 'Label',
                        value: formValue?.label || selectedDatasetElement?.label || '',
                        order: 5,
                        disabled: readonly,
                        require: true,
                        validators: [Validators.required],
                        validationMessages: {
                            required: 'Label is required.',
                        },
                    }),
                    new TextBoxControlBase({
                        key: 'value',
                        label: 'Value',
                        value: formValue?.value || selectedDatasetElement?.value || '',
                        order: 6,
                        disabled: readonly,
                        require: true,
                        validators: [Validators.required],
                        validationMessages: {
                            required: 'Label is required.',
                        },
                    }),
                ]
            }),
        ];

        if (formValue?.controlType === "radio" || selectedDatasetElement?.controlType === "radio") {
            controls.push(
                new TextBoxControlBase({
                    key: 'parent',
                    label: 'Parent',
                    value: formValue?.parent || selectedDatasetElement?.parent || '',
                    order: 7,
                    disabled: readonly,
                    require: true,
                    validators: [Validators.required],
                    validationMessages: {
                        required: 'Parent is required.',
                    },
                })
            )
        }

        if (formValue?.controlType === "datetime" || selectedDatasetElement?.controlType === "datetime") {
            controls.push(
                new TextBoxControlBase({
                    key: 'formatDate',
                    label: 'Format Date',
                    value: formValue?.controlValues?.formatDate || selectedDatasetElement?.controlValues?.formatDate || '',
                    order: 7,
                    disabled: readonly,
                    require: true,
                    validators: [Validators.required],
                    validationMessages: {
                        required: 'Format date is required.',
                    },
                })
            )
        }
        return controls;
    }

    getButtonListDatasetElement(isEditDatasetElement: boolean, readonly?: boolean): ButtonItem[] {
        if (isEditDatasetElement) {
            if (readonly) {
                return [
                    {
                        buttonKey: 'edit',
                        buttonLabel: 'edit',
                        isVisible: true,
                    },
                ]
            } else {
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
                ]
            }
        } else {
            return [
                {
                    buttonKey: 'submit',
                    buttonLabel: 'submit',
                    isVisible: true,
                },
            ];
        }
    }

    createNewDatasetElement(newDatasetElement: any) {
        return this.baseAsyncPostHttpClientUrl('dataset-element', newDatasetElement);
    }

    updateDatasetElement(id: string, updateData: any) {
        return this.baseAsyncPutHttpClientUrl(`dataset-element/${id}`, updateData);
    }

    getControlTypes() {
        // ["link", "input", "button", "singleSelect", "singleCheckbox", "inputFile", "radio", "datetime"];
        const controlTypes = [
            {
                value: 'link',
                title: 'Link'
            },
            {
                value: 'input',
                title: 'Input'
            },
            {
                value: 'button',
                title: 'Button'
            },
            {
                value: 'singleSelect',
                title: 'Single Select'
            },
            {
                value: 'singleCheckbox',
                title: 'Single Checkbox'
            },
            {
                value: 'inputFile',
                title: 'Input File'
            },
            {
                value: 'radio',
                title: 'Radio'
            },
            {
                value: 'datetime',
                title: 'Datetime'
            },
        ]

        return controlTypes;
    }
}