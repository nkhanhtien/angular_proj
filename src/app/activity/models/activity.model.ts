export interface ISelect {
    value: string;
    label: string;
}
export interface ITimePicker {
    formatDate: string;
}
export interface IDatasetElement extends Document {
    _id: string;
    datasetId: string;
    controlType: string;
    type: string;
    controlValues?: (string | ISelect | IDatasetElement)[] | ITimePicker;
    value?: string;
    label: string;
    parent?: string;
}
export interface IActivityStepParams {
    value?: string;
}
export interface IActivityStep {
    order: number;
    datasetElementId?: string;
    element?: IDatasetElement;
    action: string;
    params?: IActivityStepParams;
    hint?: string;
    queryUrl?: string;
}
export interface IActivity extends Document {
    name: string;
    steps: Array<IActivityStep>;
    queryUrl?: string;
    description: string;
    groupTags: Array<string>;
    roleTags: Array<string>;
    status: string;
    createdBy: string;
    blocklyDefinition: string;
}