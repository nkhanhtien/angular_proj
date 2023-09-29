// Imports
import { Injectable, Injector } from '@angular/core';
import { AppBaseService } from './service-base';
import {
  HttpResponse,
  AppConst,
  MessageResponse,
  MessageType,
} from '../common/const';
import { AuthService } from '../auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyChars } from '../base-core-ui/app.core.shared.const';
import {
  GridRequestInfo,
  PageDataInfo,
} from '../base-core-ui/app.core.shared.interfaces';
import { Title } from '@angular/platform-browser';
import { AppConfigService } from './app-config.service';
import { ConfirmComponent } from '../base-core-ui/controls/confirm/confirm.component';
import { SingleFormComponent } from '../base-core-ui/forms/single-form/single-form.component';

@Injectable()
export class MasterService extends AppBaseService {
  baseCountrySourceUrl = 'countries/';
  baseRegionsByCountrySourceUrl = 'countries/regions/';
  baseGetListCurrenciesUrl = 'currencies/';

  public messageManagements: any = {
    isReset: true,
    messages: new Array<any>(),
  };
  public countryDataDropdown: any = [];
  public regionsDataDropdown: any = {};
  public currencyDataDropdown: any = [];
  breadcrumb?: any[];
  pageStateURL!: string;

  constructor(
    injector: Injector,
    configService: AppConfigService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
    private decimalPipe: DecimalPipe,
    private dialog: MatDialog
  ) {
    super(injector, configService);
  }

