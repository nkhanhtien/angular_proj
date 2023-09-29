import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Injector,
  KeyValueDiffer,
  KeyValueDiffers,
  DoCheck,
} from '@angular/core';
import { WizardActionType } from '../../app.core.shared.enums';
import {
  FormSection,
  WizardFormButtonItem,
} from '../../app.core.shared.interfaces';
import { WizardBottomControlBase } from '../../app.core.shared.models';

export class StepAction {
  ActionName: string;
  Data: any;
}

@Component({
  selector: 'app-formc-wizard-section',
  templateUrl: './form-wizard-section.component.html',
  styleUrls: ['./form-wizard-section.component.scss'],
})
export class FormWizardSectionComponent implements OnInit, DoCheck {
  @Input() Sections: FormSection[];
  @Input() PrimaryButtons: WizardFormButtonItem[] = [];
  @Input() MoreButtons: WizardFormButtonItem[] = [];
  @Input() UseDefaultButton: boolean = true;
  @Input() ShowTopMenuAction: boolean = true;

  @Input() bottomLeftClass: string = '';
  @Input() WizardActionTypeLabel: any = {
    NextStep: 'next',
    PreviousStep: 'previous',
    Cancel: 'cancel',
    Finish: 'finish',
  };
  @Input() bottomLeftControl?: WizardBottomControlBase = undefined;
  @Output() OnStepAction = new EventEmitter<any>();
  @Output() OnMoveStepAction = new EventEmitter<any>();
  @Output() OnFormGroupChange = new EventEmitter<any>();

  @Input() AfterActionExecute: StepAction;
  private differ: KeyValueDiffer<string, any>;
  private differs: KeyValueDiffers | null;
  private moveStepToForm: any;

  constructor(injector: Injector) {
    this.AfterActionExecute = new StepAction();
    this.differs = injector.get(KeyValueDiffers, null);
  }

  public onFormGroupChangeEvent(_event: any, formSectionKey: string) {
    _event['formSectionKey'] = formSectionKey;
    this.OnFormGroupChange.emit(_event);
  }

  ngDoCheck() {
    const change = this.differ.diff(this.AfterActionExecute);
    if (change) {
      switch (this.AfterActionExecute.ActionName) {
        case WizardActionType.NextStep:
          this._nextSection();
          break;
        case WizardActionType.PreviousStep:
          this._previousSection();
          break;
        case WizardActionType.MoveStep:
          this.setSelectedSections(this.moveStepToForm);
          break;
        case WizardActionType.Finish:
          this._finish();
          break;
      }
    }
  }

  ngOnInit() {
    $event: Event;
    for (let section of this.Sections) {
      section.isLoaded = false;
    }

    let selectedDefault = this.Sections.find((d) => d.selectedDefault === true);
    if (selectedDefault === undefined) {
      selectedDefault = this.Sections[0];
    }

    this.setSelectedSections(selectedDefault);

    if (this.differs !== null) {
      this.differ = this.differs.find(this.AfterActionExecute).create();
    }

    if (this.UseDefaultButton) {
      this.PrimaryButtons.push({
        ActionName: WizardActionType.PreviousStep,
        buttonKey: 'previousStep',
        buttonLabel: this.WizardActionTypeLabel.PreviousStep,
        isVisible: true,
      });

      this.PrimaryButtons.push({
        ActionName: WizardActionType.NextStep,
        buttonKey: 'nextStep',
        buttonLabel: this.WizardActionTypeLabel.NextStep,
        isVisible: true,
      });

      this.PrimaryButtons.push({
        ActionName: WizardActionType.Finish,
        buttonKey: 'finish',
        buttonLabel: this.WizardActionTypeLabel.Finish,
        isVisible: true,
      });

      this.MoreButtons.push({
        ActionName: WizardActionType.Cancel,
        buttonKey: 'cancel',
        buttonLabel: this.WizardActionTypeLabel.Cancel,
        isVisible: true,
      });
    }
  }

  getActionButtons(buttons: WizardFormButtonItem[]) {
    return buttons.filter((item) => item.isVisible);
  }

