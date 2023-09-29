import { Injectable, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { GridRequestInfo, SearchParamRequest } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { ColumnDefine, ControlBase, DropdownControlBase, GridDefine, TextBoxControlBase, VerHorListControlBase } from 'src/app/base-core-ui/app.core.shared.models';
import { ActionTypes, MessageType } from 'src/app/common/const';
import { AppConfigService } from 'src/app/services/app-config.service';
import { MasterService } from 'src/app/services/master-service';
import { AppBaseService } from 'src/app/services/service-base';

@Injectable()
export class UserGroupService extends AppBaseService {
    private path: string = 'tag';

    constructor(
        injector: Injector,
        configService: AppConfigService,
        private masterService: MasterService
    ) {
        super(injector, configService)
    }

    createNewTag(newTag: { name: string; description: string; status: string; createdBy: string }) {
        return this.baseAsyncPostHttpClientUrl(this.path, newTag);
    }

    updateTag(id: string, newTag: { name: string; description: string; status: string; createdBy: string }) {
        return this.baseAsyncPutHttpClientUrl(`${this.path}/${id}`, newTag);
    }

    getAllTag(gridInfo: GridRequestInfo, searchParamRequest?: SearchParamRequest[]) {
        return this.baseAsyncGetHttpClientUrl(`${this.path}`, gridInfo, searchParamRequest);
    }

    getTagById(id: string) {
        return this.baseAsyncGetHttpClientWithUrl(`${this.path}/${id}`);
    }

    deleteTagById(id: string) {
        return this.baseAsyncDeleteHttpClientUrl(`${this.path}/${id}`);
    }

    getTagTitle(action: string) {
        switch (action) {
            case 'View':
                return 'Detail a tag';
            case 'Edit':
                return 'Update a tag';
            case 'Create':
                return 'Create a tag';
            default:
                return 'Create a tag';
        }
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
            })
        ];
        return columns;
    }

    getDisplayedColumns(): string[] {
        let displayedColumns = [
            'name',
            'description'
        ];
        displayedColumns.push('actions');
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
                    actionKey: ActionTypes.View,
                    actionLabel: 'view',
                    primaryAction: false,
                },
                {
                    actionKey: ActionTypes.Edit,
                    actionLabel: 'edit',
                    primaryAction: false,
                },
                {
                    actionKey: ActionTypes.Delete,
                    actionLabel: 'delete',
                    primaryAction: false,
                },
            ],
        };
        return gridDefinitions;
    }

    getAllControlForTagForm(action: string, data: any): ControlBase<any>[] {
        const controls = [
            new VerHorListControlBase({
                key: 'tagIdAndStatus',
                order: 1,
                rowGroup: true,
                children: [
                    new TextBoxControlBase({
                        key: 'tagId',
                        label: 'Tag ID',
                        value: data?._id || '',
                        order: 1,
                        disabled: true,
                    }),
                    new DropdownControlBase({
                        key: 'status',
                        label: 'Status',
                        required: true,
                        disabled: action === 'View',
                        items: [
                            { key: 'ACTIVE', value: 'ACTIVE' },
                            { key: 'INACTIVE', value: 'INACTIVE' },
                        ],
                        value: data?.status || 'INACTIVE',
                        validationMessages: {
                            required: 'Status is required.',
                        },
                        order: 2,
                        validators: [Validators.required],
                    }),
                ]
            }),
            new TextBoxControlBase({
                key: 'name',
                label: 'Name',
                value: data?.name || '',
                order: 3,
                required: true,
                disabled: action === 'View',
                validators: [Validators.required],
                validationMessages: {
                    required: 'Name is required.',
                },
            }),
            new TextBoxControlBase({
                key: 'description',
                label: 'Description',
                value: data?.description || '',
                order: 4,
                disabled: action === 'View',
            }),
        ]
        return controls;
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