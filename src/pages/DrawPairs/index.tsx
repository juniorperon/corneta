import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Select from '../../components/Select';
import { FaTrashAlt } from 'react-icons/fa'; // Ícone de lixo
import './styles.css';

const DrawPairs: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { players } = useAppContext();

  const playersFiltered = players.filter((player) => player.groupId === groupId);

  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const handleAddPlayer = () => {
    if (selectedPlayer && !selectedPlayers.includes(selectedPlayer)) {
      setSelectedPlayers((prev) => [...prev, selectedPlayer]);
      setSelectedPlayer('');
    }
  };

  const handleRemovePlayer = (player: string) => {
    setSelectedPlayers((prev) => prev.filter((p) => p !== player));
  };

  const handleDrawPairs = () => {
    if (selectedPlayers.length < 2) {
      alert('Adicione pelo menos dois jogadores para realizar o sorteio.');
      return;
    }
    const shuffled = [...selectedPlayers].sort(() => Math.random() - 0.5);
    const pairs = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      pairs.push(shuffled.slice(i, i + 2));
    }
    console.log('Sorteio de pares:', pairs);
  };

  return (
    <div className="draw-pairs-container">
      <h1>Sorteio de Duplas</h1>

      <div className="form-group">
        <label>Jogador</label>
        <Select
          options={playersFiltered.map((player) => ({
            value: player.name,
            label: `${player.name} (${player.points} pontos)`,
          }))}
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          placeholder="Selecione um jogador"
        />
        <Button text="Adicionar Jogador" onClick={handleAddPlayer} />
      </div>

      <div className="selected-players">
        <h2>Jogadores Selecionados</h2>
        <ul>
          {selectedPlayers.map((player) => (
            <li key={player}>
              {player}
              <FaTrashAlt
                style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => handleRemovePlayer(player)}
              />
            </li>
          ))}
        </ul>
      </div>

      <Button text="Sortear Duplas" onClick={handleDrawPairs} />

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default DrawPairs;
