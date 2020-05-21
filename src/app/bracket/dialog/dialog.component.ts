import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class DialogData {
  group: string[];
  bracketSize: number;

  constructor(bracketSize) {
    this.bracketSize = bracketSize;
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  data: DialogData = new DialogData(0);
  @Output() dialogOutputEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>
    ) {}
    //,@Inject(MAT_DIALOG_DATA) public data: DialogData

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitBracketInfo() {
    this.dialogOutputEmitter.emit(this.data);
  }

}
