import { Component, OnInit, Input } from '@angular/core';
import { BracketService } from '../bracket.service';
import { BracketOption } from '../bracket-option.model';

@Component({
  selector: 'app-full-tournament',
  templateUrl: './full-tournament.component.html',
  styleUrls: ['./full-tournament.component.css']
})
export class FullTournamentComponent implements OnInit {
  @Input() fullBracket: BracketOption[][] = [];
  bracketOptions: BracketOption[] = [];
  bracketTitle: string;
  roundIndices: number[];
  gameIndices: number[];
  math = Math;

  constructor(private bracketService: BracketService) { }

  ngOnInit(): void {
    this.bracketTitle = this.bracketService.getBracketData().bracketTitle;
    //this.bracketOptions = this.bracketService.getBracketData().bracketOptions;
    this.fullBracket = this.bracketService.getFullBracket();
    let roundNumber = this.fullBracket.length;
    this.roundIndices = [...Array(roundNumber).keys()];
    this.gameIndices = [...Array(this.fullBracket.length).keys()].map(x => x * 2);
    console.log(this.roundIndices);
    console.log(this.gameIndices);
  }

}
