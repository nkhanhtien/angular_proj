import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoService } from '../../services/demo.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ButtonItem,
  PageDataInfo,
  TreeItemNode,
} from 'src/app/base-core-ui/app.core.shared.interfaces';
import { GridDefine } from 'src/app/base-core-ui/app.core.shared.models';
import { DialogDynamicFormComponent } from 'src/app/base-core-ui/controls/dialog-dynamic/dialog-dynamic.component';
import { DialogCorporationComponent } from '../dialog-corporation/dialog-corporation.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-demo-1-form',
  templateUrl: './demo-1-form.component.html',
  styleUrls: ['./demo-1-form.component.scss'],
})
export class Demo1FormComponent implements OnInit {
  controls: any[];
  searchControls: any[];
  validatorFn: any;
  asyncValidatorFn: any[];
  buttonList: ButtonItem[];
  gridDefinitions: GridDefine = new GridDefine();
  dataSource: any[];
  formWithPopUpControls: any[];
  pageInfo: PageDataInfo = {
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  };
  loading = true;

  @ViewChild('Child1Form', { static: false }) form1: any;
  @ViewChild('searchForm', { static: false }) searchForm: any;
  @ViewChild('FormWithPopUp', { static: false }) formWithPopUp: any;

  constructor(private demoService: DemoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.controls = this.demoService.getAllControlForForm();
    this.formWithPopUpControls = this.demoService.getAllControlForFormPopUp();
    this.searchControls = this.demoService.getControlForSearchForm();
    this.buttonList = this.demoService.getButtonListForForm();
    this.gridDefinitions = this.demoService.getGridDefinitions();
    this.demoService.getDatasourseForMasterForm().subscribe((data) => {
      this.dataSource = data;
      this.pageInfo.total = data.length;
    });

    this.reviewAllParentNode();

    interval(2000).subscribe(() => {
      this.loading = false;
    });
  }

  onFormOnInit(event: any) {
    // console.log('Form OnInit');
    //console.log(event);
  }

  onFormControlOnInit(event: any) {
    // console.log('Form Control OnInit');
    //console.log(event);
  }

  onSubmitSearchForm(event: any) {
    console.log('Get search form value Value');
    console.log(this.searchForm.form.value);
  }

  actionButtonList(event: any) {
    console.log('submit search form', this.form1.form.value);
    this.validateAllFormFields(this.form1.form);
  }

  onRowActions(event: any) {}

  showAlert() {
    this.demoService.showAlert();
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogDynamicFormComponent, {
      width: '800px',
      disableClose: true,
      data: {
        formComponent: {
          componentType: DialogCorporationComponent,
          inputs: {},
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action === 'Save') {
        this.formWithPopUp.form.controls.corporation.setValue(result.id);
      }
    });
  }

  get DataTreeNode1() {
    return this.demoService.TREE_DATA1;
  }

  get DataTreeNode2() {
    return this.demoService.TREE_DATA2;
  }

  ItemCheckChanged(node: any) {
    console.log(node);
  }

  reviewAllParentNode() {
    this.DataTreeNode2.forEach((d) => {
      this.checkSelectedAllParent(d);
    });
  }

  checkSelectedAllParent(node: TreeItemNode) {
    let res: TreeItemNode[] = [];
    this.getChildrenItem(node, res);
    if (res.length > 0) {
      if (
        res.filter((r) => r.selected === null || r.selected === false).length >
        0
      ) {
        node.selected = false;
        if (res.filter((r) => r.selected === true).length > 0) {
          node.indeterminate = true;
        }
      } else {
        node.selected = true;
      }
    }

    if (node.children !== undefined && node.children.length > 0) {
      node.children?.forEach((child) => {
        this.checkSelectedAllParent(child);
      });
    }
  }

  getChildrenItem(node: TreeItemNode, res: TreeItemNode[]) {
    if (node.children === null || node.children?.length === 0) return;
    node.children?.forEach((item) => {
      if (item.children === null || item.children?.length === 0) {
        res.push(item);
      } else {
        this.getChildrenItem(item, res);
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        console.log(control);
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
