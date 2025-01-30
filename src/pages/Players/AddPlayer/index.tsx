import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import './styles.css';
import CardPlayer from '../../../components/CardPlayer';
import { api } from '../../../services/api';
import { Group, Player } from '../../../types';
import Input from '../../../components/Input';

const AddPlayer: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [group, setGroup] = useState<Group | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    setLoading(true);
    try {
      const response = await api.get('/group/listGroups');

      const selectedGroup = response.data.data.find((g: Group) => g.id === Number(groupId));
      setGroup(selectedGroup);

      if (selectedGroup) {
        getPlayers(Number(groupId));
      }

      console.log(`Grupos carregados com sucesso!`);
    } catch (error) {
      console.error('Erro ao buscar grupos. Tente novamente.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlayers(Number(groupId));
  }, []);

  const getPlayers = async (groupId: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/player/listPlayers/${groupId}`);
      setPlayers(response.data.data);

      console.log(`Jogadores carregados com sucesso!`);
    } catch (error) {
      console.error('Erro ao buscar jogadores. Tente novamente.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/player/addPlayer', { name: playerName, groupId, points: 0 });

      setMessage(`${playerName} foi adicionado com sucesso!`);
      setPlayerName('');
      getPlayers(Number(groupId));
    } catch (error) {
      setMessage('Erro ao adicionar jogador. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="add-player-container">
      <h1>Adicionar Jogador - {group?.name || ''}</h1>

      <Input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder='Digite o nome do jogador' />

      <Button
        text="Adicionar Jogador"
        onClick={handleSubmit}
      />
      {message && (
        <p className={message.includes('sucesso') ? 'success' : 'error'}>{message}</p>
      )}

      <h2>Lista de Jogadores</h2>
      <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Pesquisar jogador' />

      <ul className="player-list">
        {filteredPlayers.length && !loading ? (
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
