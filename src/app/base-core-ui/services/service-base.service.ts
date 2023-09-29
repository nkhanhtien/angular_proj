// Imports
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface IBaseService {
  get(): Observable<object[]>;
  add(body: object): Observable<object[]>;
  getByKey(id: number): Observable<object>;
}

@Injectable()
export class CommonBaseService {}

@Injectable()
export class CoreUIService {
  constructor(injector: Injector, private router: Router) {}

  reloadCurrentPage() {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
