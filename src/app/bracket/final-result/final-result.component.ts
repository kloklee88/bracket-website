import { Component, OnInit } from '@angular/core';
import { BracketOption } from '../bracket-option.model';

import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs';

import  *  as  data  from  '../bracket-options.json';

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
    private router: Router) { }

  ngOnInit(): void {
    console.log('Got to final result');
  }

  getBracketOption(id: number) {
    console.log(id);
    console.log((data as any).default.bracketOptions);
    this.finalChoice = (data as any).default.bracketOptions.find(x => x.id == id);
    console.log(this.finalChoice);
  }

}
