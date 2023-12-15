import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPopupComponent } from '../select-popup/select-popup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { take } from 'rxjs';
import { RowInterface, TrexTypesEnum } from 'src/app/interfaces/trex-types';
import { TrexService } from '../trex.service';
import { ChoicePopupComponent } from '../choice-popup/choice-popup.component';
@Component({
  selector: 'app-row',
  standalone: true,
  imports: [CommonModule, SelectPopupComponent, MatDialogModule],
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  protected _trexService = inject(TrexService);
  @Input() public row!: RowInterface;
  @Input() public turn!: 1 | 2 | 3 | 4;
  public disableSelect = false;

  public choice?: TrexTypesEnum;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.row.selectedOption) {
      this.choice = this.row.selectedOption;
      this.disableSelect = this.checkForRed();
    }
  }

  public openDialog() {
    if (this.disableSelect) return;
    this.dialog
      .open(SelectPopupComponent, {
        width: '95vw',
        maxWidth: '300px',
        maxHeight: '90vh',
        autoFocus: false,
        restoreFocus: false,
        disableClose: true,
        data: this._trexService.getAvailableGameTypes(this.turn),
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((choice?: number) => {
        if (choice) {
          if (choice !== this.choice) {
            this.row.p1 = undefined;
            this.row.p2 = undefined;
            this.row.p3 = undefined;
            this.row.p4 = undefined;
          }
          this.choice = choice;
          this.row.selectedOption = choice;
        }
      });
  }

  public openDataDialog(playerNb: 1 | 2 | 3 | 4) {
    if (this.disableSelect || !this.row.selectedOption) return;

    this.dialog
      .open(ChoicePopupComponent, {
        width: '95vw',
        maxWidth: '300px',
        maxHeight: '90vh',
        autoFocus: false,
        restoreFocus: false,
        disableClose: true,
        data: {
          type: this.choice,
          row: this.row,
          playerNb,
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((choice?: number) => {
        if (choice !== undefined) {
          this.row[`p${playerNb}`] = choice;
        } else if (choice === null) {
          this.row[`p${playerNb}`] = undefined;
        }
      });
  }

  public checkForRed(): boolean {
    if (this.row.selectedOption === TrexTypesEnum.BANET) {
      this.disableSelect = this.calculateTotal() === 100;
    } else if (this.row.selectedOption === TrexTypesEnum.DINERE) {
      this.disableSelect = this.calculateTotal() === 130;
    } else if (this.row.selectedOption === TrexTypesEnum.KOUBBA) {
      this.disableSelect = this.calculateTotal() === 75;
    } else if (this.row.selectedOption === TrexTypesEnum.LTOUSH) {
      this.disableSelect = this.calculateTotal() === 195;
    } else if (this.row.selectedOption === TrexTypesEnum.TREX) {
      this.disableSelect = this.calculateTotal() === 500;
    } else {
      this.disableSelect = false;
    }
    return this.disableSelect;
  }

  private calculateTotal() {
    let total = 0;
    total += this.row.p1 ?? 0;
    total += this.row.p2 ?? 0;
    total += this.row.p3 ?? 0;
    total += this.row.p4 ?? 0;
    console.log(this.disableSelect);
    return total;
  }
}
