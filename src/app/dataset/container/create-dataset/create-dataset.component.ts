import { Component, OnInit, ViewChild } from '@angular/core';
import { DatasetService } from '../../services/dataset.service';
import { ButtonItem } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageType } from 'src/app/common/const';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/base-core-ui/controls/confirm/confirm.component';

@Component({
  selector: 'app-create-dataset',
  templateUrl: './create-dataset.component.html',
  styleUrls: ['./create-dataset.component.scss']
})
export class CreateDatasetComponent implements OnInit {
  loading: boolean = true;
  controls: any[];
  buttonList: ButtonItem[];
  datasetId: string;
  isEditMode: boolean;
  datasetData: any;
  datasetElements: any[];
  selectedDatasetElement: any;
  isEditDatasetElement: boolean = false;
  elementControls: any[];
  elementButtonList: ButtonItem[];
  controlTypes: any[];
  controlValuesForm: FormGroup;
  isButtonDisabled: boolean = false;
  
  @ViewChild('CreateDatasetForm', { static: false }) createDatasetForm: any;
  @ViewChild('CreateDatasetElementForm', { static: false }) createDatasetElementForm: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datasetService: DatasetService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.controlValuesForm = this.formBuilder.group({
      controlValues: new FormArray([]),
    });
  }

  ngOnInit() {
    this.controlTypes = this.datasetService.getControlTypes();
    this.activatedRoute.params.subscribe(async params => {
      this.datasetId = params['id'];
      if (this.datasetId) {
        this.isEditMode = true;
        const [datasetRes, datasetElementRes] = await Promise.all([
          this.datasetService.getDatasetById(this.datasetId),
          this.datasetService.getDatasetElementsByDatasetId(this.datasetId)
        ]);
        if (datasetRes && datasetRes.success) {
          this.datasetData = datasetRes.content;
        }
        if (datasetElementRes && datasetElementRes.success) {
          this.datasetElements = datasetElementRes.content;
          // this.selectedDatasetElement = this.datasetElements[0] || undefined;
        }
        // if (this.selectedDatasetElement) {
        //   this.isEditDatasetElement = true;
        // }
        this.elementControls = this.datasetService.getDatasetElementControlForForm(this.selectedDatasetElement);
        this.elementButtonList = this.datasetService.getButtonListDatasetElement(this.isEditDatasetElement);
      }
      this.controls = this.datasetService.getDatasetControlForCreateUpdateForm(this.datasetData, this.isEditMode);
      this.buttonList = this.datasetService.getButtonListForForm(this.isEditMode, this.isEditMode);
      this.loading = false;
    });
  }

  openDialog(type: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: 'If you leave this page any information you have entered will be lost.'
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if (type === 'dataset') {
          this.controls = this.datasetService.getDatasetControlForCreateUpdateForm(this.datasetData, true);
          this.buttonList = this.datasetService.getButtonListForForm(this.isEditMode, true);
        } else if (type === 'datasetElement') {
          this.elementControls = this.datasetService.getDatasetElementControlForForm(this.selectedDatasetElement, true);
          this.elementButtonList = this.datasetService.getButtonListDatasetElement(this.isEditDatasetElement, true);
        }
      }
    });
  }

  async actionButtonList(event: any) {
    if (event.buttonKey === 'discard') {
      this.openDialog('dataset');
      return;
    }
    const isFormValid = this.validateAllFormFields(this.createDatasetForm.form);
    if (isFormValid) {
      const {datasetName, status, description} = this.createDatasetForm.form.value;
      // save to database
      const newDataset = {
        projectName: datasetName,
        description,
        status
      };

      switch (event.buttonKey) {
        case 'edit':
          this.controls = this.datasetService.getDatasetControlForCreateUpdateForm(this.datasetData);
          this.buttonList = this.datasetService.getButtonListForForm(this.isEditMode);
          break;
        case 'submit': // create new dataset
          try {
            const createRes = await this.datasetService.createNewDataset(newDataset);
            if (createRes && createRes.success) {
              this.router.navigate([`/datasets/${createRes.content._id}`]);
            }
          } catch (error) {
            this.datasetService.showAlert(error.message, MessageType.Error);
          }
          break;
        case 'save': // edit dataset
          const updateRes = await this.datasetService.updateDataset(this.datasetId, newDataset);
          if (updateRes && updateRes.success) {
            this.datasetData = updateRes.content;
            this.controls = this.datasetService.getDatasetControlForCreateUpdateForm(this.datasetData, true);
            this.buttonList = this.datasetService.getButtonListForForm(this.isEditMode, true);
            this.datasetService.showAlert('Dataset updated successfully', MessageType.Info);
          } else {
            this.datasetService.showAlert('Failed to update dataset', MessageType.Error);
          }
          break;
        default:
          break;
      }
    }
  }

  validateAllFormFields(formGroup: FormGroup): boolean {
    let isValid = true;
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true, emitEvent: true });
        if (control.invalid) {
          isValid = false;
        }
      } else if (control instanceof FormGroup) {
        if (!this.validateAllFormFields(control)) {
          isValid = false;
        }
      }
    });
    return isValid;
  }

  setActiveItem(item: any): void {
    this.isEditDatasetElement = true;
    this.selectedDatasetElement = item;
    this.elementControls = this.datasetService.getDatasetElementControlForForm(this.selectedDatasetElement, true, this.createDatasetElementForm.form.value);
    this.elementButtonList = this.datasetService.getButtonListDatasetElement(this.isEditDatasetElement, true);
    this.controlValues.clear();
    const { controlType, controlValues } = this.selectedDatasetElement;
    if (controlType === 'singleSelect') {
      controlValues.forEach(item => {
        const controlValues = this.formBuilder.group({
          label: [item.label, Validators.required],
          value: [item.value, Validators.required],
        });
        this.controlValues.push(controlValues)
      })
    } else if (controlType === 'singleCheckbox') {
      controlValues.forEach(item => {
        const controlValues = this.formBuilder.group({
          id: [item, Validators.required]
        });
        this.controlValues.push(controlValues)
      })
    }
    this.controlValues.disable();
    this.isButtonDisabled = true;
  }

  handleCreateButtonClick() {
    if (this.isEditDatasetElement) {
      this.isEditDatasetElement = false;
      this.selectedDatasetElement = null;
      this.elementControls = this.datasetService.getDatasetElementControlForForm(this.selectedDatasetElement);
      this.elementButtonList = this.datasetService.getButtonListDatasetElement(this.isEditDatasetElement);
    }
  }

  prepareDatasetInput(data) {
    const {controlType, type, label, value, parent, formatDate} = data;
    let datasetElementData: any = {
      datasetId: this.datasetId,
      controlType,
      type,
      label,
      value,
      controlValues: [],
      parent: null
    };
    switch (controlType) {
      case 'radio':
        datasetElementData.parent = parent;
        break;
      case 'datetime':
        datasetElementData.controlValues = { formatDate };
        break;
      case 'singleSelect':
        const controlValuesSelect = this.controlValuesForm.value.controlValues;
        const filteredControlValuesSelect = controlValuesSelect.filter(item => item.label.trim() && item.value.trim());
        datasetElementData.controlValues = filteredControlValuesSelect;
        break;
      case 'singleCheckbox':
        const controlValuesCheckbox = this.controlValuesForm.value.controlValues;
        const filteredControlValuesCheckbox = controlValuesCheckbox.filter(item => item.id.trim()).map(item => item.id);
        datasetElementData.controlValues = filteredControlValuesCheckbox;
        break;
      default:
        break;
    }
    return datasetElementData;
  }

  async actionButtonListDatasetElementForm(event) {
    if (event.buttonKey === 'discard') {
      this.openDialog('datasetElement');
      return;
    }
    const isFormValid = this.validateAllFormFields(this.createDatasetElementForm.form);
    if (isFormValid) {
      const datasetElementData = this.prepareDatasetInput(this.createDatasetElementForm.form.value);
      
      switch (event.buttonKey) {
        case 'edit':
          this.elementControls = this.datasetService.getDatasetElementControlForForm(this.selectedDatasetElement);
          this.elementButtonList = this.datasetService.getButtonListDatasetElement(this.isEditDatasetElement);
          this.controlValues.enable();
          this.isButtonDisabled = false;
          break;
        case 'submit': // handle create new datasetElement
          const createRes = await this.datasetService.createNewDatasetElement(datasetElementData);
          if (createRes && createRes.success) {
            // show notification
            this.datasetService.showAlert('New dataset element created successfully', MessageType.Info);
            // Reset form
            this.elementControls = this.datasetService.getDatasetElementControlForForm(this.selectedDatasetElement);
            this.controlValues.clear();
            this.elementButtonList = this.datasetService.getButtonListDatasetElement(this.isEditDatasetElement);
            // load list dataset elements
            await this.reloadListDatasetElements();
          } else {
            this.datasetService.showAlert('Failed to create new dataset element', MessageType.Error);
          }
          break;
        case 'save': // hadnle update datasetElement
          const id = this.selectedDatasetElement._id;
          const updatedRes = await this.datasetService.updateDatasetElement(id, datasetElementData);
          if (updatedRes && updatedRes.success) {
            // show notification
            this.datasetService.showAlert('Dataset element updated successfully', MessageType.Info);
            // load list dataset elements
            await this.reloadListDatasetElements();
            // Update form, button list
            this.elementControls = this.datasetService.getDatasetElementControlForForm(this.selectedDatasetElement, true);
            this.elementButtonList = this.datasetService.getButtonListDatasetElement(this.isEditDatasetElement, true);
            this.controlValues.disable();
            this.isButtonDisabled = true;
          } else {
            this.datasetService.showAlert('Failed to update dataset element', MessageType.Error);
          }
          break;
        default:
          break;
      }
    }
  }

  async reloadListDatasetElements() {
    if (this.datasetId) {
      const res = await this.datasetService.getDatasetElementsByDatasetId(this.datasetId);
      if (res && res.success) {
        this.datasetElements = res.content;
      }
      if (this.selectedDatasetElement) {
        const updateDatasetElement = this.datasetElements.find(item => item._id === this.selectedDatasetElement._id);
        if (updateDatasetElement) {
          this.selectedDatasetElement = updateDatasetElement;
        }
      }
    }
  }

  datasetElementsByControlType(controlType: string) {
    if (!this.datasetElements)
      return [];
    const result = this.datasetElements.filter(item => item.controlType === controlType);
    return result;
  }

  onFormControlOnChanges(event) {
    const {value, tagName} = event.target;
    if (tagName === "SELECT" && this.controlTypes.some(item => item.value === value)) {
      this.controlValues.clear();
      this.elementControls = this.datasetService.getDatasetElementControlForForm(this.selectedDatasetElement, false, this.createDatasetElementForm.form.value);
      this.addControlValue();
    }
  }

  get controlValues(): FormArray {
    return this.controlValuesForm.get("controlValues") as FormArray
  }

  addControlValue() {
    const { controlType } = this.createDatasetElementForm.form.value;
    let newControlValue;
    switch (controlType) {
      case 'singleSelect':
        newControlValue = this.formBuilder.group({
          label: ['', Validators.required],
          value: ['', Validators.required],
        })
        break;
      case 'singleCheckbox':
        newControlValue = this.formBuilder.group({
          id: ['', Validators.required]
        })
        break;
      default:
        break;
    }
    if (newControlValue) {
      this.controlValues.push(newControlValue);
    }
  }

  removeControlValue(index: number) {
    this.controlValues.removeAt(index);
  }
}