  get historyUrls() {
    const historyUrlsString = sessionStorage.getItem('historyUrls');
    if (historyUrlsString) {
      const parseValue = JSON.parse(historyUrlsString);
      if (Array.isArray(parseValue)) {
        return parseValue;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  // Country & Region (Province/District)
  async getAllCountries() {
    let res = await this.baseAsyncGetHttpClientUrl(
      this.baseCountrySourceUrl,
      this.gridInfoAllItems()
    );
    let response = Object.assign(new HttpResponse(), res);
    if (response.msg === AppConst.ResponseMessage.OK) {
      return response.data.sort((a: any, b: any) =>
        a.country_name.localeCompare(b.country_name)
      );
    }
    return [];
  }

  async getAllRegionByCountryCode(countryCode: any) {
    let res = await this.baseAsyncGetHttpClientUrl(
      this.baseRegionsByCountrySourceUrl + countryCode,
      this.gridInfoAllItems()
    );
    let response = Object.assign(new HttpResponse(), res);
    if (response.msg === AppConst.ResponseMessage.OK) {
      return response.data.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
    }
    return null;
  }

  async getCountryDataForDropdown() {
    this.countryDataDropdown = [];
    this.countryDataDropdown.push({ key: '', value: '' });
    let countryData = await this.getAllCountries();
    countryData.forEach((country: any) => {
      this.countryDataDropdown.push({
        key: country.country_short_code,
        value: country.country_name,
      });
    });
  }

  getCountryName(countryCode: any) {
    let country = this.countryDataDropdown.filter(
      (item: any) => item.key === countryCode
    );
    if (country && country.length > 0) return country[0].value;
    else return '';
  }

  async getRegionByCountry(countryCode: any) {
    let regionData: any = [];
    regionData.push({ key: '', value: '' });

    if (countryCode === '') {
      return regionData;
    }

    if (
      !this.regionsDataDropdown[countryCode] ||
      this.regionsDataDropdown[countryCode] === undefined
    ) {
      let data = await this.getAllRegionByCountryCode(countryCode);
      if (data) {
        data.forEach((region: any) => {
          regionData.push({ key: region.short_code, value: region.name });
        });
      }
      this.regionsDataDropdown[countryCode] = regionData;
    } else {
      regionData = this.regionsDataDropdown[countryCode];
    }
    return regionData;
  }

  getRegionName(countryCode: any, regionCode: any) {
    let regionData = this.regionsDataDropdown[countryCode];
    if (!regionData || regionData === undefined) regionData = [];

    let region = regionData.filter((item: any) => item.key === regionCode);
    if (region && region.length > 0) return region[0].value;
    else return '';
  }

  getUserDetails() {
    return this.authService.getUserDetails();
  }

  getGenderName(gender: string) {
    let genderName = '';
    this.getGenders()
      .filter((item) => gender === item.key)
      .forEach((item) => {
        genderName += (genderName === '' ? '' : '; ') + item.label;
      });
    return genderName;
  }

  resetMessages() {
    this.messageManagements.isReset = true;
    this.messageManagements.messages = [];
  }

  addMessages(messages: MessageResponse[]) {
    messages.forEach((msg) => {
      this.messageManagements.messages.push(msg);
    });
  }

  addErrorMessage(message: string) {
    this.messageManagements.messages.push({
      type: MessageType.Error,
      text: message,
    });
  }

  getFullDateFormat(dateStr: string | number) {
    const date =
      typeof dateStr === 'string'
        ? new Date(dateStr)
        : new Date(dateStr * 1000);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    return day + '/' + month + '/' + date.getFullYear();
  }

  getFullDateTimeFormat(dateStr: string | number) {
    const date =
      typeof dateStr === 'string'
        ? new Date(dateStr)
        : new Date(dateStr * 1000);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const second =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minute =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return (
      day +
      '/' +
      month +
      '/' +
      date.getFullYear() +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      second
    );
  }

  addNewHistoryUrl(url: string) {
    let currentHistoryUrls = this.historyUrls;
    if (currentHistoryUrls.length <= 0 || currentHistoryUrls[0] !== url) {
      currentHistoryUrls.unshift(url);
    }
    sessionStorage.setItem('historyUrls', JSON.stringify(currentHistoryUrls));
  }

  goBack() {
    let currentHistoryUrls = this.historyUrls;
    if (currentHistoryUrls.length > 0) {
      currentHistoryUrls.shift();
    }
    sessionStorage.setItem('historyUrls', JSON.stringify(currentHistoryUrls));
    if (currentHistoryUrls.length > 0) {
      this.router.navigate([currentHistoryUrls[0]]);
    } else {
      this.router.navigate(['/']);
    }
  }

  reloadCurrentPage() {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  // Currency
  async getAllCurrency(): Promise<any> {
    if (this.currencyDataDropdown.length <= 0) {
      const res: HttpResponse = await this.baseAsyncGetHttpClientUrl(
        this.baseGetListCurrenciesUrl,
        this.gridInfoAllItems()
      );
      if (res.msg === AppConst.ResponseMessage.OK) {
        const currencies = res.data.map((item: any) => ({
          key: item.currency_code,
          value: item.name,
        }));
        this.currencyDataDropdown = currencies;
      }
    }
  }

  // Gender
  getGenders() {
    return [
      { key: 'male', label: this.translate.instant('profile.male') },
      { key: 'female', label: this.translate.instant('profile.female') },
    ];
  }

  // Get all data when calling API
  gridInfoAllItems() {
    return {
      PageIndex: 0,
      PageSize: 0,
      SortName: '',
      SortDesc: '',
    };
  }

  numberWithCommas(val: any, decimal = 0) {
    const numberFormat = parseFloat(String(val).replace(CurrencyChars, ''));
    return this.decimalPipe.transform(numberFormat, '1.0-' + decimal, '');
  }

  stringToNumber(numberString: string) {
    if (!numberString) {
      return 0;
    }
    numberString = String(numberString).split(',').join('');
    return Number(numberString.replace(/[^0-9.]/g, ''));
  }

  public showConfirmDialog(message: any, callback: Function) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '550px',
      disableClose: false,
      data: { message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      callback(result);
    });
  }

  public onChangeBreadcrumb(listBreadcrumb: any[]) {
    listBreadcrumb.sort(function (a, b) {
      return a.order - b.order;
    });
    this.breadcrumb = listBreadcrumb;
  }

  public clearBreadcrumb() {
    this.breadcrumb = undefined;
  }

  languageDataDropdown() {
    return [
      { key: 'en-US', value: 'English' },
      { key: 'ja-JP', value: '日本人' },
    ];
  }

  public multiFormsValid(forms: SingleFormComponent[]): boolean {
    const result = forms.map((form) => this.validateForm(form));
    return result.filter((item) => item === false).length === 0;
  }

  public validateForm(singleForm: SingleFormComponent): boolean {
    if (singleForm && singleForm.form && singleForm.form.invalid) {
      const { controls } = singleForm.form;
      for (const key in controls) {
        let control = controls[key];
        if (control && control.invalid) {
          control.markAsTouched();
          if (!control.value || control.value === '') {
            control.setValue('');
          }
        }
      }
      return false;
    }
    return true;
  }

  public savePageState(object: any, pageName = '') {
    let listPageStates = JSON.parse(
      sessionStorage.getItem('listPageStates') || ''
    );
    let existedPage = false;

    if (listPageStates && listPageStates.length > 0) {
      listPageStates.forEach((pageInfo: any) => {
        if (
          !existedPage &&
          pageInfo['url'] === this.pageStateURL &&
          pageInfo['pageName'] === pageName
        ) {
          pageInfo['data'] = object;
          existedPage = true;
        }
      });
    }
    if (!existedPage) {
      if (!listPageStates) {
        listPageStates = [];
      }

      if (this.pageStateURL) {
        listPageStates.push({
          url: this.pageStateURL,
          pageName: pageName,
          data: object,
        });
      }
    }

    sessionStorage.setItem('listPageStates', JSON.stringify(listPageStates));
  }

  public getPageState(pageName = '') {
    this.pageStateURL = window.location.href;
    let data = undefined;

    let listPageStates = JSON.parse(
      sessionStorage.getItem('listPageStates') || ''
    );
    if (listPageStates && listPageStates.length > 0) {
      listPageStates.forEach((pageInfo: any) => {
        if (
          pageInfo['url'] === this.pageStateURL &&
          pageInfo['pageName'] === pageName
        ) {
          data = pageInfo['data'];
        }
      });
    }

    return data;
  }

  applyCorpIdToUrl(url: string, corporationID: string) {
    return url.replace('$corp_id', corporationID);
  }

  getCorporationTabUrl(corporationID: string) {
    return 'corporation/' + corporationID;
  }

  get classActiveTab() {
    return '.mat-tab-label-active .mat-tab-label-content .tab-label';
  }

  capitalizeTitle(title: string) {
    let words = title.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }
    return words.join(' ');
  }

  isChangeSearchInfo(oldSearchObj: any, newSearchObj: any) {
    let isChanged = false;
    for (let newSearchProperty in newSearchObj) {
      if (
        !isChanged &&
        ((!oldSearchObj[newSearchProperty] &&
          oldSearchObj[newSearchProperty] !== '') ||
          oldSearchObj[newSearchProperty] !== newSearchObj[newSearchProperty])
      ) {
        isChanged = true;
      }
    }

    for (let oldSearchProperty in oldSearchObj) {
      if (
        !isChanged &&
        !newSearchObj[oldSearchProperty] &&
        newSearchObj[oldSearchProperty] !== ''
      ) {
        isChanged = true;
      }
    }

    return isChanged;
  }

  isChangeGridInfo(
    pageInfo: PageDataInfo,
    gridInfo: GridRequestInfo,
    event: any
  ) {
    let isChanged = false;
    if (pageInfo.resetPage) {
      gridInfo.PageIndex = 0;
      isChanged = true;
    } else if (
      event &&
      (gridInfo.PageIndex !== event.pageIndex ||
        gridInfo.PageSize !== event.pageSize ||
        gridInfo.SortName !== event.sortName ||
        gridInfo.SortDesc !== event.sortDesc)
    ) {
      gridInfo = {
        PageIndex: event.pageIndex,
        PageSize: event.pageSize,
        SortName: event.sortName,
        SortDesc: event.sortDesc,
      };
      isChanged = true;
    }

    return { isChanged, newGridInfo: gridInfo };
  }

  reloadTitlePage(title: any) {
    setTimeout(() => {
      this.titleService.setTitle(
        this.capitalizeTitle(this.translate.instant(title)) + ' - SmartUI'
      );
    }, 1000);
  }
}
