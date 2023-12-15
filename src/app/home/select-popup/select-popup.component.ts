import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectInterface } from 'src/app/interfaces/trex-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-popup',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './select-popup.component.html',
  styleUrls: ['./select-popup.component.scss'],
})
export class SelectPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public options: SelectInterface[],
    private _dialogRef: MatDialogRef<SelectPopupComponent>
  ) {}

  public closeDialog(choice?: number): void {
    this._dialogRef.close(choice);
  }
}