  getBottomActionButtons(buttons: WizardFormButtonItem[]) {
    let actions: WizardFormButtonItem[] = [
      {
        ActionName: WizardActionType.Cancel,
        buttonKey: 'cancel',
        buttonLabel: this.WizardActionTypeLabel.Cancel,
        isVisible: true,
      },
    ];

    buttons
      .filter((item) => item.isVisible)
      .forEach((item) => actions.push(item));
    return actions;
  }

  stepSuccess(sectionName: string) {
    for (let index = 0; index < this.Sections.length; index++) {
      let section = this.Sections[index];
      if (section.selected) return false;
      else if (section.sectionName === sectionName) return true;
    }
    return false;
  }

  stepError(sectionName: string) {
    for (let index = 0; index < this.Sections.length; index++) {
      let section = this.Sections[index];
      if (section.sectionName === sectionName && section.error) return true;
    }
    return false;
  }

  clickSection(item: FormSection) {
    this.moveStepToForm = item;
    let currentSection = this.Sections.find((item) => item.selected);

    if (this.checkGoToBackStep(currentSection, item)) {
      this.setSelectedSections(item);
    } else {
      this.OnMoveStepAction.emit({
        currentForm: this.Sections.find((item) => item.selected),
      });
    }
  }

  checkGoToBackStep(fromSection: any, toSection: any) {
    let goToBack = false;
    if (
      this.Sections.findIndex(
        (item) => item.sectionKey === fromSection.sectionKey
      ) >
      this.Sections.findIndex(
        (item) => item.sectionKey === toSection.sectionKey
      )
    ) {
      goToBack = true;
    }
    return goToBack;
  }

  setSelectedSections(item: FormSection) {
    for (let section of this.Sections) {
      if (section.sectionKey !== item.sectionKey) {
        section.selected = false;
      }
    }
    this.AfterActionExecute = new StepAction();
    item.selected = true;
    item.isLoaded = true;
  }

  _nextSection() {
    let nextSection = this.getNextSection(this.getSelectedSection());
    if (nextSection) {
      this.setSelectedSections(nextSection);
    }
  }

  _previousSection() {
    let previousSection = this.getPreviousSection(this.getSelectedSection());
    if (previousSection) {
      this.setSelectedSections(previousSection);
    }
  }

  _finish() {
    let eventAction = new StepAction();
    eventAction.ActionName = WizardActionType.Finish;
    eventAction.Data = this.getSelectedSection();
    this.OnStepAction.emit(eventAction);
  }

  formAction(actionName: string) {
    let eventAction = new StepAction();
    eventAction.ActionName = actionName;
    eventAction.Data = this.getSelectedSection();
    this.OnStepAction.emit(eventAction);
  }

  checkHideButton(actionName: string) {
    switch (actionName) {
      case WizardActionType.PreviousStep:
        if (this.getPreviousSection(this.getSelectedSection()) === null)
          return true;
        break;
      case WizardActionType.NextStep:
        if (this.getNextSection(this.getSelectedSection()) === null)
          return true;
        break;
      case WizardActionType.Finish:
        if (!this.isLatestSection(this.getSelectedSection())) return true;
        break;
    }

    return false;
  }

  getNextSection(item: FormSection) {
    for (let index = 0; index < this.Sections.length; index++) {
      let section = this.Sections[index];
      if (
        section.sectionKey === item.sectionKey &&
        index + 1 < this.Sections.length
      ) {
        return this.Sections[index + 1];
      }
    }
    return null;
  }

  getPreviousSection(item: FormSection) {
    for (let index = 0; index < this.Sections.length; index++) {
      let section = this.Sections[index];
      if (section.sectionKey === item.sectionKey && index - 1 >= 0) {
        return this.Sections[index - 1];
      }
    }
    return null;
  }

  getSelectedSection() {
    for (let index = 0; index < this.Sections.length; index++) {
      let section = this.Sections[index];
      if (section.selected) {
        return section;
      }
    }
    return this.Sections[0];
  }

  isLatestSection(item: FormSection) {
    if (this.Sections[this.Sections.length - 1].sectionKey === item.sectionKey)
      return true;
    else return false;
  }
}
