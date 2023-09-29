import { Injectable, Injector } from '@angular/core';
import { Credentials } from '../models';
import { HttpResponse, AppConst } from '../../common/const';
import { AppBaseService } from '../../services/service-base';
import { Router } from '@angular/router';
import {
  TextBoxControlBase,
  ControlBase,
  TextBoxPasswordControlBase,
} from '../../base-core-ui/app.core.shared.models';
import {
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Injectable()
export class AuthService extends AppBaseService {
  protected baseLoginSourceUrl = 'admin/login';
  protected baseChangePasswordSourceUrl = 'admin/change_password';
  protected baseForgotPasswordSourceUrl = 'admin/forgot_password';
  protected baseConfirmEmailTokenSourceUrl = 'admin/confirm_forgot_pwd_token';
  protected baseLogoutSourceUrl = 'admin/logout';
  protected baseRefreshTokenSourceUrl = 'admin/refresh';
  readonly loginRouter: string = '/login';

  constructor(
    injector: Injector,
    configService: AppConfigService,
    private translate: TranslateService,
    private router: Router
  ) {
    super(injector, configService);
  }

  // log in action
  public async login(credential: Credentials): Promise<any> {
    let res = await this.baseAsyncPostHttpClientUrl(
      this.baseLoginSourceUrl,
      credential
    );
    let response = Object.assign(new HttpResponse(), res);
    if (response.msg === AppConst.ResponseMessage.OK) {
      response.data['email'] = credential.email;
      localStorage.setItem(
        AppConst.LocalStorage.Auth.TokenName,
        JSON.stringify(response.data)
      );
    }
    return response;
  }

  getAuthorizationToken() {
    let authToken = localStorage.getItem(AppConst.LocalStorage.Auth.TokenName);
    if (authToken) {
      const token = JSON.parse(authToken);
      if (token && token.access_token) {
        return `${token.access_token}`;
      }
    }
    return null;
  }

  getEmailLogin() {
    let authToken = localStorage.getItem(AppConst.LocalStorage.Auth.TokenName);
    if (authToken) {
      const token = JSON.parse(authToken);
      if (token && token.email) {
        return `${token.email}`;
      }
    }
    return null;
  }

  getUserDetails() {
    let authToken = localStorage.getItem(AppConst.LocalStorage.Auth.TokenName);
    if (authToken) {
      const token = JSON.parse(authToken);
      if (token && token.id) {
        return {
          Id: token.id,
          FirstName: token.first_name,
          LastName: token.last_name,
          Level: token.level,
          RoleName: token.roles.role_name,
          CorporationId: token.corporation_id,
        };
      }
    }
    return {};
  }

  public logout() {
    let email = this.getEmailLogin();
    if (email) {
      this.basePostHttpClientUrl(this.baseLogoutSourceUrl, {
        email,
      });
    }
    localStorage.removeItem(AppConst.LocalStorage.Auth.TokenName);
    sessionStorage.clear();
    this.router.navigate([this.loginRouter]);
  }

  // check is authenticated action
  isAuthenticated() {
    return localStorage.getItem(AppConst.LocalStorage.Auth.TokenName)
      ? true
      : false;
    // const authenticated = await this.keycloakService.isLoggedIn();
    // return true;
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  getAllControlForLoginForm(): ControlBase<any>[] {
    let controls = [
      new TextBoxControlBase({
        key: 'emailAddress',
        label: 'auth.login-form.email',
        type: 'email',
        value: '',
        icon: './assets/icons/login-email.png',
        order: 1,
        notifyChanges: true,
        placeholder: 'auth.login-form.enter-your-email',
        validationMessages: {
          required: this.translate.instant('validate-control.validate-email'),
          email: this.translate.instant('auth.error.email-format'),
          isValidEmail: this.translate.instant('auth.no_usser'),
          minlength: this.translate.instant('auth.validate-email-minlength'),
        },
        validators: [
          Validators.required,
          Validators.email,
          Validators.minLength(4),
        ],
      }),
      new TextBoxPasswordControlBase({
        key: 'password',
        label: 'auth.login-form.password',
        value: '',
        order: 2,
        type: 'password',
        placeholder: 'auth.login-form.enter-your-password',
        notifyChanges: true,
        hideTextHeader: false,
        validationMessages: {
          required: this.translate.instant(
            'validate-control.validate-password-required'
          ),
        },
        validators: [Validators.required],
      }),
    ];
    return controls;
  }

  get getLanguage() {
    return localStorage.getItem(AppConst.LocalStorage.Language);
  }

  updateLanguage(value: any) {
    localStorage.removeItem(AppConst.LocalStorage.Language);
    localStorage.setItem(AppConst.LocalStorage.Language, value);
  }
}
