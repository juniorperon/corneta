import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import './styles.css';
import CardPlayer from '../../components/CardPlayer';

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
            <CardPlayer key={player.id} id={player.id} name={player.name} />
          ))
        ) : (
          <p style={{ padding: '8px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Nenhum jogador encontrado.</p>
        )}
      </ul>

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default AddPlayer;
