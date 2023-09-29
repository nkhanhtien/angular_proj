import {
  Component,
  OnInit,
  Injector,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-data-form-2',
  templateUrl: './data-form_2.component.html',
  styleUrls: ['./data-form_2.component.scss'],
})
export class DataForm2Component implements OnInit, AfterViewInit {
  index: number;
  controls: any[];
  @ViewChild('ChildForm', { static: false }) formChild: any;
  @Output() OnComponentActions = new EventEmitter<any>();

  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    private demoService: DemoService
  ) {}

  ngOnInit() {
    this.controls = this.demoService.getControlForDataForm2();
    this.index = this.injector.get('index', 0);
    if (this.index === undefined || this.index === 0) {
      this.index = 1;
    }
  }

  ngAfterViewInit() {
    if (this.formChild.form) {
      this.OnComponentActions.emit(this.formChild.form);
      this.formChild.form.valueChanges.subscribe(() =>
        this.OnComponentActions.emit(this.formChild.form)
      );
    }

    //your code to update the model
    this.cdr.detectChanges();
  }
}
