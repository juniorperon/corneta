import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import './styles.css';
import { api } from '../../../services/api';
import { Group, Play } from '../../../types';

const AddPlay: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState<Group | null>(null);
  const [playName, setPlayName] = useState('');
  const [playPoint, setPlayPoint] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [plays, setPlays] = useState<Play[]>([]);
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
      setGroup(selectedGroup || null);

      if (selectedGroup) {
        getPlays(selectedGroup.id);
      }

    } catch (error) {
      console.error('Erro ao buscar grupos. Tente novamente.', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlays = async (groupId: number) => {
    try {
      const response = await api.get(`/play/listPlays/${groupId}`);
      response.data.data.sort((a: any, b: any) => a.points - b.points)
      setPlays(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/play/addPlay', { name: playName, groupId, points: playPoint });

      setMessage(`${playName} foi adicionado com sucesso!`);
      setPlayName('');
      getPlays(Number(groupId));
    } catch (error) {
      setMessage('Erro ao adicionar jogada. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPlayers = plays.filter((play) =>
    play.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="add-play-container">
      <h1>Adicionar Jogada - {group?.name || ''}</h1>

      <input
        type="text"
        placeholder="Nome da Jogada"
        value={playName}
        onChange={(e) => setPlayName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Pontos da Jogada"
        value={playPoint}
        onChange={(e) => setPlayPoint(e.target.value)}
      />

      <Button
        text="Adicionar Jogada"
        onClick={handleSubmit}
      />

      {message && (
        <p className={message.includes('sucesso') ? 'success' : 'error'}>{message}</p>
      )}

      <h2>Lista de Jogadas</h2>
      <input
        type="text"
        placeholder="Pesquisar Jogada"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <ul className="play-list">
        {filteredPlayers.length && !loading ? (
          filteredPlayers.map((play) => (
            <li key={play.id} className="play-item">
              <span>{play.name}</span>
              <span>{play.points} pontos</span>
            </li>
          ))
        ) : (
          <p style={{ padding: '8px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Nenhum jogador encontrado.</p>
        )}
      </ul>

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default AddPlay;
