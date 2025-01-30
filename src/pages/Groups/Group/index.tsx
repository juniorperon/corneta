import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import './styles.css';
import Button from '../../../components/Button';
import { api } from '../../../services/api';
import { Player, Group } from '../../../types';

const GroupPage: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [group, setGroup] = useState<Group | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    setLoading(true);
    try {
      const response = await api.get('/group/listGroups');
      setGroups(response.data.data);

      const selectedGroup = response.data.data.find((g: Group) => g.id === Number(groupId));
      setGroup(selectedGroup || null);

      if (selectedGroup) {
        getPlayers(selectedGroup.id);
      }

      setMessage(`Grupos carregados com sucesso!`);
    } catch (error) {
      setMessage('Erro ao buscar grupos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getPlayers = async (groupId: number) => {
    try {
      const response = await api.get(`/player/listPlayers/${groupId}`);
      response.data.data.sort((a: any, b: any) => a.points - b.points)
      setPlayers(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
    }
  };

  if (!group) return <p>Grupo não encontrado</p>;


  return (
    <div className="group-container">
      <h1>{group.name}</h1>

      <div className="group-actions">
        <Button text="Adicionar Jogador" onClick={() => navigate(`/add-player/${groupId}`)} />
        <Button text="Adicionar Jogada" onClick={() => navigate(`/add-play/${groupId}`)} />
        <Button text="Adicionar Pontos" onClick={() => navigate(`/add-points/${groupId}`)} />
        <Button text="Sortear Duplas" onClick={() => navigate(`/draw-pairs/${groupId}`)} />
      </div>

      {players.length ?
        <>
          <h2>Ranking</h2>
          <div className="ranking-list">
            {players.map((player, index) => (
              <div key={player.id} className="ranking-item">
                <span className="ranking-position">{index + 1}º</span>
                <span className="ranking-name">{player.name}</span>
                <span className="ranking-points">{player.points} pontos</span>
              </div>
            ))}
          </div>
        </>
        :
        <p>Nenhum jogador encontrado</p>
      }

      <BackButton onClick={() => navigate('/')} />
    </div>
  );
};

export default GroupPage;
