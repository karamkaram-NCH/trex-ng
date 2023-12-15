import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  PlayersInterface,
  SelectInterface,
} from 'src/app/interfaces/trex-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.scss'],
})
export class SettingsPopupComponent implements OnInit {
  public form = new FormGroup({
    p1: new FormControl(''),
    p2: new FormControl(''),
    p3: new FormControl(''),
    p4: new FormControl(''),
  });
  public label = '';
  public options: SelectInterface[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private players: PlayersInterface,
    private _dialogRef: MatDialogRef<SettingsPopupComponent>
  ) {}

  ngOnInit(): void {
    this.players && this.patchValue(this.players);
  }

  private patchValue(players: PlayersInterface): void {
    this.form.patchValue({
      p1: players.p1?.trim() ?? '',
      p2: players.p2?.trim() ?? '',
      p3: players.p3?.trim() ?? '',
      p4: players.p4?.trim() ?? '',
    });
  }

  public closeDialog(submitValue?: boolean): void {
    if (submitValue) {
      const players = {
        p1: this.form.value.p1?.trim() ?? '',
        p2: this.form.value.p2?.trim() ?? '',
        p3: this.form.value.p3?.trim() ?? '',
        p4: this.form.value.p4?.trim() ?? '',
      };
      this._dialogRef.close(players);
    } else {
      this._dialogRef.close();
    }
  }
}
