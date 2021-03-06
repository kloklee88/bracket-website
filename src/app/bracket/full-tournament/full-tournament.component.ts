import { Component, OnInit, Input } from '@angular/core';
import { BracketService } from '../bracket.service';
import { BracketOption, Bracket } from '../bracket-option.model';

@Component({
  selector: 'app-full-tournament',
  templateUrl: './full-tournament.component.html',
  styleUrls: ['./full-tournament.component.css']
})
export class FullTournamentComponent implements OnInit {
  @Input() fullBracket: BracketOption[][] = [];
  @Input("finalChoice") finalChoice: BracketOption;
  bracketOptions: BracketOption[] = [];
  bracketTitle: string;
  bracketInfo: string;

  constructor(private bracketService: BracketService) { }

  ngOnInit(): void {
    this.bracketInfo = this.bracketService.getBracketInfoSelected();
    this.bracketTitle = this.bracketService.getBracketData(this.bracketInfo).bracketTitle;
    this.fullBracket = this.bracketService.getFullBracket();
  }

  checkWinner(round: BracketOption[], i: number, j: number): Object {
    if (this.fullBracket[i + 1] != undefined) {
      if (this.fullBracket[i + 1].some(b => b.name === round[j].name)) {
        return "winner";
      }
    } else if (this.finalChoice != null && this.finalChoice.name === round[j].name) {
      return "winner";
    }
    return "";
  }

}
