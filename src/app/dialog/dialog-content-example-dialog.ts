import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogData } from '../dialog/interfaces/DialogData.model'
@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: './dialog-content-example-dialog.html'
  })
  export class DialogContentExampleDialog {
    detailData:DialogData;
    constructor(
      public dialogRef: MatDialogRef<DialogContentExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
       this.detailData = data;
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }