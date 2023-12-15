import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowValueInterface } from 'src/app/interfaces/trex-types';
import { MatDialog } from '@angular/material/dialog';
import { ResetPopupComponent } from '../reset-popup/reset-popup.component';
import { take } from 'rxjs';
import { TrexService } from '../trex.service';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
})
export class TotalComponent {
  @Input() total!: RowValueInterface;

  constructor(private _dialog: MatDialog, private service: TrexService) {}

  public openSettingPopup(): void {
    this._dialog
      .open(ResetPopupComponent, {
        width: '95vw',
        maxWidth: '300px',
        maxHeight: '90vh',
        autoFocus: false,
        restoreFocus: false,
        disableClose: true,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((d) => {
        if (d) {
          this.service.reset(true);
        } else {
          this.service.reset();
        }
      });
  }
}
