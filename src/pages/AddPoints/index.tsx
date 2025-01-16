import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Select from '../../components/Select';
import './styles.css';

const AddPoints: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, plays, players, updatePlayerPoints } = useAppContext();

  const playsFiltered = plays.filter((play) => play.groupId === groupId);
  const playersFiltered = players.filter((player) => player.groupId === groupId);

  const group = groups.find((group) => group.id === groupId);
  const [playName, setPlayName] = useState('');
  const [playerId, setPlayerId] = useState('');

  const handleSubmit = () => {
    if (!playName || !playerId) {
      alert('Por favor, selecione um jogador e uma jogada.');
      return;
    }

    const selectedPlay = playsFiltered.find((play) => play.name === playName);
    const selectedPlayer = playersFiltered.find((player) => player.id === playerId);

    if (selectedPlay && selectedPlayer) {
      updatePlayerPoints(selectedPlayer.id, selectedPlay.points);

      alert(`${selectedPlayer.name} fez a jogada ${selectedPlay.name} e levou ${selectedPlay.points} pontos!`);
      navigate(`/group/${groupId}`);
    } else {
      alert('Jogada ou jogador inválido.');
    }
  };

  return (
    <div className="add-points-container">
      <h1>Adicionar Pontos - {group?.name || ''}</h1>

      <div className="form-group">
        <label>Jogador</label>
        <Select
          options={playersFiltered.map((player) => ({
            value: player.id,
            label: `${player.name} (${player.points} pontos)`,
          }))}
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Selecione um jogador"
        />
      </div>

      <div className="form-group">
        <label>Jogada</label>
        <Select
          options={playsFiltered.map((play) => ({
            value: play.name,
            label: `${play.name} (${play.points} pontos)`,
          }))}
          value={playName}
          onChange={(e) => setPlayName(e.target.value)}
          placeholder="Selecione uma jogada"
        />
      </div>

      <Button text="Adicionar Pontos" onClick={handleSubmit} />

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default AddPoints;
