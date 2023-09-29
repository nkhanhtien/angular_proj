import { EnServiceType } from '../enums/service-types.enum';
import { ServiceInfo } from './services-model';

export class ServiceBase {
  serviceType: EnServiceType;
  value: ServiceInfo;
}
