// Imports
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  GridRequestInfo,
  SearchParamRequest,
} from './../base-core-ui/app.core.shared.interfaces';
import { AppConfigService } from './app-config.service';
import { ParamRequestSearchType } from '../base-core-ui/app.core.shared.enums';

@Injectable()
export class AppBaseService {
  protected get API_ENDPOINT() {
    return this.configService.config.apiEndPoint;
  }

  protected http: HttpClient;

  constructor(injector: Injector, protected configService: AppConfigService) {
    this.http = injector.get(HttpClient);
  }

  private generateSearchHttpParams(
    httpParams: HttpParams,
    searchParams?: SearchParamRequest[]
  ) {
    if (searchParams) {
      searchParams.forEach((p) => {
        if (p.Value !== '') {
          let searchType = '.';
          if (p.Type === ParamRequestSearchType.Contains)
            searchType += 'contains';
          else if (p.Type === ParamRequestSearchType.NumberContains)
            searchType += 'num_contains';
          else if (p.Type === ParamRequestSearchType.Equals)
            searchType += 'equals';
          else if (p.Type === ParamRequestSearchType.In) searchType += 'in';
          else if (p.Type === ParamRequestSearchType.NumberIn)
            searchType += 'num_in';
          else if (p.Type === ParamRequestSearchType.AfterDate)
            searchType += 'after_date';
          else if (p.Type === ParamRequestSearchType.BeforeDate)
            searchType += 'before_date';
          httpParams = httpParams.set(p.Key + searchType, p.Value);
        }
      });
    }
    return httpParams;
  }

  private generatePagingHttpParams(
    httpParams?: HttpParams,
    gridInfo?: GridRequestInfo
  ) {
    if (gridInfo) {
      if (gridInfo.PageSize !== undefined) {
        httpParams = httpParams?.set('limit', gridInfo.PageSize.toString());
      }

      if (gridInfo.PageIndex && gridInfo.PageIndex >= 0) {
        httpParams = httpParams?.set(
          'page',
          (gridInfo.PageIndex + 1).toString()
        );
      }

      if (
        gridInfo.SortName &&
        gridInfo.SortName !== '' &&
        gridInfo.SortDesc !== ''
      ) {
        let sortType = gridInfo.SortDesc !== '' ? gridInfo.SortDesc : 'asc';
        httpParams = httpParams?.set(
          'sort',
          gridInfo.SortName.toString() + ' ' + sortType
        );
      }
    }
    return httpParams;
  }

  protected baseGetHttpClientUrl(
    url: any,
    gridInfo: GridRequestInfo,
    searchParams: SearchParamRequest[]
  ): Observable<any> {
    let httpParams = new HttpParams();
    this.generatePagingHttpParams(httpParams, gridInfo);
    this.generateSearchHttpParams(httpParams, searchParams);

    return this.http.get(this.API_ENDPOINT + url, { params: httpParams }).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => this.catchResponse(err))
    );
  }

  protected async baseAsyncGetHttpClientUrl(
    url: string,
    gridInfo?: GridRequestInfo,
    searchParams?: SearchParamRequest[],
    headers?: HttpHeaders
  ): Promise<any> {
    let httpParams: any = new HttpParams();
    httpParams = this.generatePagingHttpParams(httpParams, gridInfo);
    httpParams = this.generateSearchHttpParams(httpParams, searchParams);
    try {
      let response = await this.http
        .get(this.API_ENDPOINT + url, { params: httpParams, headers: headers })
        .toPromise();
      return response !== null ? response : null;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  protected async baseAsyncGetHttpClientWithUrl(url: string): Promise<any> {
    return await this.baseAsyncGetHttpClientUrl(url, undefined, undefined);
  }

  protected basePostHttpClientUrl(url: any, requestItem: any): Observable<any> {
    return this.http.post(this.API_ENDPOINT + url, requestItem).pipe(
      map(this.mapResponse) as any,
      catchError((err) => this.catchResponse(err))
    );
  }

  protected async baseAsyncPostHttpClientUrl(
    url: any,
    requestItem: any
  ): Promise<any> {
    try {
      let response = await this.http
        .post(this.API_ENDPOINT + url, requestItem)
        .toPromise();
      return response !== null ? response : null;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  protected async baseAsyncPutHttpClientUrl(
    url: any,
    requestItem: any
  ): Promise<any> {
    try {
      let response = await this.http
        .put(this.API_ENDPOINT + url, requestItem)
        .toPromise();
      return response !== null ? response : null;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  protected async baseAsyncDeleteHttpClientUrl(url: string): Promise<any> {
    try {
      let response = await this.http
        .delete(this.API_ENDPOINT + url)
        .toPromise();
      return response !== null ? response : null;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  protected handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return errMsg;
  }

  protected mapResponse(response: Response): any {
    return response.json();
  }

  protected catchResponse(err: any): Observable<any> {
    if (err instanceof Response) {
      return throwError(err.json());
    }
    return throwError(err);
  }
}
