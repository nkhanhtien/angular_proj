import { Injectable, Injector } from '@angular/core';
import { MessageType } from '../common/const';
import { AppConfigService } from './app-config.service';
import { MasterService } from './master-service';
import { AppBaseService } from './service-base';

@Injectable()
export class MessageService extends AppBaseService {
  constructor(
    private masterService: MasterService,
    injector: Injector,
    configService: AppConfigService
  ) {
    super(injector, configService);
  }

  get ColorMessage() {
    if (
      this.AllMessages.filter((item: any) => item.type === MessageType.Error)
        .length > 0
    )
      return this.getColorMessage(MessageType.Error);
    else if (
      this.AllMessages.filter((item: any) => item.type === MessageType.Warning)
        .length > 0
    )
      return this.getColorMessage(MessageType.Warning);
    else if (
      this.AllMessages.filter((item: any) => item.type === MessageType.Info)
        .length > 0
    )
      return this.getColorMessage(MessageType.Info);
    else return this.getColorMessage(MessageType.None);
  }

  getColorMessage(type: MessageType) {
    switch (type) {
      case MessageType.Error:
        return 'red';
      case MessageType.Warning:
        return 'darkorange';
      case MessageType.Info:
        return 'cornflowerblue';
      default:
        return 'yellowgreen';
    }
  }

  getMessageTypeText(type: MessageType) {
    switch (type) {
      case MessageType.Error:
        return 'error';
      case MessageType.Warning:
        return 'warning';
      case MessageType.Info:
        return 'information';
      default:
        return 'general';
    }
  }

  isErrorAlert(type: MessageType) {
    if (type === MessageType.Error) return true;
    else return false;
  }

  isWarningAlert(type: MessageType) {
    if (type === MessageType.Warning) return true;
    else return false;
  }

  isInfoAlert(type: MessageType) {
    if (type === MessageType.Info) return true;
    else return false;
  }

  isOtherAlert(type: MessageType) {
    if (
      type !== MessageType.Error &&
      type !== MessageType.Warning &&
      type !== MessageType.Info
    )
      return true;
    else return false;
  }

  get AllMessages() {
    return this.masterService.messageManagements.messages;
  }
}
