import { RowAction } from '../base-core-ui/app.core.shared.interfaces';

export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  USER: 'End User'
}

export const AppConst = {
  Languages: {
    English: 'en-US',
    Japanese: 'ja-JP',
  },
  LocalStorage: {
    Auth: {
      TokenName: 'authToken',
      ChangePassword: 'changePasswordData',
      ForgotSendEmail: 'forgotSendEmail',
      Permissions: 'permissions',
      ForgotSendToken: 'forgotSendToken',
    },
    Language: 'pipeLanguage',
  },
  SessionStorage: {
    activeMenu: 'activeMenu',
  },
  ResponseMessage: {
    OK: 'ok',
  },
  Permission: {
    AllPermission: '*',
  },
};

export class HttpResponse {
  readonly code: number;
  readonly data: any;
  readonly msg: string;
}

export class MessageResponse {
  readonly type: MessageType;
  readonly text: string;
}

export enum MessageType {
  Error = 1,
  Warning = 2,
  Info = 3,
  None = 4,
}

export enum ActionTypes {
  View = 'View',
  Edit = 'Edit',
  Delete = 'Delete',
  Enable = 'Enable',
  Disable = 'Disable',
  Move = 'Move',
  Approve = 'Approve',
  Reject = 'Reject',
  Renew = 'Renew',
}

export interface TableRowEvent {
  action: RowAction;
  row: any;
}

export interface TableResultResponse {
  TotalItems: number;
  Source: any[];
}

export interface DropDownModel {
  key: number | string;
  value: string;
}
