// import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Component, EventEmitter, Inject, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonBaseComponent } from 'src/app/base-core-ui/app.core.shared.models';
import { UserGroupService } from '../../services/user-group.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent extends CommonBaseComponent implements OnInit {
  loading: boolean = false;
  title: string = "Create a Tag";
  controls: any[];
  action: string;
  isErrorMessage: boolean = false;
  errorMessage: string = '';
  @Output() saveEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();

  @ViewChild('TagDialog', { static: false }) tagDialog: any;

  constructor(injector: Injector,
    private userGroupService: UserGroupService,
    public dialogRef: MatDialogRef<TagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private keycloakService: KeycloakService) {
    super(injector);

  }

  ngOnInit() {
    this.controls = this.userGroupService.getAllControlForTagForm(this.data.action, this.data.row);
    this.action = this.data.action;
    this.title = this.userGroupService.getTagTitle(this.data.action);
  }

  onClickCancelBtn() {
    this.cancelEvent.emit();
    this.dialogRef.close();
  }

  onClickEditBtn() {
    this.action = 'Edit';
    this.controls = this.userGroupService.getAllControlForTagForm(this.action, this.data.row);
    this.title = this.userGroupService.getTagTitle('Edit');
  }

  async onClickUpdateBtn() {
    const data = {
      action: 'Edit',
      payload: {
        oldData: this.data.row,
        newData: this.tagDialog.form.value
      }
    };
    const isFormValid = this.validateAllFormFields(this.tagDialog.form);
    if (isFormValid) {
      try {
        if (this.data.row.name === 'All Tags' && (this.tagDialog.form.value.name !== 'All Tags' || this.tagDialog.form.value.status !== 'ACTIVE')) {
          this.isErrorMessage = true;
          this.errorMessage = `It is not possible to update the tag name and status of the "All Tags"`;
          setTimeout(() => {
            this.isErrorMessage = false;
          }, 1000);
        } else {
          const res = await this.userGroupService.updateTag(this.tagDialog.form.value.tagId, {
            name: this.tagDialog.form.value.name,
            status: this.tagDialog.form.value.status,
            createdBy: this.data.row.createdBy,
            description: this.tagDialog.form.value.description
          });
          this.editEvent.emit({ ...data, ...res });
          await this.closeDialogWithResult({ ...data, ...res });
        }
      } catch (error) {
        this.isErrorMessage = true;
        if (error.message === 'TAG_NAME_ALREADY_EXISTS') {
          this.errorMessage = 'Update Failed! Tag name already exists';
        } else {
          this.errorMessage = 'Update Failed! Internal server error';
        }
        setTimeout(() => {
          this.isErrorMessage = false;
        }, 1000);
      }
    }
  }

  async onClickSaveBtn() {
    const data = {
      action: 'Save',
      payload: this.tagDialog.form.value
    };
    const isFormValid = this.validateAllFormFields(this.tagDialog.form);
    if (isFormValid) {
      try {
        const userInfo = await this.keycloakService.loadUserProfile();
        const res = await this.userGroupService.createNewTag({
          name: this.tagDialog.form.value.name,
          status: this.tagDialog.form.value.status,
          createdBy: String(userInfo.id),
          description: this.tagDialog.form.value.description
        });
        this.saveEvent.emit({ ...data, ...res });
        await this.closeDialogWithResult({ ...data, ...res });
      } catch (error) {
        this.isErrorMessage = true;
        if (error.message === 'TAG_NAME_ALREADY_EXISTS') {
          this.errorMessage = 'Save Failed! The tag name already exists';
        } else {
          this.errorMessage = 'Save Failed! Internal server error';
        }
        setTimeout(() => {
          this.isErrorMessage = false;
        }, 1000);
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

  closeDialogWithResult(result: any) {
    return new Promise<void>((resolve) => {
      this.dialogRef.close(result);
      resolve();
    });
  }
}

