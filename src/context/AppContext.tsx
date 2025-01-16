import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Group, Pair, Play, Player } from '../types';

interface AppContextData {
  groups: Group[];
  plays: Play[];
  players: Player[];
  pairs: Pair[];
  addPlay: (play: Play, groupId: string) => void;
  getPlaysByGroup: (groupId: string) => Play[];
  updatePlayerPoints: (playerId: string, points: number) => void;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plays, setPlays] = useState<Play[]>([
    { id: '1', name: 'Ponto de Serviço', points: 10, groupId: '1' },
    { id: '2', name: 'Devolução', points: 5, groupId: '1' },
    { id: '3', name: 'Voleio', points: 8, groupId: '1' },
    { id: '4', name: 'Smash', points: 12, groupId: '2' },
    { id: '5', name: 'Erro não forçado', points: -5, groupId: '2' },
    { id: '6', name: 'A la isolada', points: -10, groupId: '3' },
    { id: '7', name: 'Jogada trapalhões', points: -5, groupId: '3' },
    { id: '8', name: 'Franguinho', points: -10, groupId: '3' },
    { id: '9', name: 'Peixe na areia', points: -10, groupId: '3' },
    { id: '10', name: 'Tirando a camiseta', points: -10, groupId: '3' },
  ]);

  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Jogador 1', points: 100, groupId: '1' },
    { id: '2', name: 'Jogador 2', points: 200, groupId: '1' },
    { id: '3', name: 'Jogador 3', points: 300, groupId: '2' },
    { id: '4', name: 'Jogador 4', points: 400, groupId: '2' },
    { id: '5', name: 'Lucas Metedieri', points: 500, groupId: '3' },
    { id: '6', name: 'Sandro', points: 600, groupId: '3' },
    { id: '7', name: 'Peron', points: 200, groupId: '3' },
    { id: '8', name: 'João Brides', points: 200, groupId: '3' },
    { id: '9', name: 'Gabriel Chiu', points: 200, groupId: '3' },
    { id: '10', name: 'Giussepi', points: 200, groupId: '3' },
    { id: '11', name: 'Leandro Moglia', points: 200, groupId: '3' },
    { id: '12', name: 'Alisson Marchetta', points: 200, groupId: '3' },
    { id: '13', name: 'Gustavo Melhorini', points: 200, groupId: '3' },
    { id: '14', name: 'Leandro Tete', points: 200, groupId: '3' },
    { id: '15', name: 'Rodrigo Mosca', points: 200, groupId: '3' },
    { id: '16', name: 'Fefe', points: 200, groupId: '3' },
    { id: '17', name: 'Enrico Versolato', points: 200, groupId: '3' },
    { id: '18', name: 'Mazinho', points: 200, groupId: '3' },
  ]);

  const [pairs, setPairs] = useState<Pair[]>([
    { id: '5', id_partner: '6', group_id: '3' },
    { id: '5', id_partner: '7', group_id: '3' },
    { id: '5', id_partner: '8', group_id: '3' },
    { id: '7', id_partner: '8', group_id: '3' },
    { id: '9', id_partner: '10', group_id: '3' },
    { id: '11', id_partner: '12', group_id: '3' },
    { id: '13', id_partner: '14', group_id: '3' },
    { id: '15', id_partner: '16', group_id: '3' },
    { id: '17', id_partner: '18', group_id: '3' },
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Amigos CCS',
      players,
      plays
    },
    {
      id: '2',
      name: 'Galo da Madrugada',
      players,
      plays
    },
    {
      id: '3',
      name: 'Panelas BT',
      players,
      plays
    },
  ]);

  const addPlay = (play: Play, groupId: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            players: group.players.map((player) => {
              if (player.groupId === group.id) {
                return {
                  ...player,
                  points: player.points + play.points,
                };
              }
              return player;
            }),
            plays: [...group.plays, play],
          };
        }
        return group;
      })
    );
    setPlays((prevPlays) => [...prevPlays, { ...play, id: `${Date.now()}` }]);
  };

  const getPlaysByGroup = (groupId: string) => {
    return plays.filter((play) => play.groupId === groupId);
  };

  const updatePlayerPoints = (playerId: string, points: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? { ...player, points: player.points + points }
          : player
      )
    );
  };

  return (
    <AppContext.Provider value={{ groups, plays, players, addPlay, getPlaysByGroup, updatePlayerPoints, pairs }}>
      {children}
    </AppContext.Provider>
  );
};



export const useAppContext = (): AppContextData => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
