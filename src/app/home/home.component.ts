import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnComponent } from './turn/turn.component';
import { PlayersComponent } from './players/players.component';
import { TrexService } from './trex.service';
import { TotalComponent } from './total/total.component';
import {
  PlayersInterface,
  RowInterface,
  TrexInterface,
  TurnInterface,
} from '../interfaces/trex-types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TurnComponent, PlayersComponent, TotalComponent],
  providers: [TrexService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _trexService = inject(TrexService);
  public game?: TrexInterface;

  public players: PlayersInterface = {
    p1: 'Player 1',
    p2: 'Player 2',
    p3: 'Player 3',
    p4: 'Player 4',
  };

  public total: RowInterface = {};

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this._trexService.setPlayers();
    this._trexService.initializeGame();
    this._trexService.players$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((v) => (this.players = v));
    this._trexService.game$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((v) => {
        this.game = v;
        this.total = this.calculateTotal();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  calculateTotal(): RowInterface {
    const total: any = {
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
    };
    if (this.game) {
      Object.keys(this.game).forEach((key) => {
        if (
          key &&
          (key === 'turn1' ||
            key === 'turn2' ||
            key === 'turn3' ||
            key === 'turn4')
        ) {
          const turn: TurnInterface = this.game
            ? this.game[key]
            : { row1: {}, row2: {}, row3: {}, row4: {}, row5: {} };
          Object.keys(turn).forEach((str) => {
            if (
              str &&
              (str === 'row1' ||
                str === 'row2' ||
                str === 'row3' ||
                str === 'row4' ||
                str === 'row5')
            ) {
              const row: RowInterface = turn[str];
              if (row && total) {
                total.p1 = total.p1 + (row.p1 ? row.p1 : 0);
                total.p2 = total.p2 + (row.p2 ? row.p2 : 0);
                total.p3 = total.p3 + (row.p3 ? row.p3 : 0);
                total.p4 = total.p4 + (row.p4 ? row.p4 : 0);
              }
            }
          });
        }
      });
    }
    return total;
  }
}
