import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import { useAppContext } from '../../../context/AppContext';
import './styles.css';
import Button from '../../../components/Button';

const Group: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, players } = useAppContext();

  const group = groups.find((group) => group.id === groupId);
  const playersFiltered = players
    .filter((player) => player.groupId === groupId)
    .sort((a, b) => b.points - a.points);

  if (!group) return <p>Grupo não encontrado</p>;

  return (
    <div className="group-container">
      <h1>{group.name}</h1>

      <div className="group-actions">
        <Button
          text="Adicionar Jogador"
          onClick={() => navigate(`/add-player/${groupId}`)}
        />
        <Button
          text="Adicionar Jogada"
          onClick={() => navigate(`/add-play/${groupId}`)}
        />
        <Button
          text="Adicionar Pontos"
          onClick={() => navigate(`/add-points/${groupId}`)}
        />
        <Button
          text="Sortear Duplas"
          onClick={() => navigate(`/draw-pairs/${groupId}`)}
        />
      </div>

      <h2>Ranking</h2>
      <ul className="ranking-list">
        {playersFiltered.map((player, index) => (
          <li key={player.id} className="ranking-item">
            <span className="ranking-position">{index + 1}º</span>
            <span className="ranking-name">{player.name}</span>
            <span className="ranking-points">{player.points} pontos</span>
          </li>
        ))}
      </ul>

      <BackButton onClick={() => navigate('/')} />
    </div>
  );
};

export default Group;