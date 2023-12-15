import { Injectable, signal } from '@angular/core';
import {
  PlayersInterface,
  SelectInterface,
  TrexInterface,
  TrexNamesEnum,
  TrexTypeInterface,
  TrexTypesEnum,
} from '../interfaces/trex-types';
import { BehaviorSubject, Observable } from 'rxjs';

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

  public game = signal<TrexInterface>(initialTrex);
  private _players$: BehaviorSubject<PlayersInterface> = new BehaviorSubject({
    p1: '',
    p2: '',
    p3: '',
    p4: '',
  });
  public players$: Observable<PlayersInterface> = this._players$.asObservable();

  constructor() {}

  public reset(players?: boolean) {
    if (players) {
      localStorage.clear();
      this.setPlayers();
    } else {
      localStorage.removeItem('game');
    }
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

  public getAvailableGameTypes(turn: 1 | 2 | 3 | 4): SelectInterface[] {
    const opt: SelectInterface[] = [];
    const availableOptions = this.game()[`turn${turn}`].options;
    Object.keys(this.TrexGameTypes).forEach((key) => {
      const obj = this.TrexGameTypes[key];
      if (availableOptions.includes(obj.value)) {
        opt.push({ value: obj.value, name: obj.name });
      }
    });
    return opt;
  }

  public getTurnName(gameValue?: TrexTypesEnum): string {
    let name = '';
    gameValue &&
      Object.keys(this.TrexGameTypes).forEach((key) => {
        const obj = this.TrexGameTypes[key];
        if (obj.value === gameValue) {
          name = obj.name;
        }
      });
    return name;
  }
}

const initialTrex: TrexInterface = {
  players: {
    p1: 'Player 1',
    p2: 'Player 2',
    p3: 'Player 3',
    p4: 'Player 4',
  },
  turn1: {
    options: [1, 2, 3, 4, 5],
    row1: { selectedOption: 1 },
    row2: {},
    row3: {},
    row4: {},
    row5: {},
    value: { p1: 0, p2: 0, p3: 0, p4: 0, total: 0 },
  },
  turn2: {
    options: [1, 2, 3, 4, 5],
    row1: {},
    row2: {},
    row3: {},
    row4: {},
    row5: {},
    value: { p1: 0, p2: 0, p3: 0, p4: 0, total: 0 },
  },
  turn3: {
    options: [1, 2, 3, 4, 5],
    row1: {},
    row2: {},
    row3: {},
    row4: {},
    row5: {},
    value: { p1: 0, p2: 0, p3: 0, p4: 0, total: 0 },
  },
  turn4: {
    options: [1, 2, 3, 4, 5],
    row1: {},
    row2: {},
    row3: {},
    row4: {},
    row5: {},
    value: { p1: 0, p2: 0, p3: 0, p4: 0, total: 0 },
  },
  total: {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    total: 0,
  },
};
