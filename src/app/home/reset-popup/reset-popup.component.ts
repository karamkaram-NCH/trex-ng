import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './reset-popup.component.html',
  styleUrls: ['./reset-popup.component.scss'],
})
export class ResetPopupComponent {
  public form = new FormGroup({
    players: new FormControl(false),
  });

  constructor(private _dialogRef: MatDialogRef<ResetPopupComponent>) {}

  public closeDialog(): void {
    if (this.form.value.players) {
      this._dialogRef.close(true);
    } else {
      this._dialogRef.close();
    }
  }
}
