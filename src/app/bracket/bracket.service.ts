import { Injectable } from '@angular/core';

import * as dataGirls from './bracket-options-girls.json';
import * as dataSongs from './bracket-options-songs.json';

import { Bracket, BracketOption } from './bracket-option.model';

@Injectable({
  providedIn: 'root'
})
export class BracketService {
  fullBracket: BracketOption[][] = [];
  bracketInfoSelected: string;

  constructor() { }

  public getBracketDataList(): string[] {
    return ['SONGS', 'GIRLS'];
  }

  public getBracketData(bracketInfo: string): Bracket {
    if(bracketInfo === 'GIRLS') {
      return (dataGirls as any).default;
    } else if (bracketInfo === 'SONGS') {
      return (dataSongs as any).default;
    }
    return null;
  }

  public saveBracketInfoSelected(bracketInfoSelected: string) {
    this.bracketInfoSelected = bracketInfoSelected;
  }

  public getBracketInfoSelected(): string {
    return this.bracketInfoSelected;
  }

  public saveFullBracket(fullBracket: BracketOption[][]) {
    this.fullBracket = fullBracket;
  }

  public getFullBracket(): BracketOption[][] {
    return this.fullBracket;
  }
}
