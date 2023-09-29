import { Component, EventEmitter, Inject, Injector, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonBaseComponent } from 'src/app/base-core-ui/app.core.shared.models';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent extends CommonBaseComponent implements OnInit {
  title: string = "Confirmation";
  message: string;
  @Output() confirmEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();



  constructor(injector: Injector,
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);

  }

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  onClickCancelBtn() {
    this.cancelEvent.emit();
    this.dialogRef.close();
  }

  onClickConfirmBtn() {
    const data = {
      action: 'confirm',
      payload: this.data.row
    };
    this.confirmEvent.emit(data);
    this.dialogRef.close(data);
  }

}
