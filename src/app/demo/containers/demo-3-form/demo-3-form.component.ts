import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../services/demo.service';
import { FormSection } from '../../../base-core-ui/app.core.shared.interfaces';
import { ControlBase } from '../../../base-core-ui/app.core.shared.models';
import { WizardFormButtonItem } from '../../../base-core-ui/app.core.shared.interfaces';
import { WizardActionType } from '../../../base-core-ui/app.core.shared.enums';
import { SharedService } from '../../../services/shared.service';
import { MasterService } from '../../../services/master-service';
import { DataForm1Component } from '../../components/data-form_1/data-form_1.component';
import { DataForm2Component } from '../../components/data-form_2/data-form_2.component';
import { DataForm3Component } from '../../components/data-form_3/data-form_3.component';
import { DataForm4Component } from '../../components/data-form_4/data-form_4.component';
import { StepAction } from 'src/app/base-core-ui/forms/wizard-form/form-wizard-section.component';

enum SECTION_KEYS {
  PACKAGE = 'Package',
  POLICY = 'Policy',
  CLIENT_INFO = 'ClientInfo',
  CONFIRM = 'Confirm',
}

@Component({
  selector: 'app-demo-3-form',
  templateUrl: './demo-3-form.component.html',
  styleUrls: ['./demo-3-form.component.scss'],
})
export class Demo3FormComponent implements OnInit {
  formSections: FormSection[];
  confirmControls: any[];
  bottomLeftControl: ControlBase<string>;
  afterActionExecute: StepAction = new StepAction();
  moreButtons: WizardFormButtonItem[] = [];
  formData: any = {};
  confirmAccept: boolean = false;
  loading = false;

  WizardActionTypeLabel: any = {
    NextStep: 'next',
    PreviousStep: 'back',
    Cancel: 'cancel',
    Finish: 'submit',
  };

  constructor(
    private demoService: DemoService,
    private masterService: MasterService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.confirmControls = this.demoService.getControlForDataFormConfirm();
    this.formSections = [
      {
        sectionKey: SECTION_KEYS.PACKAGE,
        sectionName: 'Package',
        isVisible: true,
        sectionData: {
          componentType: DataForm1Component,
          inputs: { index: Math.random() },
        },
      },
      {
        sectionKey: SECTION_KEYS.POLICY,
        sectionName: 'Policy',
        isVisible: true,
        sectionData: {
          componentType: DataForm2Component,
          inputs: { index: Math.random() },
        },
      },
      {
        sectionKey: SECTION_KEYS.CLIENT_INFO,
        sectionName: "Client's Info",
        isVisible: true,
        sectionData: {
          componentType: DataForm3Component,
          inputs: { index: Math.random() },
        },
      },
      {
        sectionKey: SECTION_KEYS.CONFIRM,
        sectionName: 'Confirm',
        isVisible: true,
        sectionData: {
          componentType: DataForm4Component,
          inputs: { index: Math.random(), controls: this.confirmControls },
        },
      },
    ];
    this.bottomLeftControl = this.demoService.getLeftControlWizard();
    this.moreButtons.push({
      ActionName: 'ResetClientInfo',
      buttonKey: 'reset',
      buttonLabel: 'Reset',
      isVisible: false,
    });

    this.loading = false;
  }

  public onFormGroupChangeEvent(formGroup: any) {
    this.formData[formGroup.formSectionKey] = formGroup;
    if (formGroup.formSectionKey === SECTION_KEYS.PACKAGE) {
      this.getTotalAmount(formGroup);
    }
  }

  async nextStep(stepAction: any) {
    const actionName = stepAction['ActionName'];
    if (actionName === 'ResetClientInfo') {
      this.sharedService.onWizardAction({ key: 'reset' });
    } else if (actionName === WizardActionType.Cancel) {
      this.masterService.reloadCurrentPage();
    } else if (actionName === WizardActionType.PreviousStep) {
      this.afterActionExecute = stepAction;
    } else if (actionName === WizardActionType.NextStep) {
      let formSection = stepAction.Data as FormSection;
      let formGroup = this.formData[formSection.sectionKey];
      if (formGroup) {
        this.validatorForm(formGroup);
        formSection.error = !formGroup.valid;
        if (formGroup.valid) {
          if (formSection.sectionKey === SECTION_KEYS.CLIENT_INFO) {
            await this.getConfirmData();
          }

          this.moreButtons.filter(
            (item) => item.ActionName === 'ResetClientInfo'
          )[0].isVisible = formGroup.formSectionKey === SECTION_KEYS.POLICY;

          this.afterActionExecute = stepAction;
        }
      }
    } else if (actionName === WizardActionType.Finish) {
      this.confirmAccept = true;
    }
  }

  validatorForm(formGroup: any) {
    for (let control in formGroup.controls) {
      formGroup.get(control).markAsTouched();
      formGroup.get(control).updateValueAndValidity();
    }
  }

  getTotalAmount(formGroup: any) {
    if (formGroup.controls.service) {
      if (formGroup.controls.service.value === 'service') {
        this.bottomLeftControl.value = '1000';
      } else if (formGroup.controls.service.value === 'implement') {
        this.bottomLeftControl.value = '800';
      }
    }
  }

  async getConfirmData() {
    const formDataPackage = this.formData[SECTION_KEYS.PACKAGE];
    const formDataPolicy = this.formData[SECTION_KEYS.POLICY];
    const formDataClientInfo = this.formData[SECTION_KEYS.CLIENT_INFO];
    const formDataConfirm = this.formData[SECTION_KEYS.CONFIRM];

    let clientInfo: any = {};
    if (formDataClientInfo !== null) {
      let data = formDataClientInfo.value;
      if (data['clients'] !== undefined) {
        clientInfo = await this.demoService.getClient(data['clients']);
      } else {
        clientInfo = data;
      }
    }

    if (
      formDataPackage &&
      formDataPolicy &&
      formDataClientInfo &&
      formDataConfirm
    ) {
      let policy = '';
      for (let key of formDataPolicy.controls.certificates.value)
        policy += key.label + '\n ';
      if (policy !== '') policy = policy.substring(0, policy.length - 2);
      this.setValueForConfirmControl(
        'licensePackage',
        formDataPackage.controls.service.value
      );
      this.setValueForConfirmControl('policy', policy);
      this.setValueForConfirmControl(
        'recurrence',
        formDataPackage.controls.service.value === 'service'
          ? '6 months'
          : '3 months'
      );
      this.setValueForConfirmControl('name', clientInfo['name']);
      this.setValueForConfirmControl('email', clientInfo['email']);
      this.setValueForConfirmControl('phone', clientInfo['phone']);
      this.setValueForConfirmControl('address', clientInfo['address']);
      this.setValueForConfirmControl(
        'provinceOrDistrict',
        clientInfo['provinceOrDistrict']
      );
      this.setValueForConfirmControl('country', clientInfo['country']);
    }
  }

  setValueForConfirmControl(key: any, value: any) {
    const control = this.confirmControls.find((item) => item.key === key);
    if (control) {
      control.value = value;
    }
  }

  goBack(): void {
    this.masterService.goBack();
  }

  createAnotherLicense() {
    this.masterService.reloadCurrentPage();
  }

  onMoveStepAction(event: any) {}
}
