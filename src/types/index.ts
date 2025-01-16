export interface Player {
  id: string;
  name: string;
  points: number;
  groupId: string;
}

export interface Group {
  id: string;
  name: string;
  players: Player[];
  plays: Play[];
}

export interface Play {
  id: string;
  name: string;
  points: number;
  groupId: string;
}

export interface Pair {
  id: string,
  id_partner: string
  group_id: string
}
