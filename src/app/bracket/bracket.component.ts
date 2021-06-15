import { Component, OnInit, HostListener } from '@angular/core';
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
  fullBracket: BracketOption[][] = [];
  selectedChoice: BracketOption;
  choice1: BracketOption;
  choice2: BracketOption;
  counter: number = 1;
  bracketIndex: number = 0;
  id: number;
  bracketSize: number;
  group: string[];
  bracketStarted: boolean = false;
  multipleImages: boolean = false;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private bracketService: BracketService) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    //This allows left and right arrow keys to choose options 
    if (event.key == 'ArrowLeft' && this.bracketStarted) {
      this.selectBracketOption(this.choice1, 1);
    } else if (event.key == 'ArrowRight'  && this.bracketStarted) {
      this.selectBracketOption(this.choice2, 2)
    }
  }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '350px',
      disableClose: true,
      data: { bracketSize: this.bracketSize, group: this.group }
    });

    const subscribeDialog = dialogRef.componentInstance.dialogOutputEmitter.subscribe((data) => {
      this.multipleImages = data.multipleImages;
      this.initBracket(data.bracketSize, data.group, data.bracketData);
    });
  }

  randomizeBracket() {
    //Randomize order of list
    for (let i = this.bracketOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.bracketOptions[i], this.bracketOptions[j]] = [this.bracketOptions[j], this.bracketOptions[i]];
    }
  }

  setImageUrls() {
    //Set the imageUrl value to a random decided image in the images array list
    for (let i = 0; i < this.bracketOptions.length; i++) {
      let imagesLength = this.bracketOptions[i].images.length
      const j = Math.floor(Math.random() * imagesLength);
      this.bracketOptions[i].imageUrl = this.bracketOptions[i].images[j]
    }
  }

  initBracket(bracketSize: number, groups: string[], bracketData: string) {
    this.bracketService.saveBracketInfoSelected(bracketData);
    this.bracketTitle = this.bracketService.getBracketData(bracketData).bracketTitle;
    this.bracketOptions = this.bracketService.getBracketData(bracketData).bracketOptions;
    this.setImageUrls();
    this.randomizeBracket();
    // Filter out the groups that we want
    this.bracketOptions = this.bracketOptions.filter(x => groups.includes(x.group));
    // Limit the data to bracket values (2,4,8,16,32,64, etc)
    this.bracketOptions = this.bracketOptions.slice(0, bracketSize);
    // Store first iteration/round of bracket
    let bracketRoundStart = this.bracketOptions.map(x => Object.assign({}, x));
    this.fullBracket.push(bracketRoundStart);
    this.choice1 = this.bracketOptions[this.bracketIndex];
    this.choice2 = this.bracketOptions[this.bracketIndex + 1];
    this.bracketStarted = true;
  }

  async selectBracketOption(selectedOption: BracketOption, choiceNumber: number) {
    // Change state to show animations
    if (choiceNumber === 1) {
      this.state1 = 'selected';
      this.state2 = 'not-selected';
    } else if (choiceNumber === 2) {
      this.state2 = 'selected';
      this.state1 = 'not-selected';
    }
    await this.delay(1000);
    //Save the selected choice into new array
    this.bracketOptionsNext.push(selectedOption);
    this.bracketIndex = this.bracketIndex + 2;
    if (this.bracketOptions.length == 2) {
      //Redirect to new page with final result
      this.bracketService.saveFullBracket(this.fullBracket);
      this.id = selectedOption.id;
      this.router.navigate(['../final-result', this.id], { relativeTo: this.route });
    } else if (this.bracketIndex + 1 < this.bracketOptions.length) {
      //Change page to the next options
      this.choice1 = this.bracketOptions[this.bracketIndex];
      this.choice2 = this.bracketOptions[this.bracketIndex + 1];
      this.counter++;
    } else {
      //Store winners for full bracket display
      let bracketRoundWinner = this.bracketOptionsNext.map(x => Object.assign({}, x));
      this.fullBracket.push(bracketRoundWinner);
      //Restart the bracket index
      this.bracketIndex = 0;
      this.counter = 1;
      //Replace bracket list with new selected options
      this.bracketOptions = this.bracketOptionsNext;
      //Clear the storage/selected bracket
      this.bracketOptionsNext = [];
      this.choice1 = this.bracketOptions[this.bracketIndex];
      this.choice2 = this.bracketOptions[this.bracketIndex + 1];
    }
    // Give some time for the image to load correctly, so hide both elements and go back to normal state
    this.state1 = 'not-selected';
    this.state2 = 'not-selected';
    await this.delay(100);
    this.state1 = 'normal';
    this.state2 = 'normal';
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}
