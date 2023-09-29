import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/index';
import { MasterService } from './services/master-service';
import {
  ActivatedRoute,
  ActivationStart,
  NavigationStart,
  Router,
} from '@angular/router';
import { SharedService } from './services/shared.service';
import { MenuService } from './services/menu-service';
import { MessageService } from './services/message-service';
import { AppConfigService } from './services/app-config.service';
import { AppConst } from './common/const';
import { Menu } from './base-core-ui/app.core.shared.models';
// import { KeycloakService } from 'keycloak-angular';
// import { KeycloakProfile } from 'keycloak-js';
// import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  languages: string[] = Object.values(AppConst.Languages);
  currentLanguage = AppConst.Languages.English;
  showMessage: boolean = false;
  hasMessage: boolean = false;
  roleDisplayName: any;
  menu: Menu;
  isShowMenu = true;
  isLogin: Boolean = false;
  headerTopMenuWidth = '100vw';
  marginLeftCreatePayment = '0px';
  userAvatarLink: string;
  isFirstLoad = true;
  // userProfile: KeycloakProfile;
  // keycloakAdminClient = new  KeycloakAdminClient({
  //   baseUrl: environment.keycloakConfig.url,
  //   realmName: environment.keycloakConfig.realm,
  // });

  constructor(
    public translate: TranslateService,
    private router: Router,
    private sharedService: SharedService,
    private masterService: MasterService,
    private menuService: MenuService,
    public messageService: MessageService,
    private authService: AuthService,
    private configService: AppConfigService,
    private activatedRoute: ActivatedRoute
  ) // private keycloakService: KeycloakService
  {
    // Define languages in the application
    translate.addLangs(this.languages);

    // Set current language by browser language or local storage
    const language = localStorage.getItem(AppConst.LocalStorage.Language);
    if (language && this.languages.indexOf(language) >= 0) {
      this.currentLanguage = language;
    }

    translate.setDefaultLang(this.currentLanguage);
    translate.use(this.currentLanguage);
    this.authService.updateLanguage(this.currentLanguage);
  }

  async ngOnInit() {
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationStart) {
        this.masterService.resetMessages();
        await this.checkAuth();
        this.masterService.addNewHistoryUrl(event.url);
      }
      if (event instanceof ActivationStart) {
        this.masterService.reloadTitlePage(event.snapshot.data['title']);
      }
    });

    // const isLogin = await this.keycloakService.isLoggedIn();
    // if (isLogin) {
    //   this.userProfile = await this.keycloakService.loadUserProfile();
    //   this.keycloakAdminClient.setAccessToken(await this.keycloakService.getToken());
    // }
  }

  setMenu() {
    this.menu = this.menuService.setMenu(this.isShowMenu);
  }

  async checkAuth() {
    this.isLogin = await this.authService.isAuthenticated();

    if (this.isLogin) {
      if (this.authService.getLanguage) {
        this.changeLanguage(this.authService.getLanguage);
      }

      // this.roleDisplayName = this.authService.getUserDetails().RoleName;
      this.roleDisplayName = 'SmartUI Super Admin';
      this.setMenu();
    }
  }

  getUserDisplay() {
    // let user = this.authService.getUserDetails();
    //6 add ? w mod e
    return 'USER TESTING'; //this.userProfile?.firstName + ' ' + this.userProfile?.lastName;
  }

  changeLanguage(value: any) {
    if (this.currentLanguage !== value) {
      this.authService.updateLanguage(value);
      window.location.reload();
    }
  }

  getLanguageDisplay(lang: any, showCurrent: any) {
    let languageDisplay = '';
    switch (lang) {
      case AppConst.Languages.English:
        languageDisplay = this.translate.instant(
          'language.' + AppConst.Languages.English
        );
        break;
      default:
        languageDisplay = this.translate.instant(
          'language.' + AppConst.Languages.Japanese
        );
        break;
    }
    if (showCurrent === undefined || showCurrent === true) {
      languageDisplay += this.currentLanguage === lang ? ' (\u2713)' : '';
    }
    return languageDisplay;
  }

  onShowedMenu() {
    this.isShowMenu = true;
    this.sharedService.onChangeSideBarStatus(true);
    this.headerTopMenuWidth = 'calc(100% - 300px)';
    this.marginLeftCreatePayment = '15px';
  }

  onHidedMenu() {
    this.isShowMenu = false;
    this.sharedService.onChangeSideBarStatus(false);
    this.headerTopMenuWidth = '100vw';
    this.marginLeftCreatePayment = '55px';
  }

  logout() {
    this.authService.logout();
    //this.keycloakService.logout();
    this.isLogin = false;
  }

  viewProfile() {
    sessionStorage.removeItem(AppConst.SessionStorage.activeMenu);
    this.router.navigate(['/user']);
  }

  showUserSetting() {
    sessionStorage.removeItem(AppConst.SessionStorage.activeMenu);
  }

  showOrHideMessage() {
    this.showMessage = !this.showMessage;
  }

  hasMessages() {
    if (
      this.masterService.messageManagements.isReset &&
      this.messageService.AllMessages &&
      this.messageService.AllMessages.length > 0
    ) {
      this.masterService.messageManagements.isReset = false;
      this.showMessage = true;

      let hideMessageInterval = setInterval(() => {
        this.showMessage = false;
        clearInterval(hideMessageInterval);
      }, 2000);
    }

    this.hasMessage =
      this.messageService.AllMessages &&
      this.messageService.AllMessages.length > 0;
    return this.hasMessage;
  }

  breadcrumbNavigate(url: any) {
    this.router.navigate([url]);
  }

  get breadcrumb() {
    return this.masterService.breadcrumb;
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
