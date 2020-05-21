import { Component, OnInit, OnChanges, Output, Input } from '@angular/core';
import { BracketOption } from './bracket-option.model';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

import  *  as  data  from  './bracket-options.json';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {
  bracketTitle: string;
  bracketOptions: BracketOption[] = [];
  bracketOptionsNext: BracketOption[] = [];
  selectedChoice: BracketOption;
  choice1: BracketOption;
  choice2: BracketOption;
  counter: number = 1;
  bracketIndex: number = 0;
  id: number;
  bracketSize: number;
  group: string[];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //this.initBracket();
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '350px',
      disableClose: true,
      data: {bracketSize: this.bracketSize, group: this.group}
    });

    const subscribeDialog = dialogRef.componentInstance.dialogOutputEmitter.subscribe((data) => {
      console.log('dialog data', data);
      this.initBracket(data.bracketSize);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.initBracket(8);
    });
  }

  randomizeBracket() {
    console.log('Randomizing bracket');
    //Randomize order of list
    for (let i = this.bracketOptions.length - 1; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1));
        [this.bracketOptions[i], this.bracketOptions[j]] = [this.bracketOptions[j], this.bracketOptions[i]];
    }
    console.log(this.bracketOptions);
  }

  initBracket(bracketSize: number) {
    console.log('Initializing bracket');
    this.bracketTitle = (data as any).default.bracketTitle;
    this.bracketOptions = (data as any).default.bracketOptions;
    this.randomizeBracket();
    // Limit the data to bracket values (2,4,8,16,32,64, etc)
    this.bracketOptions = this.bracketOptions.slice(0, bracketSize);
    console.log(this.bracketOptions);
    //FOR TESTING
    // for(let i = 0; i < 8; i++) {
    //   let bracketOption = new BracketOption();
    //   bracketOption.name = 'Test' + i;
    //   bracketOption.imageUrl = 'https://i.imgur.com/12UsEsi.png';
    //   this.bracketOptions.push(bracketOption);
    // }
    console.log('Starting bracket competition');
    this.choice1 = this.bracketOptions[this.bracketIndex];
    //console.log(this.choice1);
    this.choice2 = this.bracketOptions[this.bracketIndex + 1];
    //console.log(this.choice2);
  }

  selectBracketOption(selectedOption: BracketOption) {
    //Save the selected choice into new array
    console.log(selectedOption);
    this.bracketOptionsNext.push(selectedOption);
    this.bracketIndex = this.bracketIndex + 2;
    console.log(this.bracketOptions.length);
    if(this.bracketOptions.length == 2) {
      //TODO: Redirect to new page with final result
      console.log('Finished ENTIRE bracket');
      this.id = selectedOption.id;
      //this.router.navigate(['final-result'], {relativeTo: this.route});
      this.router.navigate(['../final-result', this.id], {relativeTo: this.route});
    } else if(this.bracketIndex + 1 < this.bracketOptions.length) {
      //Change page to the next options
      this.choice1 = this.bracketOptions[this.bracketIndex];
      this.choice2 = this.bracketOptions[this.bracketIndex + 1];
      this.counter++;
      //console.log(this.choice1);
      //console.log(this.choice2);
    } else {
      console.log('Finished bracket');
      console.log('Starting next bracket');
      console.log(this.bracketOptionsNext);
      //Restart the bracket index
      //Replace bracket list with new selected options
      //Clear the storage/selected bracket
      this.bracketIndex = 0;
      this.counter = 1;
      this.bracketOptions = this.bracketOptionsNext;
      this.randomizeBracket();
      this.bracketOptionsNext = [];
      this.choice1 = this.bracketOptions[this.bracketIndex];
      this.choice2 = this.bracketOptions[this.bracketIndex + 1];
      //console.log(this.choice1);
      //console.log(this.choice2);
    }
  }

}
