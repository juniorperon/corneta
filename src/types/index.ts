export interface Player {
  id: number;
  name: string;
  points: number;
  groupId: string;
}

export interface Group {
  id: number;
  name: string;
  players: Player[];
  plays: Play[];
}

export interface Play {
  id: number;
  name: string;
  points: number;
  groupId: string;
}

export interface Pair {
  id: number,
  idPartner: string
  groupId: string
}
