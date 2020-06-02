import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BracketService } from '../bracket.service';

export class DialogData {
  group: string[];
  bracketSize: number;
  bracketData: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  bracketSizes: number[] = [2, 4, 8, 16, 32, 64];
  groupFormControl = new FormControl();
  bracketSizeFormControl = new FormControl();
  bracketDataFormControl = new FormControl();
  groupList: string[] = [];
  data: DialogData = new DialogData();
  submitted: boolean = false;
  @Output() dialogOutputEmitter = new EventEmitter();
  @ViewChild('allSelected') private allSelected: MatOption;
  bracketDataList: string[] = [];

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private bracketService: BracketService) { }

  ngOnInit(): void {
    this.bracketDataList = this.bracketService.getBracketDataList();
  }

  updateBracketGroups() {
    this.groupList = [...new Set(this.bracketService.getBracketData(this.data.bracketData).bracketOptions.map(x => x.group))] as string[];
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['../about'], { relativeTo: this.route });
  }

  submitBracketInfo() {
    this.submitted = true;
    if (this.groupFormControl.valid && this.bracketSizeFormControl.valid) {
      this.dialogRef.close();
      this.dialogOutputEmitter.emit(this.data);
    }
  }

  tosslePerOne() {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.groupFormControl.value.length == this.groupList.length) {
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
