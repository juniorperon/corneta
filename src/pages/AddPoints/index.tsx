import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import './styles.css';

const AddPoints: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, plays, players, updatePlayerPoints } = useAppContext(); // Adicione a função para atualizar pontos

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

    // Encontrar a jogada e o jogador selecionados
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
    <div className="add-play-container">
      <h1>Adicionar Pontos - {group?.name || ''}</h1>

      <div className="form-group">
        <label>Jogador</label>
        <select
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="select-input"
        >
          <option value="">Selecione um jogador</option>
          {playersFiltered.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name} ({player.points} pontos)
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Jogada</label>
        <select
          value={playName}
          onChange={(e) => setPlayName(e.target.value)}
          className="select-input"
        >
          <option value="">Selecione uma jogada</option>
          {playsFiltered.map((play) => (
            <option key={play.id} value={play.name}>
              {play.name} ({play.points} pontos)
            </option>
          ))}
        </select>
      </div>

      <Button text="Adicionar Pontos" onClick={handleSubmit} />

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default AddPoints;
