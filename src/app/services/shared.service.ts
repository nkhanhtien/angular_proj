import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  isSideBarOpen: Subject<boolean> = new Subject<boolean>();
  invokeWizardFunction = new EventEmitter();

  constructor() {}

  public onChangeSideBarStatus(isOpen: boolean) {
    this.isSideBarOpen.next(isOpen);
  }

  onWizardAction(action: { key: string; value?: string }) {
    this.invokeWizardFunction.emit(action);
  }
}
