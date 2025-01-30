import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import './styles.css';
import CardPlayer from '../../../components/CardPlayer';
import { api } from '../../../services/api';
import { Player } from '../../../types';

const AddPlayer: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups } = useAppContext();

  // const group = groups.find((group) => group.id === groupId);
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/player/listPLayers');
      setPlayers(response.data.data);
      console.log(response.data.data)
      // const playersFiltered = players.filter((player) => player.groupId === groupId);

      setMessage(`Jogadores carregados com sucesso!`);
    } catch (error) {
      setMessage('Erro ao buscar jogadores. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/player/addPlayer', { name: playerName, groupId, points: 0 });

      // setMessage(`Jogador: ${playerName} Adicionado ao grupo: ${group?.name}!`);
    } catch (error) {
      setMessage('Erro ao adicionar jogador. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // const filteredPlayers = playersFiltered.filter((player) =>
  //   player.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="add-player-container">
      {/* <h1>Adicionar Jogador - {group?.name || ''}</h1> */}

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

      {/* <ul className="player-list">
        {players.length > 0 ? (
          players.map((player) => (
            <CardPlayer key={player.id} id={player.id} name={player.name} />
          ))
        ) : (
          <p style={{ padding: '8px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Nenhum jogador encontrado.</p>
        )}
      </ul> */}

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default AddPlayer;
