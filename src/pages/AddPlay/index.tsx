import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Group, Play } from '../../types';
import BackButton from '../../components/backButton';

const AddPlay: React.FC = () => {
  const { groups, addPlay, plays, players } = useAppContext();
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedPlay, setSelectedPlay] = useState<string>('');

  const handleAddPlay = () => {
    if (selectedGroupId && selectedPlay) {
      const play = plays.find((p) => p.name === selectedPlay);
      if (play) {
        const newPlay: Play = {
          id: `${Date.now()}`,
          name: play.name,
          points: play.points,
          groupId: selectedGroupId,
        };
        addPlay(newPlay, selectedGroupId);
      }
    }
  };

  return (
    <div>
      <h2>Adicionar Jogada</h2>

      <BackButton />

      <div>
        <label>Grupo</label>
        <select value={selectedGroupId} onChange={(e) => setSelectedGroupId(e.target.value)}>
          <option value="">Selecione um grupo</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Jogada</label>
        <select value={selectedPlay} onChange={(e) => setSelectedPlay(e.target.value)}>
          <option value="">Selecione uma jogada</option>
          {plays.map((play) => (
            <option key={play.name} value={play.name}>
              {play.name} ({play.points} pontos)
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAddPlay}>Adicionar Jogada</button>
    </div>
  );
};

export default AddPlay;
