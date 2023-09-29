import { Output, EventEmitter, Injector, Injectable } from '@angular/core';

@Injectable()
export class CommonBaseComponent {
  //#region Events for Form
  @Output() OnComponentActions = new EventEmitter();
  @Output() OnDetailActions = new EventEmitter();

  constructor(injector: Injector) {}
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
