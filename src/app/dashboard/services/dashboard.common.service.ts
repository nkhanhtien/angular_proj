import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Injectable()
export class DashboardCommonService {
  private get baseUrl() {
    return `${this.configService.config.apiEndPoint}`;
  }

  constructor(
    private httpClient: HttpClient,
    private configService: AppConfigService
  ) {}
}
