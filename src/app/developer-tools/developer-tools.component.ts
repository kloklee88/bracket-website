import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { BracketOption } from '../bracket/bracket-option.model';

@Component({
  selector: 'app-developer-tools',
  templateUrl: './developer-tools.component.html',
  styleUrls: ['./developer-tools.component.css']
})
export class DeveloperToolsComponent implements OnInit {
  form: FormGroup;
  displayedColumns = ["id", 'name', 'group', 'images'];
  @ViewChild(MatTable) table: MatTable<BracketOption>;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      bracketTitle: new FormControl,
      bracketOptions: this._formBuilder.array([BracketOption.asFormGroup(new BracketOption(1, null, null, null))])
    });
    console.log(this.bracketOptions)
    this.form.setControl('bracketOptions', this.bracketOptions);
  }

  get bracketOptions(): FormArray {
    return this.form.get('bracketOptions') as FormArray;
  }

  onImagesInputChange(element: FormGroup) {
    console.log("Images input changed");
    let images = element.get("images");
    images.setValue(images.value.split(","));
  }

  addData() {
    this.bracketOptions.push(BracketOption.asFormGroup(new BracketOption(this.bracketOptions.length + 1, null, null, null)));
    this.table.renderRows();
  }

  removeData() {
    this.bracketOptions.removeAt(this.bracketOptions.length - 1);
    this.table.renderRows();
  }

}
