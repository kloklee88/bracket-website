import { Component, OnInit } from '@angular/core';
import { BracketOption } from './bracket-option.model';
import { Router, ActivatedRoute } from '@angular/router';

import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BracketService } from './bracket.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css'],
  animations: [
    trigger('state1', [
      state('normal', style({
      })),
      state('selected', style({
        transform: 'translateX(50px)'
      })),
      state('not-selected', style({
        display: 'none'
      })),
      transition('normal => selected', animate(1000))
    ]),
    trigger('state2', [
      state('normal', style({
      })),
      state('selected', style({
        transform: 'translateX(-50px)'
      })),
      state('not-selected', style({
        display: 'none'
      })),
      transition('normal => selected', animate(1000))
    ])
  ]
})
export class BracketComponent implements OnInit {
  state1 = 'normal';
  state2 = 'normal';
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
    private router: Router,
    private bracketService: BracketService) {}

  ngOnInit(): void {
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
      this.initBracket(data.bracketSize, data.group);
    });
  }

  randomizeBracket() {
    //Randomize order of list
    for (let i = this.bracketOptions.length - 1; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1));
        [this.bracketOptions[i], this.bracketOptions[j]] = [this.bracketOptions[j], this.bracketOptions[i]];
    }
  }

  initBracket(bracketSize: number, groups: string[]) {
    this.bracketTitle = this.bracketService.getBracketData().bracketTitle;
    this.bracketOptions = this.bracketService.getBracketData().bracketOptions;
    this.randomizeBracket();
    // Filter out the groups that we want
    this.bracketOptions = this.bracketOptions.filter(x => groups.includes(x.group));
    // Limit the data to bracket values (2,4,8,16,32,64, etc)
    this.bracketOptions = this.bracketOptions.slice(0, bracketSize);
    // TODO: If bracket is not a perfect number, reduce it down to the next available option
    this.choice1 = this.bracketOptions[this.bracketIndex];
    this.choice2 = this.bracketOptions[this.bracketIndex + 1];
  }

  async selectBracketOption(selectedOption: BracketOption, choiceNumber: number) {
    // Change state to show animations
    if(choiceNumber === 1) {
      this.state1 = 'selected';
      this.state2 = 'not-selected';
    } else if(choiceNumber === 2) {
      this.state2 = 'selected';
      this.state1 = 'not-selected';
    }
    await this.delay(1000);
    //Save the selected choice into new array
    this.bracketOptionsNext.push(selectedOption);
    this.bracketIndex = this.bracketIndex + 2;
    if(this.bracketOptions.length == 2) {
      //Redirect to new page with final result
      this.id = selectedOption.id;
      this.router.navigate(['../final-result', this.id], {relativeTo: this.route});
    } else if(this.bracketIndex + 1 < this.bracketOptions.length) {
      //Change page to the next options
      this.choice1 = this.bracketOptions[this.bracketIndex];
      this.choice2 = this.bracketOptions[this.bracketIndex + 1];
      this.counter++;
    } else {
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
    }
    this.state1 = 'normal';
    this.state2 = 'normal';
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}
