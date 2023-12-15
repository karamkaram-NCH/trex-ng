import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPopupComponent } from '../select-popup/select-popup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { take } from 'rxjs';
import { RowInterface, TrexTypesEnum } from 'src/app/interfaces/trex-types';
import { ChoicePopupComponent } from '../choice-popup/choice-popup.component';
import { TurnService } from '../turn/turn.service';
import { TrexService } from '../trex.service';
@Component({
  selector: 'app-row',
  standalone: true,
  imports: [CommonModule, SelectPopupComponent, MatDialogModule],
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  protected _turnService = inject(TurnService);
  protected _trexService = inject(TrexService);
  @Input() public row!: RowInterface;
  @Input() public rowNb!: 1 | 2 | 3 | 4 | 5;
  @Input() public turn!: 1 | 2 | 3 | 4;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public async openDialog() {
    if (this.row.disabled) return;
    this.dialog
      .open(SelectPopupComponent, {
        width: '95vw',
        maxWidth: '300px',
        maxHeight: '90vh',
        autoFocus: false,
        restoreFocus: false,
        disableClose: true,
        data: await this._trexService.getAvailableGameTypes(
          this.row.choice,
          this.turn
        ),
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((choice?: number) => {
        if (choice) {
          if (choice !== this.row.choice) {
            this.row.p1 = undefined;
            this.row.p2 = undefined;
            this.row.p3 = undefined;
            this.row.p4 = undefined;
          }
          this.row.choice = choice;
          this._trexService.updateGameRow(this.turn, this.rowNb, this.row);
        }
      });
  }

  public openDataDialog(playerNb: 1 | 2 | 3 | 4) {
    if (!this.row.choice) return;
    if (!this.checkForRed() && !this.row[`p${playerNb}`]) return;
    this.dialog
      .open(ChoicePopupComponent, {
        width: '95vw',
        maxWidth: '300px',
        maxHeight: '90vh',
        autoFocus: false,
        restoreFocus: false,
        disableClose: true,
        data: {
          type: this.row.choice,
          row: this.row,
          playerNb,
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((choice?: number) => {
        if (choice !== undefined && choice !== null) {
          this.row[`p${playerNb}`] = choice;
          let enableNext = false;
          if (this.checkForEmpty()) {
            enableNext = true;
            if (!this.row.p1) {
              this.row.p1 = 0;
            }
            if (!this.row.p2) {
              this.row.p2 = 0;
            }
            if (!this.row.p3) {
              this.row.p3 = 0;
            }
            if (!this.row.p4) {
              this.row.p4 = 0;
            }
            this.row.disabled = true;
          }
          this._trexService.updateGameRow(
            this.turn,
            this.rowNb,
            this.row,
            enableNext
          );
        } else if (choice === null) {
          this.row[`p${playerNb}`] = 0;
          this._trexService.updateGameRow(this.turn, this.rowNb, this.row);
        }
      });
  }

  private checkForEmpty(): boolean {
    if (this.row.choice === TrexTypesEnum.BANET) {
      return this._turnService.calculateTotal(this.row) === -100;
    } else if (this.row.choice === TrexTypesEnum.DINERE) {
      return this._turnService.calculateTotal(this.row) === -130;
    } else if (this.row.choice === TrexTypesEnum.KOUBBA) {
      return this._turnService.calculateTotal(this.row) === -75;
    } else if (this.row.choice === TrexTypesEnum.LTOUSH) {
      return this._turnService.calculateTotal(this.row) === -195;
    } else if (this.row.choice === TrexTypesEnum.TREX) {
      return this._turnService.calculateTotal(this.row) === 500;
    } else return false;
  }

  public checkForRed(): boolean {
    if (this.row.choice === TrexTypesEnum.BANET) {
      return this._turnService.calculateTotal(this.row) !== -100;
    } else if (this.row.choice === TrexTypesEnum.DINERE) {
      return this._turnService.calculateTotal(this.row) !== -130;
    } else if (this.row.choice === TrexTypesEnum.KOUBBA) {
      return this._turnService.calculateTotal(this.row) !== -75;
    } else if (this.row.choice === TrexTypesEnum.LTOUSH) {
      return this._turnService.calculateTotal(this.row) !== -195;
    } else if (this.row.choice === TrexTypesEnum.TREX) {
      return this._turnService.calculateTotal(this.row) !== 500;
    } else {
      return false;
    }
  }
}
