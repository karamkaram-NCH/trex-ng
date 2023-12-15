import { Injectable } from '@angular/core';
import {
  RowInterface,
  TrexNamesEnum,
  TrexTypeInterface,
  TrexTypesEnum,
  TurnInterface,
} from '../../interfaces/trex-types';

@Injectable()
export class TurnService {
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

  private availableTurns: TrexTypesEnum[] = [1, 2, 3, 4, 5];

  constructor() {}

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

  public updateTakenTurns(turn: TurnInterface): void {
    if (turn) {
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
          if (row) {
            if (this.calculateTotal(row) === -100) {
              this.availableTurns.splice(TrexTypesEnum.BANET);
            } else if (this.calculateTotal(row) === -130) {
              this.availableTurns.splice(TrexTypesEnum.DINERE);
            } else if (this.calculateTotal(row) === -75) {
              this.availableTurns.splice(TrexTypesEnum.KOUBBA);
            } else if (this.calculateTotal(row) === -195) {
              this.availableTurns.splice(TrexTypesEnum.LTOUSH);
            } else if (this.calculateTotal(row) === 500) {
              this.availableTurns.splice(TrexTypesEnum.TREX);
            }
          }
        }
      });
    }
  }

  public calculateTotal(row: RowInterface) {
    let total = 0;
    total += row.p1 ?? 0;
    total += row.p2 ?? 0;
    total += row.p3 ?? 0;
    total += row.p4 ?? 0;
    return total;
  }
}
