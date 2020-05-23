import { Component, OnInit } from '@angular/core';
import { BracketOption } from '../bracket-option.model';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bracketService: BracketService) { }

  ngOnInit(): void {
    console.log('Got to final result');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.getBracketOption(this.id);
        }
      );
  }

  getBracketOption(id: number) {
    console.log(id);
    this.finalChoice = this.bracketService.getBracketData().bracketOptions.find(x => x.id == id);
    console.log(this.finalChoice);
  }

}
