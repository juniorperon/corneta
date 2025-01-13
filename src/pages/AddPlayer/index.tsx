import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddPlayer: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = () => {
    // Adicionar jogador ao grupo
    console.log(`Adicionando jogador: ${playerName} ao grupo ${groupId}`);
    navigate(`/group/${groupId}`);
  };

  return (
    <div>
      <h1>Adicionar Jogador ao Grupo {groupId}</h1>
      <input
        type="text"
        placeholder="Nome do Jogador"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={handleSubmit}>Adicionar Jogador</button>
    </div>
  );
};

export default AddPlayer;
