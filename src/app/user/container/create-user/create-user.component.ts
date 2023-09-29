import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { ButtonItem, GridRequestInfo } from 'src/app/base-core-ui/app.core.shared.interfaces';
import { KeycloakAdminService } from 'src/app/services/keycloak-admin.service';
import { MessageType, ROLES } from 'src/app/common/const';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  loading: boolean = true;
  roleName: string;
  controls: any[];
  buttonList: ButtonItem[];
  action: string = 'create';
  fullName: string = 'Full name';
  groupList: any[] = [];
  roleList: any[] = [];
  tagList: any[] = [];
  userDetail: any;
  userId: string;
  userInfo: UserRepresentation | undefined;

  @ViewChild('CreateUserForm', { static: false }) createUserForm: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private keycloakAdminService: KeycloakAdminService,
  ) { }

  async ngOnInit() {
    this.loading = false;
    this.roleName = this.activatedRoute.snapshot.data['roleName'];
    this.userId = this.activatedRoute.snapshot.params['id'];
    if (this.userId) {
      await this.getUserInfo();
    } else {
      this.buttonList = await this.userService.getButtonListForForm(this.action);
    }
    // Get all tags
    const tagRes = await this.userService.getTags({ PageSize: 1000 });
    if (tagRes && tagRes.success) {
      this.tagList = tagRes.content
    }

    const readonly = this.action === 'view';
    this.controls = this.userService.getUserControlForCreateUpdateForm(this.tagList, this.userInfo, this.userDetail, readonly);
  }

  async getUserInfo() {
    const [userInfoRes, userDetailRes] = await Promise.all([
      this.keycloakAdminService.getUserById(this.userId),
      this.userService.getUserDetailByUserId(this.userId)
    ])
    this.userInfo = userInfoRes;
    if (this.userInfo) {
      this.action = 'view';
      this.fullName = this.userInfo.firstName + ' ' + this.userInfo.lastName;
      const userRoles = await this.keycloakAdminService.getUserRoles(this.userInfo.id as string);
      this.buttonList = await this.userService.getButtonListForForm(this.action, { ...this.userInfo, userRoles: userRoles });
    }
    if (userDetailRes && userDetailRes.success) {
      this.userDetail = userDetailRes.content;
    }
  }

  getFullName() {
    const { firstName, lastName } = this.createUserForm.form.value;
    if (firstName?.trim() || lastName?.trim()) {
      this.fullName = firstName.trim() + ' ' + lastName.trim();
    } else if (this.userInfo) {
      this.fullName = this.userInfo.firstName + ' ' + this.userInfo.lastName;
    } else {
      this.fullName = 'Full name';
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

  async actionButtonList(event) {
    if (event.buttonKey === 'edit') {
      // Handle case click edit button
      this.action = 'edit';
      this.controls = this.userService.getUserControlForCreateUpdateForm(this.tagList, this.userInfo, this.userDetail);
      this.buttonList = await this.userService.getButtonListForForm(this.action);
      return;
    }
    if (event.buttonKey === 'discard') {
      // Handle case click discard button
      this.action = 'view';
      this.controls = this.userService.getUserControlForCreateUpdateForm(this.tagList, this.userInfo, this.userDetail, true);
      this.buttonList = await this.userService.getButtonListForForm(this.action);
      this.fullName = this.userInfo?.firstName + ' ' + this.userInfo?.lastName;
      return;
    }
    if (event.buttonKey === 'change_password') {
      // handle case change_password
      this.action = 'change_password';
      this.controls = this.userService.getControlsForChangePassword();
      this.buttonList = await this.userService.getButtonListForForm(this.action);
      return;
    }
    const isFormValid = this.validateAllFormFields(this.createUserForm.form);
    if (isFormValid) {
      const { firstName, lastName, username, email, tags, old_password, password, confirm_password } = this.createUserForm.form.value;
      if (event.buttonKey === 'submit') {
        // Handle case create user 
        const userData: UserRepresentation = {
          firstName,
          lastName,
          username,
          email,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: '12345678x@X',
              temporary: true,
            },
          ],
        };
        this.loading = true;
        const user = await this.keycloakAdminService.createUser(userData);
        if (user) {
          const userDetailData = {
            userId: user.id,
            tags: tags,
          }
          await Promise.all([
            this.userService.createUserDetail(userDetailData),
            this.keycloakAdminService.assignUserToRole(user.id, [this.roleName]),
            this.roleName === ROLES.ADMIN ? this.keycloakAdminService.updateUserGroups(user.id, [this.roleName]) : null
          ])
          const formatRoleName = this.roleName === ROLES.ADMIN ? 'admin' : 'user';
          this.router.navigate([`/users/${formatRoleName}`]);
        } else {
          this.userService.showAlert('Username already exists', MessageType.Error);
        }
        this.loading = false;
      } else if (event.buttonKey === 'save') {
        if (this.action === 'change_password') {
          if (password !== confirm_password) {
            this.userService.showAlert("These passwords don't match", MessageType.Error)
          } else {
            const response = await this.keycloakAdminService.changePassword(this.userInfo, old_password, password);
            if (response) {
              this.action = 'view';
              this.controls = this.userService.getUserControlForCreateUpdateForm(this.tagList, this.userInfo, this.userDetail, true);
              this.buttonList = await this.userService.getButtonListForForm(this.action);
              this.userService.showAlert(`Password changed successfully`, MessageType.Info);
            } else {
              this.userService.showAlert("Old password doesn't match", MessageType.Error)
            }
          }
        } else {
          const userData: UserRepresentation = {
            firstName,
            lastName,
            username,
            email,
          };
          const userDetailData = {
            ...this.userDetail,
            tags: tags,
          }
          this.loading = true;
          const [updatedData] = await Promise.all([
            this.keycloakAdminService.updateUser(this.userId, userData),
            this.userService.updateUserDetail(this.userDetail._id, userDetailData)
          ]);
          if (updatedData) {
            await this.getUserInfo();
            this.controls = this.userService.getUserControlForCreateUpdateForm(this.tagList, this.userInfo, this.userDetail, true);
            this.buttonList = await this.userService.getButtonListForForm(this.action);
            this.userService.showAlert(`User updated successfully`, MessageType.Info);
          } else {
            this.userService.showAlert('Username already exists', MessageType.Error);
          }
          this.loading = false;
        }
      }
    }
  }
}
