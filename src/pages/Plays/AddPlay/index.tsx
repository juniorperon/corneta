import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import './styles.css';

const AddPlay: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, plays } = useAppContext();

  const playsFiltered = plays.filter((play) => play.groupId === groupId);

  const group = groups.find((group) => group.id === groupId);
  const [playName, setPlayName] = useState('');
  const [playPoint, setPlayPoint] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = () => {
    console.log(`Adicionando jogada: ${playName} ao grupo ${group?.name}`);
    navigate(`/group/${groupId}`);
  };

  const filteredPlays = playsFiltered.filter((play) =>
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

      <h2>Lista de Jogadas</h2>
      <input
        type="text"
        placeholder="Pesquisar Jogada"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <ul className="play-list">
        {filteredPlays.length > 0 ? (
          filteredPlays.map((play) => (
            <li key={play.id} className="play-item">
              <span>{play.name}</span>
              <span>{play.points} pontos</span>
            </li>
          ))
        ) : (
          <li>Nenhuma jogada encontrada.</li>
        )}
      </ul>

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default AddPlay;
