// Exemplo de uso no seu arquivo Plays.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BackButton from '../../components/backButton';

const Plays: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { plays, getPlaysByGroup } = useAppContext();

  const [groupPlays, setGroupPlays] = useState(plays);

  useEffect(() => {
    if (groupId) {
      const groupPlays = getPlaysByGroup(groupId);
      setGroupPlays(groupPlays);
    }
  }, [groupId, plays, getPlaysByGroup]);

  return (
    <div className="plays-container">
      <h1>Jogadas do Grupo</h1>

      <BackButton />

      <div>
        {groupPlays.length === 0 ? (
          <p>Nenhuma jogada encontrada para este grupo.</p>
        ) : (
          <ul>
            {groupPlays.map((play) => (
              <li key={play.id}>
                {play.name} - {play.points} pontos
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => navigate(`/add-play/${groupId}`)}
      >
        Adicionar Jogada
      </button>
    </div>
  );
};

export default Plays;
