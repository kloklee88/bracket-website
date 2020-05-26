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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bracketService: BracketService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.getBracketOption(this.id);
        }
      );
      this.fullBracket = this.bracketService.getFullBracket();
  }

  getBracketOption(id: number) {
    this.finalChoice = this.bracketService.getBracketData().bracketOptions.find(x => x.id == id);
  }

}
