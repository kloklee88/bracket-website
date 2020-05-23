export class Bracket {
  public bracketTitle: string;
  public bracketOptions: BracketOption[];
}

export class BracketOption {
    public id: number;
    public name: string;
    public group: string;
    public imageUrl: string;
}