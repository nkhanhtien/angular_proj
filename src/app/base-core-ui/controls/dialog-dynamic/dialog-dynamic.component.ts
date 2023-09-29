import { Component, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonBaseComponent } from '../../base-components/models/base-component.model';

@Component({
  selector: 'app-form-dialog-dynamic',
  templateUrl: './dialog-dynamic.component.html',
})
export class DialogDynamicFormComponent extends CommonBaseComponent {
  constructor(
    private injector: Injector,
    public dialogRef: MatDialogRef<DialogDynamicFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(injector);
  }

  onDialogFormEvents(event: any) {
    if (event.dialogAction === 'Close') {
      this.dialogRef.close(event);
    }
  }
}
