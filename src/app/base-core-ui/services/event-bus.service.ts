import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class EventBus {
  onShowMenu: Subject<any> = new Subject();
  onLoadRoutes: Subject<any> = new Subject();
  onShowContent: Subject<any> = new Subject();
}
