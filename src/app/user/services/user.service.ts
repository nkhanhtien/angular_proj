import { Injectable, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { KeycloakService } from 'keycloak-angular';
import { ButtonItem, GridRequestInfo } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { ColumnDefine, ControlBase, DropdownMultipleSelectControlBase, GridDefine, TextBoxControlBase, TextBoxPasswordControlBase, VerHorListControlBase } from 'src/app/base-core-ui/app.core.shared.models';
import { ActionTypes, MessageType } from 'src/app/common/const';
import { AppConfigService } from 'src/app/services/app-config.service';
import { MasterService } from 'src/app/services/master-service';
import { AppBaseService } from 'src/app/services/service-base';

@Injectable()
export class UserService extends AppBaseService {
    userPath: string = 'user-detail';

    constructor(
        private masterService: MasterService,
        injector: Injector,
        appConfigService: AppConfigService,
        private keycloakService: KeycloakService
    ) {
        super(injector, appConfigService);
    }

    getColumnDefine(): ColumnDefine[] {
        let columns: ColumnDefine[] = [
            new ColumnDefine({
                columnDef: 'username',
                header: 'Username',
                isVisible: true,
            }),
            new ColumnDefine({
                columnDef: 'firstName',
                header: 'First name',
                isVisible: true,
            }),
            new ColumnDefine({
                columnDef: 'lastName',
                header: 'Last name',
                isVisible: true,
            }),
            new ColumnDefine({
                columnDef: 'email',
                header: 'Email',
                isVisible: true,
            })
        ];
        return columns;
    }

    getDisplayedColumns(): string[] {
        let displayedColumns = [
            'username',
            'firstName',
            'lastName',
            'email',
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
                }
            ]
        };
        return gridDefinitions;
    }

    getUserControlForCreateUpdateForm(tagList: any[], userInfo: UserRepresentation | undefined, userDetail?: any, readonly?: boolean): ControlBase<any>[] {
        let controls = [
            new VerHorListControlBase({
                key: 'name',
                order: 1,
                rowGroup: true,
                children: [
                    new TextBoxControlBase({
                        key: 'firstName',
                        label: 'First name',
                        value: userInfo?.firstName || '',
                        order: 2,
                        require: true,
                        disabled: readonly,
                        validators: [Validators.required],
                        validationMessages: {
                            required: 'First name is required.',
                        },
                    }),
                    new TextBoxControlBase({
                        key: 'lastName',
                        label: 'Last name',
                        value: userInfo?.lastName || '',
                        order: 3,
                        require: true,
                        disabled: readonly,
                        validators: [Validators.required],
                        validationMessages: {
                            required: 'Last name is required.',
                        },
                    }),
                ]
            }),
            new VerHorListControlBase({
                key: 'contact',
                order: 4,
                rowGroup: true,
                children: [
                    new TextBoxControlBase({
                        key: 'username',
                        label: 'Username',
                        value: userInfo?.username || '',
                        required: true,
                        disabled: !!userInfo,
                        order: 5,
                        validationMessages: {
                            pattern: 'Username must be in the correct format',
                            required: 'Username is required',
                            minlength: 'Username must be at least 5 characters long',
                            maxlength: 'Username must be at least 20 characters long',
                        },
                        validators: [
                            Validators.pattern(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/),
                            Validators.required,
                            Validators.minLength(5),
                            Validators.maxLength(20),
                        ]
                    }),
                    new TextBoxControlBase({
                        key: 'email',
                        label: 'Email',
                        placeholder: 'example@domain.com',
                        value: userInfo?.email || '',
                        required: true,
                        disabled: readonly,
                        order: 6,
                        validationMessages: {
                            email: 'Email must be in the correct format',
                            required: 'validate-control.validate-email',
                            minlength: 'validate-control.validate-email-minlength',
                            maxlength: 'validate-control.validate-email-maxlength',
                        },
                        validators: [
                            Validators.email,
                            Validators.required,
                            Validators.minLength(4),
                            Validators.maxLength(24),
                        ]
                    }),
                ]
            }),
            new DropdownMultipleSelectControlBase({
                key: 'tags',
                label: 'Tags',
                placeholder: 'Select multiple tags',
                order: 8,
                required: true,
                disabled: readonly,
                items: tagList.map(item => ({ key: item._id, text: item.name })),
                value: userDetail?.tags.map(item => (item._id)) || [],
                validationMessages: {
                    required: 'Groups is required.',
                },
                validators: [Validators.required],
            })
        ];
        return controls.sort((a, b) => {
            return a.order - b.order;
        });
    }

    getControlsForChangePassword(): ControlBase<any>[] {
        const controls: ControlBase<any>[] = [
            new TextBoxPasswordControlBase({
                key: 'old_password',
                label: 'Old password',
                value: '',
                order: 1,
                type: 'password',
                placeholder: 'Enter your old password',
                notifyChanges: true,
                hideTextHeader: false,
                validationMessages: {
                    required: 'Old password is required',
                },
                validators: [Validators.required]
            }),
            new TextBoxPasswordControlBase({
                key: 'password',
                label: 'New password',
                value: '',
                order: 2,
                type: 'password',
                placeholder: 'Enter your new password',
                notifyChanges: true,
                hideTextHeader: false,
                validationMessages: {
                    required: 'New password is required',
                },
                validators: [Validators.required]
            }),
            new TextBoxPasswordControlBase({
                key: 'confirm_password',
                label: 'Confirm password',
                value: '',
                order: 3,
                type: 'password',
                placeholder: 'Enter confirm password',
                notifyChanges: true,
                hideTextHeader: false,
                validationMessages: {
                    required: 'Confirm password is required',
                },
                validators: [Validators.required]
            }),
        ];
        return controls;
    }

    async getButtonListForForm(action: string, userInfo: any = null): Promise<ButtonItem[]> {
        let buttons;
        if (userInfo) {
            const userProfile = await this.keycloakService.loadUserProfile();
            if (userInfo.userRoles.find((x) => x.name === 'Super Admin') && userProfile.id !== userInfo.id) {
                return [];
            }
        }
        switch (action) {
            case 'create':
                buttons =  [
                    {
                        buttonKey: 'submit',
                        buttonLabel: 'submit',
                        isVisible: true,
                    },
                ];
                break;
            case 'view':
                buttons =  [
                    {
                        buttonKey: 'edit',
                        buttonLabel: 'edit',
                        isVisible: true,
                    },
                    {
                        buttonKey: 'change_password',
                        buttonLabel: 'Change Password',
                        isVisible: true,
                    },
                ];
                break;
            case 'edit':
            case 'change_password':
                buttons =  [
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
                break;
            default:
                break;
        }
        return buttons;
    }

    showAlert(message: string, type: MessageType) {
        this.masterService.resetMessages();

        this.masterService.addMessages([
            {
                type: type,
                text: message,
            },
        ]);
    }

    getTags(gridInfo: GridRequestInfo) {
        return this.baseAsyncGetHttpClientUrl('tag', gridInfo);
    }

    createUserDetail(data: any) {
        return this.baseAsyncPostHttpClientUrl(`${this.userPath}`, data);
    }

    getUserDetailByUserId(userId: string) {
        return this.baseAsyncGetHttpClientWithUrl(`${this.userPath}/user-id/${userId}`);
    }

    updateUserDetail(id: string, data: any) {
        return this.baseAsyncPutHttpClientUrl(`${this.userPath}/${id}`, data);
    }
}