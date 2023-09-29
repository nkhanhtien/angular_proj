import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable()
export class AppConfigService {
  public baseUrl = `${window.location.origin}`;
  public protocol = window.location.protocol;

  constructor(private http: HttpClient) {}

  public get config() {
    return JSON.parse(localStorage.getItem('pipeConfig') || '');
  }

  public getInitialData() {
    this.getJSON()
      .pipe(
        tap((res: any) => {
          localStorage.setItem(
            'pipeConfig',
            JSON.stringify({
              ...res,
              assetsUrl: `${this.baseUrl}/assets`,
            })
          );
        }),
        catchError((error: Error) => of(console.log(error)))
      )
      .subscribe();
  }

  public getJSON(): Observable<any> {
    return this.http.get(`${this.baseUrl}/assets/config/AppConfig.json`);
  }
}
