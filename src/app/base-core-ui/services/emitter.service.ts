import { Subject } from 'rxjs';

export class RequestEventEmitter extends Subject<string> {
  constructor() {
    super();
  }
  emit(value: any) {
    super.next(value);
  }
}

export class ResponseEventEmitter extends Subject<string> {
  constructor() {
    super();
  }
  emit(value: any) {
    super.next(value);
  }
}
