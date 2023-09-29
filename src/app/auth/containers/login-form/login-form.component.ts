import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';
import { AppConst } from '../../../common/const';
import { MasterService } from '../../../services/master-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  generalError: string = '';
  readonly dashboardRouter: string = 'dashboard';
  readonly fpSendEmailRouter: string = 'fpsendemail';
  controls: any[];
  validatorFn: any;
  @ViewChild('LoginForm', { static: true }) loginForm: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private masterService: MasterService
  ) {}

  async ngOnInit() {
    const authenticated = await this.authService.isAuthenticated();
    if (authenticated) {
      this.authService.logout();
      this.masterService.reloadCurrentPage();
    }

    this.validatorFn = this.authService.patternValidator;
    this.controls = this.authService.getAllControlForLoginForm();
  }

  async submit() {
    this.generalError = '';
    if (this.masterService.validateForm(this.loginForm)) {
      const { emailAddress, password } = this.loginForm.form.value;
      let res = await this.authService.login({
        email: emailAddress,
        password: password,
      });

      if (res.msg === AppConst.ResponseMessage.OK) {
        this.router.navigate([this.dashboardRouter]);
      } else {
        if (
          res &&
          res.data &&
          (res.data === 'incorrect password' || res.data === 'email incorrect')
        ) {
          this.generalError = 'auth.error.incorrect-email-or-password';
        } else {
          this.generalError = 'auth.error.login-failed';
        }
      }
    }
  }

  forgotPass() {
    this.router.navigate([this.fpSendEmailRouter]);
  }

  async onFormControlStatusChanges(control: any) {
    this.generalError = '';
  }

  get shouldDisabledLoginButton() {
    if (!this.loginForm || !this.loginForm.form || !this.loginForm.form.valid) {
      return true;
    } else return false;
  }
}
