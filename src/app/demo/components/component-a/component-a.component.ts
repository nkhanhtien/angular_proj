import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoService } from '../../services/demo.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss'],
})
export class ComponentAComponent implements OnInit {
  controls: any[];
  searchControls: any[];
  validatorFn: any;

  @ViewChild('Child1Form', { static: false }) form1: any;
  @ViewChild('searchForm', { static: false }) searchForm: any;

  constructor(private demoService: DemoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.controls = this.demoService.getAllControlForForm();
    this.searchControls = this.demoService.getControlForSearchForm();
  }

  onSubmitSearchForm(event: any) {
    console.log(this.searchForm.form.value);
  }
}
