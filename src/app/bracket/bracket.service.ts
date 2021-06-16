import { Injectable } from '@angular/core';

import * as dataGirls from './bracket-options-girls.json';
import * as dataSongs from './bracket-options-songs.json';
import * as dataNba from './bracket-options-nba.json';
import * as dataNfl from './bracket-options-nfl.json';

import { Bracket, BracketOption } from './bracket-option.model';

@Injectable({
  providedIn: 'root'
})
export class BracketService {
  fullBracket: BracketOption[][] = [];
  bracketInfoSelected: string;

  constructor() { }

  public getBracketDataList(): string[] {
    return ['KPOP SONGS', 'KPOP GIRLS', 'NBA GOATs', 'NFL GOATs'];
  }

  public getBracketData(bracketInfo: string): Bracket {
    if(bracketInfo === 'KPOP GIRLS') {
      return (dataGirls as any).default;
    } else if (bracketInfo === 'KPOP SONGS') {
      return (dataSongs as any).default;
    } else if (bracketInfo === 'NBA GOATs') {
      return (dataNba as any).default;
    } else if (bracketInfo === 'NFL GOATs') {
      return (dataNfl as any).default;
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
