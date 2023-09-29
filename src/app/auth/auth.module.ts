import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { authRoutes } from '../common/routes';
import { AuthService } from './services';
import { AppBaseService } from '../services/service-base';
import { AppSharedModule } from '../base-core-ui/app.core.shared.module';
import { LoginFormComponent } from './containers/login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    RouterModule.forChild(authRoutes),
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  providers: [AuthService, AppBaseService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
