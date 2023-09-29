import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppSharedModule } from './base-core-ui/app.core.shared.module';
import { MenuModule } from './base-core-ui/controls/menu/menu.module';
import { mainRoutes } from './common/routes';
import { DashboardModule } from './dashboard/dashboard.module';
import { DemoModule } from './demo/demo.module';
import { ErrorModule } from './error/error.module';
import { httpInterceptorProviders } from './http-interceptors';
import { AppConfigService } from './services/app-config.service';
import { MasterService } from './services/master-service';
import { MenuService } from './services/menu-service';
import { MessageService } from './services/message-service';
import { PermissionService } from './services/permission-service';
import { ActivityModule } from './activity/activity.module';

import { environment } from 'src/environments/environment';
import { DatasetModule } from './dataset/dataset.module';
import { UserGroupModule } from './user-group/user-group.module';
import { UserModule } from './user/user.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    RouterModule.forRoot([]),
    RouterModule.forChild(mainRoutes),
    TranslateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    DashboardModule,
    MenuModule,
    UserModule,
    ActivityModule,
    DatasetModule,
    UserGroupModule,
    DemoModule,
    AuthModule,

    //This module(ErrorModule) is always at the bottom of the import module list
    ErrorModule,
  ],
  providers: [
    AppConfigService,
    MasterService,
    MenuService,
    MessageService,
    PermissionService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfigService) => () => config.getInitialData(),
      deps: [AppConfigService],
      multi: true,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
