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

  constructor(private bracketService: BracketService) { }

  ngOnInit(): void {
    this.bracketTitle = this.bracketService.getBracketData().bracketTitle;
    this.fullBracket = this.bracketService.getFullBracket();
  }

}
