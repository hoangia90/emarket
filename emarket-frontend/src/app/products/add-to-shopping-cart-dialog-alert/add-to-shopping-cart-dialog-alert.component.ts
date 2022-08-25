import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-shopping-cart-dialog-alert',
  templateUrl: './add-to-shopping-cart-dialog-alert.component.html',
  styleUrls: ['./add-to-shopping-cart-dialog-alert.component.css']
})
export class AddToShoppingCartDialogAlertComponent implements OnInit {
  message: string = ""
  cancelButtonText = "Cancel"

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddToShoppingCartDialogAlertComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('300vw','300vw')
  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
