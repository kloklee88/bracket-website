import { Component, OnInit } from '@angular/core';
import { BracketService } from '../bracket.service';
import { BracketOption } from '../bracket-option.model';

@Component({
  selector: 'app-full-tournament',
  templateUrl: './full-tournament.component.html',
  styleUrls: ['./full-tournament.component.css']
})
export class FullTournamentComponent implements OnInit {
  bracketOptions: BracketOption[] = [];
  bracketTitle: string;
  roundIndices: number[];
  gameIndices: number[];
  math = Math;

  constructor(private bracketService: BracketService) { }

  ngOnInit(): void {
    this.bracketTitle = this.bracketService.getBracketData().bracketTitle;
    this.bracketOptions = this.bracketService.getBracketData().bracketOptions;
    let roundNumber = Math.log2(this.bracketOptions.length);
    this.roundIndices = [...Array(roundNumber).keys()];
    this.gameIndices = [...Array(this.bracketOptions.length/2).keys()].map(x => x*2);
    console.log(this.gameIndices);
  }

}
