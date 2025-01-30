import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Group, Pair, Play, Player } from '../types';

interface AppContextData {
  groups: Group[];
  plays: Play[];
  players: Player[];
  pairs: Pair[];
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plays, setPlays] = useState<Play[]>([

  ]);

  const [players, setPlayers] = useState<Player[]>([
  ]);

  const [pairs, setPairs] = useState<Pair[]>([

  ]);

  const [groups, setGroups] = useState<Group[]>([]);

  // const addPlay = (play: Play, groupId: string) => {
  //   setGroups((prevGroups) =>
  //     prevGroups.map((group) => {
  //       if (group.id === groupId) {
  //         return {
  //           ...group,
  //           players: group.players.map((player) => {
  //             if (player.groupId === group.id) {
  //               return {
  //                 ...player,
  //                 points: player.points + play.points,
  //               };
  //             }
  //             return player;
  //           }),
  //           plays: [...group.plays, play],
  //         };
  //       }
  //       return group;
  //     })
  //   );
  //   setPlays((prevPlays) => [...prevPlays, { ...play, id: `${Date.now()}` }]);
  // };

  // const getPlaysByGroup = (groupId: string) => {
  //   return plays.filter((play) => play.groupId === groupId);
  // };

  // const updatePlayerPoints = (playerId: string, points: number) => {
  //   setPlayers((prevPlayers) =>
  //     prevPlayers.map((player) =>
  //       player.id === playerId
  //         ? { ...player, points: player.points + points }
  //         : player
  //     )
  //   );
  // };

  return (
    <AppContext.Provider value={{ groups, plays, players, pairs }}>
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
