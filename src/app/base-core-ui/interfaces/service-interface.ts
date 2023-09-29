import { ParamRequestSearchType } from '../app.core.shared.enums';

export interface RequestItem {
  ActionName?: string;
  KeyValues?: {};
  GridRequestInfo?: GridRequestInfo;
  KeyRequest?: string;
  SearchInfo?: {};
}
export interface GridRequestInfo {
  PageIndex?: number;
  PageSize?: number;
  SortName?: string;
  SortDesc?: string;
}

export interface SearchParamRequest {
  Key: string;
  Value: string;
  Type: ParamRequestSearchType;
}
