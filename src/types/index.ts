export interface Player {
  id: number;
  name: string;
  points: number;
  groupId: number;
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
  groupId: number;
}

export interface Pair {
  id: number,
  playerId: number,
  partnerId: number
  groupId: number
}
