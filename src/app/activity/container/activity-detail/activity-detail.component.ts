import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Blockly from 'blockly';
import { ActivityService } from '../../services/activity.service';
import { DatasetService } from '../../../dataset/services/dataset.service';
import { jsonGenerator } from '../../services/generators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageType } from 'src/app/common/const';
import { UserService } from 'src/app/user/services/user.service';
import { ButtonItem } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { KeycloakService } from 'keycloak-angular';

let count: number = 1;
let createdBlock: any[] = [];
let deletedBlock: any[] = [];

// Custom Block Type Have Order Field
const customBlockTypeWithOrder = ["action_setValue", "action_click", "action_launch"];

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit, OnDestroy {
  workspace: any;
  loading = false;
  customBlocks: any[];
  activityId: string;
  controls: any[];
  datasetList: any[];
  tagList: any[];
  activityData: any;
  action: string = 'create';
  buttonList: ButtonItem[];

  @ViewChild('ActivityForm', { static: false }) activityForm: any;

  public toolbox: string = `<xml id="toolbox" style="display: none">
  <category name="Action" colour="80">
    <block type="action_launch"></block>
    <block type="action_setValue"></block>
    <block type="action_click"></block>
  </category>
  <category name="Custom" colour="300">
    <block type="text"></block>
    <block type="userInput"></block>
  </category>
  </xml>`;

  constructor(
    private activityService: ActivityService,
    private datasetService: DatasetService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private keycloakService: KeycloakService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.loading = true;
    this.loadCustomBlock();
    this.createBlocks();
    this.reloadElementToBlockly();
    await this.fetchData();
    await this.loadElementToBlockly();
    if (this.activityData) {
      this.loadWorkspace();
    }

    this.loading = false;
  }

  ngOnDestroy(): void {
    this.unregisterExtension();
  }

  unregisterExtension() {
    Blockly.Extensions.unregister('dynamic_setValue_extension');
    Blockly.Extensions.unregister('dynamic_click_extension');
    Blockly.Extensions.unregister('dynamic_launch_extension');
  }

  createBlocks() {
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: this.toolbox,
    });
  }

  generateCode(): void {
    let code = jsonGenerator.workspaceToCode(this.workspace);
    document.getElementById('code')!.innerHTML = code;
  }

  saveWorkspace(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.activityId = params['id'];
      if (this.activityId) {
        const activityRes = await this.activityService.getActivityById(this.activityId);

        if (activityRes && activityRes.success) {
          activityRes.content.steps = [];

          // Generate steps from Blockly
          let steps = jsonGenerator.workspaceToCode(this.workspace)

          // Save Step
          activityRes.content.steps = JSON.parse(steps);

          // Save Blockly Definition
          let workSpaceData = new Blockly.serialization.blocks.BlockSerializer().save(this.workspace);
          activityRes.content.blocklyDefinition = JSON.stringify(workSpaceData);

          // Get control value from form
          const { name, description, queryUrl, status, datasets, tags } = this.activityForm.form.value;
          // Save Activity
          let newActivity = {
            ...activityRes.content,
            name,
            description,
            queryUrl,
            status,
            datasets,
            tags
          };

          const res = await this.activityService.updateActivity(this.activityId, newActivity);
          if (res && res.success) {
            await this.fetchData()
            this.action = 'view';
            this.controls = this.activityService.getAllControlForActivityForm(this.datasetList, this.tagList, this.activityData, true);
            this.buttonList = this.activityService.getButtonListForForm(this.action);
          } else {
            this.userService.showAlert('Failed to update activity', MessageType.Error);
          }
        }
      }
    });
  }

  async fetchData() {
    this.activityId = this.activatedRoute.snapshot.params['id'];
    if (this.activityId) {
      this.action = 'view';
      const [activityRes] = await Promise.all([
        this.activityService.getActivityById(this.activityId),
      ]);

      if (activityRes && activityRes.success) {
        this.activityData = activityRes.content;
      }
    }
    const [tagRes, datasetRes] = await Promise.all([
      this.userService.getTags({ PageSize: 1000 }),
      this.datasetService.getDatasets({ PageSize: 1000 })
    ]);
    if (tagRes && tagRes.success) {
      this.tagList = tagRes.content.map(item => ({ key: item._id, text: item.name }));
    }
    if (datasetRes && datasetRes.success) {
      this.datasetList = datasetRes.content.map(item => ({ key: item._id, text: item.projectName }));
    }

    const readonly = this.action === 'view' ? true : false;
    this.controls = this.activityService.getAllControlForActivityForm(this.datasetList, this.tagList, this.activityData, readonly);
    this.buttonList = this.activityService.getButtonListForForm(this.action);
  }

  loadWorkspace() {
    let workSpaceData = JSON.parse(this.activityData.blocklyDefinition);

    if (workSpaceData) {
      // Load Blockly
      new Blockly.serialization.blocks.BlockSerializer().load(
        workSpaceData,
        this.workspace
      );

      // Reset all Value
      count = 1;
      createdBlock = [];
      deletedBlock = [];

      this.workspace.blockDB.forEach((item: any) => {
        if (customBlockTypeWithOrder.includes(item.type)){
          createdBlock.push(item.id);
          count++;
        }
      })
    }
  }

  async loadElementToBlockly(datasets?: string[]) {
    const datasetElements: any = [];
    const datasetIds = datasets || this.activityData?.datasets || [];
    for (const datasetId of datasetIds) {
      const datasetElementRes = await this.datasetService.getDatasetElementsByDatasetId(datasetId);
      if (datasetElementRes && datasetElementRes.success) {
        datasetElements.push(...datasetElementRes.content);
      }
    }
    Blockly.Extensions.register('dynamic_setValue_extension', function () {
      const block = this;
      this.getInput('controlType').appendField(
        new Blockly.FieldDropdown(function () {
          let options: any[] = [];
          let elementList: any[] = [];
          datasetElements.forEach((element: any) => {
            const e = [element.label, JSON.stringify(element)];
            if (element.controlType == "input") {
              elementList.push(e);
            }
          });
          if (elementList.length === 0) {
            elementList.push(['No data', JSON.stringify(null)]);
            block.setEnabled(false);
          } else {
            block.setEnabled(true);
          }
          options = options.concat(elementList);
          return options;
        }),
        'controlType'
      ),
      this.getInput('STEP').appendField(
        new Blockly.FieldLabelSerializable(count.toString()), 'STEP'
      )
    });
    Blockly.Extensions.register('dynamic_click_extension', function () {
      const block = this;
      this.getInput('controlType').appendField(
        new Blockly.FieldDropdown(function () {
          let options: any[] = [];
          let elementList: any[] = [];
          datasetElements.forEach((element: any) => {
            const e = [element.label, JSON.stringify(element)];
            if (element.controlType === "button" || element.controlType === "link") {
              elementList.push(e);
            }
          });
          if (elementList.length === 0) {
            elementList.push(['No data', JSON.stringify(null)]);
            block.setEnabled(false);
          } else {
            block.setEnabled(true);
          }
          options = options.concat(elementList);
          return options;
        }),
        'controlType'
      ),
      this.getInput('STEP').appendField(
        new Blockly.FieldLabelSerializable(count.toString()), 'STEP'
      )
    });
    Blockly.Extensions.register('dynamic_launch_extension', function () {
      this.getInput('STEP').appendField(
        new Blockly.FieldLabelSerializable(count.toString()), 'STEP'
      )
    });
  }

  loadCustomBlock(): void {
    this.customBlocks = this.activityService.getDefineCustomBlocksTEXT();
    Blockly.defineBlocksWithJsonArray(this.customBlocks);
  }

  reloadElementToBlockly() {
    this.workspace.addChangeListener(event);
  }

  async onFormChanges(event) {
    const datasetIds = event.formControl.value;
    this.ngOnDestroy();
    this.loadElementToBlockly(datasetIds);
  }

  async onFormActions(event) {
    if (event.buttonKey === 'edit') {
      // Handle case click edit button
      this.action = 'edit';
      this.controls = this.activityService.getAllControlForActivityForm(this.datasetList, this.tagList, this.activityData);
      this.buttonList = this.activityService.getButtonListForForm(this.action);
      return;
    }
    if (event.buttonKey === 'discard') {
      // Handle case click edit button
      this.action = 'view';
      this.controls = this.activityService.getAllControlForActivityForm(this.datasetList, this.tagList, this.activityData, true);
      this.buttonList = this.activityService.getButtonListForForm(this.action);
      return;
    }
    const isFormValid = this.validateAllFormFields(this.activityForm.form);
    if (isFormValid) {
      const { name, description, queryUrl, status, datasets, tags } = this.activityForm.form.value;
      
      switch (event.buttonKey) {
        case 'submit':
          try {
            // Get user id from keycloak
            const userId = this.keycloakService.getKeycloakInstance().subject;

            // Generate steps from Blockly
            let steps = jsonGenerator.workspaceToCode(this.workspace);
      
            // Save Blockly Definition
            let workSpaceData = new Blockly.serialization.blocks.BlockSerializer().save(this.workspace);
            
            const newActivity: any = {
              name,
              description,
              queryUrl,
              status,
              datasets,
              tags,
              blocklyDefinition: JSON.stringify(workSpaceData),
              steps: JSON.parse(`[${steps}`),
              createdBy: userId
            };
            const createRes = await this.activityService.createNewActivity(newActivity);
            if (createRes && createRes.success) {
              this.router.navigate([`/activities`]);
            }
          } catch (error) {
            this.activityService.showAlert('Failed to create activity', MessageType.Error);
          }
          break;

        case 'save':
          this.saveWorkspace();
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
}

function event(primaryEvent){
  if (primaryEvent.type == "create"){
    if (!customBlockTypeWithOrder.includes(primaryEvent.json.type) || primaryEvent.ids.length > 1)
      return;

    if (deletedBlock.length > 0) {
      createdBlock[deletedBlock[0]] = primaryEvent.blockId;
      deletedBlock.splice(0, 1);
      if (deletedBlock.length == 0) {
        count = createdBlock.length + 1;
      }
      else {
        count = deletedBlock[0] + 1;
      }
    }
    else {
      createdBlock.push(primaryEvent.blockId);
      count = createdBlock.length + 1;
    }
  }

  if (primaryEvent.type == "delete") {
    //count = count - primaryEvent.ids.length;
    for (let index = 0; index < createdBlock.length; index++) {
      primaryEvent.ids.forEach((item: any) => {
        if (item == createdBlock[index]) {
          deletedBlock.push(index);
        }
      })
    }
    count = deletedBlock[0] + 1;
  }

}
