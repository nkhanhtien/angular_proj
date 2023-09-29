import { Injectable } from '@angular/core';
import { RequestEventEmitter, ResponseEventEmitter } from './emitter.service';

@Injectable()
export class PubSubService {
  beforeRequest: RequestEventEmitter;
  afterRequest: ResponseEventEmitter;
  constructor() {
    this.beforeRequest = new RequestEventEmitter();
    this.afterRequest = new ResponseEventEmitter();
  }
}
