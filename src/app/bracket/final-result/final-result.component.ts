import { Component, OnInit } from '@angular/core';
import { BracketOption, Bracket } from '../bracket-option.model';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { BracketService } from '../bracket.service';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.css']
})
export class FinalResultComponent implements OnInit {
  finalChoice: BracketOption;
  id: number;
  fullBracket: BracketOption[][] = [];
  bracketInfoSelected: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bracketService: BracketService) { }

  ngOnInit(): void {
    this.fullBracket = this.bracketService.getFullBracket();
    this.bracketInfoSelected = this.bracketService.getBracketInfoSelected();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.getBracketOption(this.id);
        }
      );
  }

  getBracketOption(id: number) {
    this.finalChoice = this.bracketService.getBracketData(this.bracketInfoSelected).bracketOptions.find(x => x.id == id);
  }

}
