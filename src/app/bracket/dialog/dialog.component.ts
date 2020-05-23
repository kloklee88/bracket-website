import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';

import  *  as  data  from  '../bracket-options.json';
import { ActivatedRoute, Router } from '@angular/router';

export class DialogData {
  group: string[];
  bracketSize: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  bracketSizes: number[] = [2,4,8,16,32,64];
  groupFormControl = new FormControl();
  bracketSizeFormControl = new FormControl();
  groupList: string[] = ['Twice', 'Oh My Girl', 'Blackpink', 'Red Velvet'];
  data: DialogData = new DialogData();
  submitted: boolean = false;
  @Output() dialogOutputEmitter = new EventEmitter();
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    console.log((data as any).default.bracketOptions);
    this.groupList = [...new Set((data as any).default.bracketOptions.map(x => x.group))] as string[];
    console.log(this.groupList);
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['../about'], {relativeTo: this.route});
  }

  submitBracketInfo() {
    console.log("Valid bracket size?", this.bracketSizeFormControl.valid);
    console.log("Valid groups?", this.groupFormControl.valid);
    this.submitted = true;
    if (this.groupFormControl.valid && this.bracketSizeFormControl.valid) {
      console.log("Submitted bracket options");
      this.dialogRef.close();
      this.dialogOutputEmitter.emit(this.data);
    }
  }

  tosslePerOne(all){ 
    if (this.allSelected.selected) {  
        this.allSelected.deselect();
        return false;
    }
    if(this.groupFormControl.value.length==this.groupList.length) {
      this.allSelected.select();
    }
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.groupFormControl.patchValue([...this.groupList, 0]);
    } else {
      this.groupFormControl.patchValue([]);
    }
  }

}
