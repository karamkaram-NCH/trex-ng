import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersInterface } from 'src/app/interfaces/trex-types';
import { MatDialog } from '@angular/material/dialog';
import { SettingsPopupComponent } from '../settings-popup/settings-popup.component';
import { TrexService } from '../trex.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent {
  @Input() public players!: PlayersInterface;

  constructor(private _dialog: MatDialog, private service: TrexService) {}

  public openSettingPopup(): void {
    this._dialog
      .open(SettingsPopupComponent, {
        width: '95vw',
        maxWidth: '300px',
        maxHeight: '90vh',
        autoFocus: false,
        restoreFocus: false,
        disableClose: true,
        data: this.players,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.service.setPlayers(data);
        }
      });
  }
}
