import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormControlBusEvents {
  constructor() {}
  OnFormControlOnChanges: Subject<any> = new Subject();
  OnFormControlOnInit: Subject<any> = new Subject();
  OnFormControlAfterViewInit: Subject<any> = new Subject();
  OnFormControlAfterContentInit: Subject<any> = new Subject();
  OnFormControlAfterContentChecked: Subject<any> = new Subject();
  OnFormControlOnDestroy: Subject<any> = new Subject();
  OnFormControlStatusChanges: Subject<any> = new Subject();
}
