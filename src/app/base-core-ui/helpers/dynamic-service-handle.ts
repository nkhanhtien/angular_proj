import { Injector } from '@angular/core';
import { ServiceInfo } from '../models/services-model';

export class DynamicServiceCall {
  private injector: Injector;
  constructor(injector: Injector) {
    this.injector = injector;
  }
  Invoke(sInfo: ServiceInfo) {
    let service = this.injector.get(sInfo.serviceName);
    if (service[sInfo.serviceMethod]) {
      return service[sInfo.serviceMethod](sInfo.serviceParams).map(
        (res: any) => {
          return res;
        }
      );
    } else {
      return null;
    }
  }
}
