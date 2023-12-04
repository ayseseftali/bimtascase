import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { DialogContentExampleDialog } from './dialog-content-example-dialog';


@NgModule({
    declarations: [DialogContentExampleDialog],
    imports: [
      MatDialogModule
    ]
})
export class DialogContentExampleDialogModule { }
