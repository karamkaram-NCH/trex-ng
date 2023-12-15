import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnComponent } from './turn/turn.component';
import { PlayersComponent } from './players/players.component';
import { TrexService } from './trex.service';
import { TotalComponent } from './total/total.component';
import { PlayersInterface } from '../interfaces/trex-types';
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
  public game = this._trexService.game();

  public players: PlayersInterface = {
    p1: 'Player 1',
    p2: 'Player 2',
    p3: 'Player 3',
    p4: 'Player 4',
  };

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this._trexService.setPlayers();
    this._trexService.players$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((v) => (this.players = v));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
