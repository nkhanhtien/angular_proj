import { AbstractControl, FormGroup } from '@angular/forms';
import { DemoService } from '../services/demo.service';

export class ValidateEmailNotTaken {
  static createValidator(service: DemoService) {
    return (control: AbstractControl) => {
      return service.isValidEmail(control.value).map((res: any) => {
        return res ? null : { isValidEmail: res };
      });
    };
  }
}
