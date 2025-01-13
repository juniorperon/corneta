import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/backButton';
import { useAppContext } from '../../context/AppContext';


const Group: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, players } = useAppContext();

  const group = groups.filter((group) => group.id === groupId)
  const playersFiltered = players.filter((player) => player.groupId === groupId)

  useEffect(() => {

  })

  return (
    <div className="group-container">
      <h1>{group[0].name}</h1>

      <div className="group-actions">
        <button
          className="action-button"
          onClick={() => navigate(`/add-player/${groupId}`)}
        >
          Adicionar Jogador
        </button>
        <button
          className="action-button"
          onClick={() => navigate(`/add-play/${groupId}`)}
        >
          Adicionar Jogada
        </button>
        <button
          className="action-button"
          onClick={() => navigate(`/plays/${groupId}`)}
        >
          Ver Jogadas
        </button>
      </div>

      <BackButton />

      <h2>Jogadores</h2>
      <ul>
        {playersFiltered.map((player) => (
          <li key={player.id}>
            {player.name} - {player.points} pontos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Group;
