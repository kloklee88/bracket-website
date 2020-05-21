import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';

import  *  as  data  from  '../bracket-options.json';

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
export class DialogComponent implements OnInit {
  bracketSizes: number[] = [2,4,8,16,32,64];
  groups = new FormControl();
  groupList: string[] = ['Twice', 'Oh My Girl', 'Blackpink', 'Red Velvet'];
  data: DialogData = new DialogData(0);
  @Output() dialogOutputEmitter = new EventEmitter();
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>
    ) {}
    //,@Inject(MAT_DIALOG_DATA) public data: DialogData

  ngOnInit(): void {
    //console.log((data as any).default.bracketOptions);
    //this.groupList = [...new Set((data as any).default.bracketOptions.map(x => x.group))] as string[];
    //console.log(this.groupList);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitBracketInfo() {
    this.dialogOutputEmitter.emit(this.data);
  }

  tosslePerOne(all){ 
    if (this.allSelected.selected) {  
        this.allSelected.deselect();
        return false;
    }
    if(this.groups.value.length==this.groupList.length) {
      this.allSelected.select();
    }
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.groups.patchValue([...this.groupList, 0]);
    } else {
      this.groups.patchValue([]);
    }
  }

}
