import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-form-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
})
export class DialogMessageComponent {
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
