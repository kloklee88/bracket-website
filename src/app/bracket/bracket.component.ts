import { Component, OnInit, OnChanges } from '@angular/core';
import { BracketOption } from './bracket-option.model';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {
  bracketOptions: BracketOption[] = [];
  bracketOptionsNext: BracketOption[] = [];
  selectedChoice: BracketOption;
  choice1: BracketOption;
  choice2: BracketOption;
  bracketIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.initBracket();
    this.randomizeBracket();
    this.startBracketCompetition();
  }

  initBracket() {
    for(let i = 0; i < 8; i++) {
      let bracketOption = new BracketOption();
      bracketOption.name = 'Test' + i;
      bracketOption.imageUrl = 'Image' + i;
      this.bracketOptions.push(bracketOption);
    }
    //console.log(this.bracketOptions);
  }

  randomizeBracket() {
    //Randomize order of list
    for (let i = this.bracketOptions.length - 1; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1));
        [this.bracketOptions[i], this.bracketOptions[j]] = [this.bracketOptions[j], this.bracketOptions[i]];
    }
    console.log(this.bracketOptions);
  }

  startBracketCompetition() {
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
    if(this.bracketOptions.length == 2) {
      //TODO: Redirect to new page with final result
      console.log('Finished ENTIRE bracket');
    } else if(this.bracketIndex + 1 < this.bracketOptions.length) {
      //Change page to the next options
      this.choice1 = this.bracketOptions[this.bracketIndex];
      this.choice2 = this.bracketOptions[this.bracketIndex + 1];
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
      this.bracketOptions = this.bracketOptionsNext;
      this.bracketOptionsNext = [];
      this.choice1 = this.bracketOptions[this.bracketIndex];
      this.choice2 = this.bracketOptions[this.bracketIndex + 1];
      //console.log(this.choice1);
      //console.log(this.choice2);
    }
  }

}
