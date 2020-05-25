import { Injectable } from '@angular/core';

import *  as  data from './bracket-options.json';
import { Bracket, BracketOption } from './bracket-option.model';

@Injectable({
  providedIn: 'root'
})
export class BracketService {
  fullBracket: BracketOption[][] = [];

  constructor() { }

  public getBracketData(): Bracket {
    return (data as any).default;
  }

  public saveFullBracket(fullBracket: BracketOption[][]) {
    this.fullBracket = fullBracket;
  }

  public getFullBracket(): BracketOption[][] {
    return this.fullBracket;
  }
}
