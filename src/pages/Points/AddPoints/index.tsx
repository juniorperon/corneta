import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import './styles.css';
import { Group, Play, Player } from '../../../types';
import { api } from '../../../services/api';


const AddPoints: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [playerId, setPlayerId] = useState('')
  const [playId, setPlayId] = useState('')
  const [playName, setPlayName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [plays, setPlays] = useState<Play[]>([]);
  const [group, setGroup] = useState<Group | null>(null);
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
        getPlays(Number(groupId));
      }

    } catch (error) {
      console.error('Erro ao buscar grupos. Tente novamente.', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlayers = async (groupId: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/player/listPlayers/${groupId}`);
      setPlayers(response.data.data);

    } catch (error) {
      console.error('Erro ao buscar jogadores. Tente novamente.', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlays = async (groupId: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/play/listPlays/${groupId}`);
      setPlays(response.data.data);

    } catch (error) {
      console.error('Erro ao buscar jogadas. Tente novamente.', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePlayerPoints = async (playerId: number, points: number) => {
    setLoading(true);
    try {
      await api.post(`/player/addPointsToPlayer`, { playerId, points });

    } catch (error) {
      setMessage('Erro ao adicionar pontos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!playId || playerId === null) {
      setMessage('Por favor, selecione um jogador e uma jogada.');
      return;
    }

    const selectedPlay = plays.find((play) => play.id === Number(playId));
    const selectedPlayer = players.find((player) => player.id === Number(playerId));

    if (selectedPlay && selectedPlayer) {
      updatePlayerPoints(selectedPlayer.id, selectedPlay.points);
      setMessage(`${selectedPlayer.name} fez a jogada ${selectedPlay.name} e foi acrescentado ${selectedPlay.points} pontos com sucesso!`);
    } else {
      setMessage('Jogada ou jogador inválido.');
    }
  };



  return (
    <div className="add-points-container">
      <h1>Adicionar Pontos - {group?.name || ''}</h1>

      <div className="form-group">
        <label>Jogador</label>
        <Select
          options={players.map((player) => ({
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
          options={plays.map((play) => ({
            value: play.id,
            label: `${play.name} (${play.points} pontos)`,
          }))}
          value={playId}
          onChange={(e) => setPlayId(e.target.value)}
          placeholder="Selecione uma jogada"
        />
      </div>

      {message && (
        <p className={message.includes('sucesso') ? 'success' : 'error'}>{message}</p>
      )}

      <Button text="Adicionar Pontos" onClick={handleSubmit} />

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default AddPoints;
