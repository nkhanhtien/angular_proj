import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-filter',
  templateUrl: './activity-filter.component.html',
  styleUrls: ['./activity-filter.component.scss']
})
export class ActivityFilterComponent implements OnInit {
  controls: any[];

  @Output() filterEvent = new EventEmitter<any>();

  @ViewChild('ActivityFilterForm', { static: false }) activityFilterForm: any;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.controls = this.activityService.getAllControlForFilterForm();
  }
  
  onClickSearchBtn() {
    this.filterEvent.emit(this.activityFilterForm.form.value);
  }
}
