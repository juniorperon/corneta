import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Group, Play, Player } from '../types';

interface AppContextData {
  groups: Group[];
  plays: Play[];
  players: Player[];
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
    { id: '6', name: 'Ponto de Serviço', points: 10, groupId: '3' },
    { id: '7', name: 'Falta no Serviço', points: -2, groupId: '3' },
    { id: '8', name: 'Smash', points: 15, groupId: '3' },
  ]);

  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Jogador 1', points: 100, groupId: '1' },
    { id: '2', name: 'Jogador 2', points: 200, groupId: '1' },
    { id: '3', name: 'Jogador 3', points: 300, groupId: '2' },
    { id: '4', name: 'Jogador 4', points: 400, groupId: '2' },
    { id: '5', name: 'Jogador 5', points: 500, groupId: '3' },
    { id: '6', name: 'Jogador 6', points: 600, groupId: '3' },
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
    <AppContext.Provider value={{ groups, plays, players, addPlay, getPlaysByGroup, updatePlayerPoints }}>
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
