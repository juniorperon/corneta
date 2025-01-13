import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import './styles.css';
import { useAppContext } from '../../context/AppContext';

const AddPlayer: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, players } = useAppContext();

  const playersFiltered = players.filter((player) => player.groupId === groupId);

  const group = groups.find((group) => group.id === groupId);
  const [playerName, setPlayerName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = () => {
    console.log(`Adicionando jogador: ${playerName} ao grupo ${group?.name}`);
    navigate(`/group/${groupId}`);
  };

  const filteredPlayers = playersFiltered.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="add-player-container">
      <h1>Adicionar Jogador - {group?.name || ''}</h1>

      <input
        type="text"
        placeholder="Nome do Jogador"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <Button
        text="Adicionar Jogador"
        onClick={handleSubmit}
      />

      <h2>Lista de Jogadores</h2>
      <input
        type="text"
        placeholder="Pesquisar Jogadores"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <ul className="player-list">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <li key={player.id} className="player-item">
              {player.name}
            </li>
          ))
        ) : (
          <li>Nenhum jogador encontrado.</li>
        )}
      </ul>

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default AddPlayer;
