import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  @Input() FormTitle = 'confirmation';
  @Input() ButtonCloseLabel = 'cancel';
  @Input() ButtonConfirmLabel = 'confirm';

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  actionClick(data: any): void {
    let result: boolean = false;
    if (data === 'y') result = true;
    this.dialogRef.close(result);
  }
}
