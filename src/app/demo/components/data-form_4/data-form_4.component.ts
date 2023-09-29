import {
  Component,
  OnInit,
  Injector,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-data-form-4',
  templateUrl: './data-form_4.component.html',
  styleUrls: ['./data-form_4.component.scss'],
})
export class DataForm4Component implements OnInit {
  index: number;
  controls: any[];
  viewControls1: any[] = [];
  viewControls2: any[] = [];
  viewControls3: any[] = [];

  @Output() OnComponentActions = new EventEmitter<any>();

  // @ViewChild('ChildForm1', { static: false }) formChild1;
  // @ViewChild('ChildForm2', { static: false }) formChild2;
  // @ViewChild('ChildForm3', { static: false }) formChild3;

  constructor(private injector: Injector, private demoService: DemoService) {}
  dataForm = new FormGroup({});
  ngOnInit() {
    this.index = this.injector.get('index', 0);
    if (this.index === undefined || this.index === 0) {
      this.index = 1;
    }

    this.controls = this.injector.get('controls', 0);
    if (this.controls === undefined) {
      this.controls = [];
    }
    // this.controls = this.demoService.getControlForDataFormConfirm();
    for (let index = 0; index < this.controls.length; index++) {
      if (index < 3) this.viewControls1.push(this.controls[index]);
      else if (index < 6) this.viewControls2.push(this.controls[index]);
      else this.viewControls3.push(this.controls[index]);
    }
    this.OnComponentActions.emit(this.dataForm);
  }

  // ngAfterViewInit() {
  //   console.log(this.formChild2)
  //   if (this.formChild1.form && this.formChild2.form && this.formChild3.form) {
  //     for (let control in this.formChild1.form.controls) console.log(control)
  //     // for (let control in this.formChild1.form.controls) this.dataForm[control] = this.formChild1.form.controls[control];
  //     // for (let control in this.formChild2.form.controls) this.dataForm[control] = this.formChild2.form.controls[control];
  //     // for (let control in this.formChild3.form.controls) this.dataForm[control] = this.formChild3.form.controls[control];
  //     console.log(this.dataForm)
  //     this.onFormGroupChange.emit(this.dataForm);
  //     this.formChild1.form.valueChanges
  //       .subscribe(() => this.onFormGroupChange.emit(this.dataForm));
  //     this.formChild2.form.valueChanges
  //       .subscribe(() => this.onFormGroupChange.emit(this.dataForm));
  //     this.formChild3.form.valueChanges
  //       .subscribe(() => this.onFormGroupChange.emit(this.dataForm));
  //   }
  // }
}
