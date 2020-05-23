import { Injectable } from '@angular/core';

import  *  as  data  from  './bracket-options.json';
import { Bracket } from './bracket-option.model';

@Injectable({
  providedIn: 'root'
})
export class BracketService {

  constructor() { }

  public getBracketData(): Bracket {
    return (data as any).default;
  }
}
