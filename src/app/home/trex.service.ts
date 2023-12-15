import { Injectable } from '@angular/core';
import {
  PlayersInterface,
  RowInterface,
  SelectInterface,
  TrexInterface,
  TrexNamesEnum,
  TrexTypeInterface,
  TrexTypesEnum,
} from '../interfaces/trex-types';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable()
export class TrexService {
  private TrexGameTypes: TrexTypeInterface = {
    trex: {
      value: TrexTypesEnum.TREX,
      name: TrexNamesEnum.TREX,
    },
    ltouch: {
      value: TrexTypesEnum.LTOUSH,
      name: TrexNamesEnum.LTOUSH,
    },
    koubba: {
      value: TrexTypesEnum.KOUBBA,
      name: TrexNamesEnum.KOUBBA,
    },
    banet: {
      value: TrexTypesEnum.BANET,
      name: TrexNamesEnum.BANET,
    },
    dinere: {
      value: TrexTypesEnum.DINERE,
      name: TrexNamesEnum.DINERE,
    },
  };

  private _players$: BehaviorSubject<PlayersInterface> = new BehaviorSubject({
    p1: '',
    p2: '',
    p3: '',
    p4: '',
  });
  public players$: Observable<PlayersInterface> = this._players$.asObservable();

  private _game$: BehaviorSubject<TrexInterface> = new BehaviorSubject({
    turn1: {
      row1: { choice: 1, disabled: false },
      row2: { disabled: true },
      row3: { disabled: true },
      row4: { disabled: true },
      row5: { disabled: true },
    },
    turn2: {
      row1: { disabled: true },
      row2: { disabled: true },
      row3: { disabled: true },
      row4: { disabled: true },
      row5: { disabled: true },
    },
    turn3: {
      row1: { disabled: true },
      row2: { disabled: true },
      row3: { disabled: true },
      row4: { disabled: true },
      row5: { disabled: true },
    },
    turn4: {
      row1: { disabled: true },
      row2: { disabled: true },
      row3: { disabled: true },
      row4: { disabled: true },
      row5: { disabled: true },
    },
  } as TrexInterface);
  public game$: Observable<TrexInterface> = this._game$.asObservable();

  constructor() {}

  public reset(players?: boolean) {
    if (players) {
      localStorage.clear();
      this.setPlayers();
    } else {
      localStorage.removeItem('game');
    }
    this._game$.next({
      turn1: {
        row1: { choice: 1, disabled: false },
        row2: { disabled: true },
        row3: { disabled: true },
        row4: { disabled: true },
        row5: { disabled: true },
      },
      turn2: {
        row1: { disabled: true },
        row2: { disabled: true },
        row3: { disabled: true },
        row4: { disabled: true },
        row5: { disabled: true },
      },
      turn3: {
        row1: { disabled: true },
        row2: { disabled: true },
        row3: { disabled: true },
        row4: { disabled: true },
        row5: { disabled: true },
      },
      turn4: {
        row1: { disabled: true },
        row2: { disabled: true },
        row3: { disabled: true },
        row4: { disabled: true },
        row5: { disabled: true },
      },
    });
  }

  public setPlayers(players?: PlayersInterface): void {
    if (players) {
      this._players$.next({
        p1: players.p1?.trim(),
        p2: players.p2?.trim(),
        p3: players.p3?.trim(),
        p4: players.p4?.trim(),
      });
      localStorage.setItem('players', JSON.stringify(players));
    } else {
      try {
        const p = localStorage.getItem('players');
        if (p) {
          const parsed = JSON.parse(p);
          parsed &&
            this._players$.next({
              p1: parsed.p1?.trim(),
              p2: parsed.p2?.trim(),
              p3: parsed.p3?.trim(),
              p4: parsed.p4?.trim(),
            });
        } else {
          this._players$.next({
            p1: '',
            p2: '',
            p3: '',
            p4: '',
          });
        }
      } catch (error) {
        this._players$.next({
          p1: '',
          p2: '',
          p3: '',
          p4: '',
        });
      }
    }
  }

  public getAvailableGameTypes(
    currentChoice?: TrexTypesEnum,
    turnNb?: 1 | 2 | 3 | 4
  ): Promise<SelectInterface[]> {
    return new Promise<SelectInterface[]>((resolve, reject) => {
      this._game$.pipe(take(1)).subscribe((v) => {
        const opt: SelectInterface[] = [];
        const taken: TrexTypesEnum[] = [];
        if (turnNb) {
          const turn = v[`turn${turnNb}`];
          if (turn) {
            Object.keys(turn).forEach((key) => {
              if (
                key === 'row1' ||
                key === 'row2' ||
                key === 'row3' ||
                key === 'row4' ||
                key === 'row5'
              ) {
                const row = turn[key];
                if (row) {
                  row.choice && taken.push(row.choice);
                }
              }
            });
          }
        }

        Object.keys(this.TrexGameTypes).forEach((key) => {
          const obj = this.TrexGameTypes[key];
          if (!taken.includes(obj.value) || obj.value === currentChoice) {
            opt.push({ value: obj.value, name: obj.name });
          }
        });

        resolve(opt);
      });
    });
  }

  public updateGameRow(
    turn: 1 | 2 | 3 | 4,
    row: 1 | 2 | 3 | 4 | 5,
    value: RowInterface,
    enableNext?: boolean
  ): void {
    if (turn && row) {
      this._game$.pipe(take(1)).subscribe(async (v) => {
        const newV = structuredClone(v);
        newV[`turn${turn}`][`row${row}`] = value;
        if (enableNext) {
          if (row < 5) {
            newV[`turn${turn}`][`row${(row + 1) as TrexTypesEnum}`].disabled =
              false;
            const opts = await this.getAvailableGameTypes(undefined, turn);
            opts &&
              (newV[`turn${turn}`][`row${(row + 1) as TrexTypesEnum}`].choice =
                opts[0].value);
          } else if (row === 5 && turn < 4) {
            newV[`turn${(turn + 1) as 1 | 2 | 3 | 4}`][
              `row${1 as TrexTypesEnum}`
            ].disabled = false;
            const opts = await this.getAvailableGameTypes(
              undefined,
              (turn + 1) as 1 | 2 | 3 | 4
            );
            opts &&
              (newV[`turn${(turn + 1) as 1 | 2 | 3 | 4}`][
                `row${1 as TrexTypesEnum}`
              ].choice = opts[0].value);
          }
        }
        this._game$.next(newV);
        localStorage.setItem('game', JSON.stringify(newV));
      });
    }
  }

  initializeGame() {
    const gameStr = localStorage.getItem('game');
    if (gameStr) {
      const game: TrexInterface = JSON.parse(gameStr);
      if (game) {
        this._game$.next(game);
      }
    }
  }
}
