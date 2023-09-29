import {
  Component,
  OnInit,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form-1',
  templateUrl: './data-form_1.component.html',
  styleUrls: ['./data-form_1.component.scss'],
})
export class DataForm1Component implements OnInit {
  index: number;
  @Output() OnComponentActions = new EventEmitter<any>();
  private dataForm = new FormGroup({
    service: new FormControl('', [Validators.required]),
  });

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.index = this.injector.get('index', 0);
    if (this.index === undefined || this.index === 0) {
      this.index = 1;
    }
    this.OnComponentActions.emit(this.dataForm);
    this.dataForm.valueChanges.subscribe(() =>
      this.OnComponentActions.emit(this.dataForm)
    );
  }

  selectPackage(event: any) {
    this.dataForm.controls['service'].setValue(event);
  }
}
