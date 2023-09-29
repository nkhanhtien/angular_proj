import {
  Component,
  OnInit,
  Injector,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-data-form-3',
  templateUrl: './data-form_3.component.html',
  styleUrls: ['./data-form_3.component.scss'],
})
export class DataForm3Component
  implements OnInit, AfterViewInit, AfterViewChecked
{
  index: number;
  controls: any[] = [];
  viewControls1: any[] = [];
  viewControls2: any[] = [];
  viewControls3: any[] = [];
  isShowClientDetails: boolean = false;
  isNewClient: boolean = false;
  isShowViewClient: boolean = false;
  isLoading: boolean = true;

  @ViewChild('ChildForm1', { static: false }) formChild1: any;
  @ViewChild('ChildForm2', { static: false }) formChild2: any;

  @Output() OnComponentActions = new EventEmitter<any>();
  dataForm = new FormGroup({});

  constructor(
    private injector: Injector,
    private demoService: DemoService,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {
    this.sharedService.invokeWizardFunction.subscribe(
      (action: { key: string; value?: any }) => {
        if (action.key === 'reset') {
          this.ResetForm();
        }
      }
    );
  }

  async ngOnInit() {
    this.isShowClientDetails = false;
    this.isNewClient = false;
    this.isShowViewClient = false;
    this.isLoading = true;

    this.controls = await this.demoService.getControlForDataForm3();
    this.controls.forEach((control) => {
      if (control.key === 'clients') {
        this.viewControls1.push(control);
      } else {
        this.viewControls2.push(control);
        this.viewControls3.push(control);
      }
    });

    this.index = this.injector.get('index', 0);
    if (this.index === undefined || this.index === 0) {
      this.index = 1;
    }
  }

  ngAfterViewChecked() {
    let isAddDataFormControl = false;
    if (this.isShowClientDetails) {
      if (this.isNewClient) {
        for (let control in this.formChild2.form.controls) {
          if (this.dataForm.controls[control] === undefined)
            isAddDataFormControl = true;
          this.dataForm.controls[control] =
            this.formChild2.form.controls[control];
        }
        if (isAddDataFormControl) {
          this.OnComponentActions.emit(this.formChild2.form);
          this.formChild2.form.valueChanges.subscribe(() =>
            this.OnComponentActions.emit(this.formChild2.form)
          );
        }
      } else {
        for (let control in this.formChild1.form.controls) {
          if (this.dataForm.controls[control] === undefined)
            isAddDataFormControl = true;
          this.dataForm.controls[control] =
            this.formChild1.form.controls[control];
        }

        if (isAddDataFormControl) {
          this.OnComponentActions.emit(this.formChild1.form);
          this.formChild1.form.valueChanges.subscribe(() =>
            this.OnComponentActions.emit(this.formChild1.form)
          );
        }
      }
    }

    //your code to update the model
    this.cdr.detectChanges();
  }

  async onFormControlStatusChanges(event: any) {
    let data = await this.demoService.getClient(event.value);
    if (event.value !== '') {
      this.updateClientValueToControls(data);
    }
  }

  ResetForm() {
    console.log('reset');
  }

  selectClientOption(event: any) {
    if (event === 'exist') {
      this.isNewClient = false;
    } else {
      this.isNewClient = true;
    }
    this.isShowClientDetails = true;
  }

  ngAfterViewInit() {
    this.OnComponentActions.emit(this.dataForm);
    setTimeout(() => (this.isLoading = false), 100);

    //your code to update the model
    this.cdr.detectChanges();
  }

  updateClientValueToControls(client: any) {
    if (client) {
      this.isShowViewClient = true;
      this.setValueForControl('name', client.name);
      this.setValueForControl('email', client.email);
      this.setValueForControl('phone', client.phone);
      this.setValueForControl('address', client.address);
      this.setValueForControl('provinceOrDistrict', client.provinceOrDistrict);
      this.setValueForControl('country', client.country);
    } else this.isShowViewClient = false;
  }

  setValueForControl(key: any, value: any) {
    let control = this.controls.find((item) => item.key === key);
    if (control) {
      control.value = value;
    }
  }
}
