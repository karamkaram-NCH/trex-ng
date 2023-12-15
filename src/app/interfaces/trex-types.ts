export interface SelectInterface {
  name: string;
  value: number;
}

export interface TrexTypeInterface {
  [key: string]: { value: TrexTypesEnum; name: string };
}

export interface RowInterface {
  choice?: TrexTypesEnum;
  disabled?: boolean;
  p1?: number;
  p2?: number;
  p3?: number;
  p4?: number;
}

export interface TurnInterface {
  row1: RowInterface;
  row2: RowInterface;
  row3: RowInterface;
  row4: RowInterface;
  row5: RowInterface;
}
export interface PlayersInterface {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

export interface TrexInterface {
  turn1: TurnInterface;
  turn2: TurnInterface;
  turn3: TurnInterface;
  turn4: TurnInterface;
}

export enum TrexTypesEnum {
  TREX = 1,
  LTOUSH = 2,
  KOUBBA = 3,
  BANET = 4,
  DINERE = 5,
}

export enum TrexNamesEnum {
  TREX = 'Trex',
  LTOUSH = 'Ltouch',
  KOUBBA = 'Koubba',
  BANET = 'Banet',
  DINERE = 'Dinere',
}
