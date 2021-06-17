import { FormControl, FormGroup, Validators } from "@angular/forms";

export class Bracket {
  public bracketTitle: string;
  public bracketOptions: BracketOption[];
}

export class BracketOption {
  public id: number;
  public name: string;
  public group: string;
  public images: string[];
  public imageUrl: string;

  static asFormGroup(bracketOption: BracketOption): FormGroup {
    const fg = new FormGroup({
      id: new FormControl(bracketOption.id, Validators.required),
      name: new FormControl(bracketOption.name, Validators.required),
      group: new FormControl(bracketOption.group, Validators.required),
      images: new FormControl(bracketOption.images, Validators.required)
    });
    return fg;
  }

  constructor(id: number, name: string, group: string, images: string[]) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.images = images;
  }
}