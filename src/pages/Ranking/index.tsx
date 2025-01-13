import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const Ranking: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const players = [
    { id: '1', name: 'Jogador 1', points: 100, grupoId: 1 },
    { id: '2', name: 'Jogador 2', points: 150, grupoId: 1 },
    { id: '3', name: 'Jogador 3', points: 200, grupoId: 2 },
    { id: '4', name: 'Jogador 4', points: 300, grupoId: 2 },
    { id: '5', name: 'Jogador 5', points: 400, grupoId: 3 },
    { id: '6', name: 'Jogador 6', points: 500, grupoId: 3 },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="ranking-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Voltar
      </button>
      <h1 className="ranking-title">Ranking do Grupo {groupId}</h1>
      <ul className="ranking-list">
        {players.map((player) => (
          <li key={player.id} className="ranking-item">
            {player.name} - {player.points} pontos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
