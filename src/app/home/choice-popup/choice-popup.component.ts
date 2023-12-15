import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  RowInterface,
  SelectInterface,
  TrexNamesEnum,
  TrexTypesEnum,
} from 'src/app/interfaces/trex-types';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-choice-popup',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './choice-popup.component.html',
  styleUrls: ['./choice-popup.component.scss'],
})
export class ChoicePopupComponent implements OnInit {
  public value = new FormControl();
  public label = '';
  public options: SelectInterface[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: TrexTypesEnum;
      row: RowInterface;
      playerNb: 1 | 2 | 3 | 4;
    },
    private _dialogRef: MatDialogRef<ChoicePopupComponent>
  ) {
    this.value.valueChanges.pipe(take(1)).subscribe((v) => this.closeDialog(v));
  }

  ngOnInit(): void {
    this.getOptions();
  }

  public closeDialog(choice?: number | null): void {
    this._dialogRef.close(choice);
  }

  private getOptions(): void {
    const choosenOpts: number[] = [];
    this.data.playerNb !== 1 &&
      this.data.row.p1 &&
      choosenOpts.push(this.data.row.p1);
    this.data.playerNb !== 2 &&
      this.data.row.p2 &&
      choosenOpts.push(this.data.row.p2);
    this.data.playerNb !== 3 &&
      this.data.row.p3 &&
      choosenOpts.push(this.data.row.p3);
    this.data.playerNb !== 4 &&
      this.data.row.p4 &&
      choosenOpts.push(this.data.row.p4);

    const currentOpts: SelectInterface[] = [];
    if (this.data.type === TrexTypesEnum.TREX) {
      this.label = 'Select Position';
      currentOpts.push(
        { name: 'First', value: 200 },
        { name: 'Second', value: 150 },
        { name: 'Third', value: 100 },
        { name: 'Fourth', value: 50 }
      );
      this.options = currentOpts.filter(
        (opt) => !choosenOpts.includes(opt.value)
      );
    } else if (this.data.type === TrexTypesEnum.BANET) {
      this.label = `Select Number Of ${TrexNamesEnum.BANET}`;
      currentOpts.push(
        { name: '1', value: -25 },
        { name: '2', value: -50 },
        { name: '3', value: -75 },
        { name: '4', value: -100 }
      );

      const total = choosenOpts.reduce(
        (accumulator, currentValue) =>
          currentValue ? Math.abs(accumulator) + Math.abs(currentValue) : 0,
        0
      );

      const nbOfOpts = total / 25;
      for (let i = 0; i < nbOfOpts; i++) {
        currentOpts.pop();
      }
      this.options = currentOpts;
    } else if (this.data.type === TrexTypesEnum.DINERE) {
      this.label = `Select Number Of ${TrexNamesEnum.DINERE}`;
      currentOpts.push(
        { name: '1', value: -10 },
        { name: '2', value: -20 },
        { name: '3', value: -30 },
        { name: '4', value: -40 },
        { name: '5', value: -50 },
        { name: '6', value: -60 },
        { name: '7', value: -70 },
        { name: '8', value: -80 },
        { name: '9', value: -90 },
        { name: '10', value: -100 },
        { name: '11', value: -110 },
        { name: '12', value: -120 },
        { name: '13', value: -130 }
      );
      const total = choosenOpts.reduce(
        (accumulator, currentValue) =>
          currentValue ? Math.abs(accumulator) + Math.abs(currentValue) : 0,
        0
      );

      const nbOfOpts = total / 10;
      for (let i = 0; i < nbOfOpts; i++) {
        currentOpts.pop();
      }
      this.options = currentOpts;
    } else if (this.data.type === TrexTypesEnum.LTOUSH) {
      this.label = `Select Number Of ${TrexNamesEnum.LTOUSH}`;
      currentOpts.push(
        { name: '1', value: -15 },
        { name: '2', value: -30 },
        { name: '3', value: -45 },
        { name: '4', value: -60 },
        { name: '5', value: -75 },
        { name: '6', value: -90 },
        { name: '7', value: -105 },
        { name: '8', value: -120 },
        { name: '9', value: -135 },
        { name: '10', value: -150 },
        { name: '11', value: -165 },
        { name: '12', value: -180 },
        { name: '13', value: -195 }
      );
      const total = choosenOpts.reduce(
        (accumulator, currentValue) =>
          currentValue ? Math.abs(accumulator) + Math.abs(currentValue) : 0,
        0
      );

      const nbOfOpts = total / 15;
      for (let i = 0; i < nbOfOpts; i++) {
        currentOpts.pop();
      }
      this.options = currentOpts;
    } else if (this.data.type === TrexTypesEnum.KOUBBA) {
      this.label = `Select ${TrexNamesEnum.KOUBBA}`;
      currentOpts.push({ name: '1', value: -75 });
      const total = choosenOpts.reduce(
        (accumulator, currentValue) =>
          currentValue ? Math.abs(accumulator) + Math.abs(currentValue) : 0,
        0
      );
      const nbOfOpts = total / 75;
      for (let i = 0; i < nbOfOpts; i++) {
        currentOpts.pop();
      }
      this.options = currentOpts;
    }
  }
}
