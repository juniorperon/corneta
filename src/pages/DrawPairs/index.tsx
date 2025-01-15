import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Select from '../../components/Select';
import { FaTrashAlt } from 'react-icons/fa';
import './styles.css';
import CardPlayer from '../../components/CardPlayer';

const DrawPairs: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { players } = useAppContext();

  const playersFiltered = players.filter((player) => player.groupId === groupId);

  const [selectedPlayer, setSelectedPlayer] = useState<any>(null); // Agora é um objeto de jogador
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]); // Array de objetos de jogadores
  const [pairs, setPairs] = useState<{ id1: string, id2: string }[]>([]); // Duplas como objetos
  const [groups, setGroups] = useState<{ duplas: { id1: string, id2: string }[] }[]>([]); // Grupos como objetos com duplas
  const [numGroups, setNumGroups] = useState<number | null>(null);

  const handleAddPlayer = () => {
    if (selectedPlayer && !selectedPlayers.some(p => p.id === selectedPlayer.id)) {
      setSelectedPlayers((prev) => [...prev, selectedPlayer]);
      setSelectedPlayer(null); // Limpa a seleção de jogador
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== playerId));
  };

  const handleDrawPairs = () => {
    if (selectedPlayers.length < 4 || selectedPlayers.length % 2 !== 0) {
      alert('O número de jogadores deve ser maior ou igual a 4 e ser par.');
      return;
    }

    const shuffled = [...selectedPlayers].sort(() => Math.random() - 0.5);
    const generatedPairs: { id1: string, id2: string }[] = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      generatedPairs.push({
        id1: shuffled[i].id,
        id2: shuffled[i + 1]?.id,
      });
    }
    setPairs(generatedPairs);
    setGroups([]);
    setNumGroups(null);
  };

  const handleDrawGroups = () => {
    if (!numGroups || numGroups < 1 || numGroups > pairs.length / 2) {
      alert('Escolha um número válido de grupos.');
      return;
    }

    const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5);
    const generatedGroups: { duplas: { id1: string, id2: string }[] }[] = [];

    for (let i = 0; i < numGroups; i++) {
      generatedGroups.push({ duplas: [] });
    }

    shuffledPairs.forEach((pair, index) => {
      generatedGroups[index % numGroups].duplas.push(pair);
    });

    setGroups(generatedGroups);
  };

  return (
    <div className="draw-pairs-container">
      <h1>Sorteio de Pares</h1>

      <div className="form-group">
        <Select
          options={playersFiltered.map((player) => ({
            value: player.id,
            label: `${player.name}`,
          }))}
          value={selectedPlayer?.id || ''}
          onChange={(e) => {
            const player = playersFiltered.find(p => p.id === e.target.value);
            setSelectedPlayer(player || null);
          }}
          placeholder="Selecione um jogador"
        />
        <Button text="Adicionar Jogador" onClick={handleAddPlayer} />
      </div>

      <div className="selected-players">
        <h2>Jogadores Selecionados</h2>

        {selectedPlayers.length > 0 ?
          <div>
            {selectedPlayers.map((player) => (
              <CardPlayer
                key={player.id}
                id={player.id}
                name={player.name}
                onRemove={handleRemovePlayer}
              />
            ))}
          </div>
          : <p style={{ padding: '8px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Nenhum jogador inserido.</p>}
      </div>

      <Button text="Sortear Pares" onClick={handleDrawPairs} />

      {pairs.length > 0 && (
        <div className="pairs">
          <h2>Pares Sorteados</h2>
          <ul>
            {pairs.map((pair, index) => (
              <li key={index}>
                {players.find(p => p.id === pair.id1)?.name} e {players.find(p => p.id === pair.id2)?.name}
              </li>
            ))}
          </ul>

          <div className="form-group">
            <label>Número de Grupos</label>
            <input
              type="number"
              min="1"
              max={Math.floor(pairs.length / 2)}
              value={numGroups ?? ''}
              onChange={(e) => setNumGroups(Number(e.target.value))}
              placeholder={`Máximo: ${Math.floor(pairs.length / 2)}`}
            />
            <Button text="Sortear Grupos" onClick={handleDrawGroups} />
          </div>
        </div>
      )}

      {groups.length > 0 && (
        <div className="groups">
          <h2>Grupos Formados</h2>
          {groups.map((group, index) => (
            <div key={index} className="group">
              <h3>Grupo {index + 1}</h3>
              <ul>
                {group.duplas.map((pair, idx) => (
                  <li key={idx}>
                    {players.find(p => p.id === pair.id1)?.name} e {players.find(p => p.id === pair.id2)?.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default DrawPairs;
