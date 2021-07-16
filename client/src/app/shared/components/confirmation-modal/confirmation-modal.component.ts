import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface InjectedData {
  text: string
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: InjectedData) { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
