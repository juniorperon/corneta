import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Select from '../../components/Select';
import './styles.css';
import CardPlayer from '../../components/CardPlayer';

const DrawPairs: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { players, pairs } = useAppContext();

  const playersFiltered = players.filter((player) => player.groupId === groupId);

  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [drawPairs, setDrawPairs] = useState<{ id: string, id_partner: string }[]>([]);
  const [groups, setGroups] = useState<{ duplas: { id: string, id_partner: string }[] }[]>([]);
  const [numGroups, setNumGroups] = useState<number | null>(null);
  const [maxAttempts, setMaxAttempts] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);


  const handleAddPlayer = () => {
    if (selectedPlayer && !selectedPlayers.some(p => p.id === selectedPlayer.id)) {
      setSelectedPlayers((prev) => [...prev, selectedPlayer]);
      setSelectedPlayer(null);
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== playerId));
  };

  const handleDrawPairs = (random: boolean) => {
    if (selectedPlayers.length < 4 || selectedPlayers.length % 2 !== 0) {
      alert('O número de jogadores deve ser maior ou igual a 4 e par.');
      return;
    }

    let generatedPairs: { id: string; id_partner: string }[] = [];
    const maxAttempts = 100; // Limite de tentativas para evitar loops infinitos
    let localAttempts = 0;

    while (localAttempts < maxAttempts) {
      localAttempts++;
      generatedPairs = [];
      const shuffled = [...selectedPlayers].sort(() => Math.random() - 0.5);

      // Gerar duplas
      let isDuplicate = false;
      for (let i = 0; i < shuffled.length; i += 2) {
        const pair = {
          id: shuffled[i].id,
          id_partner: shuffled[i + 1]?.id,
        };

        if (!random) {
          const [low, high] = [pair.id, pair.id_partner].sort();
          if (pairs.some(p => {
            const [existingLow, existingHigh] = [p.id, p.id_partner].sort();
            return existingLow === low && existingHigh === high;
          })) {
            isDuplicate = true;
            break;
          }
        }

        generatedPairs.push(pair);
      }

      if (!isDuplicate) {
        break;
      }
    }

    if (localAttempts === maxAttempts) {
      setMaxAttempts(true);
      alert('Não foi possível gerar pares únicos após várias tentativas. Tente novamente.');
      return;
    }

    setAttempts(localAttempts);
    setDrawPairs(generatedPairs);
    setGroups([]);
    setNumGroups(null);
  };

  const handleDrawGroups = () => {
    if (!numGroups || numGroups < 1 || numGroups > drawPairs.length / 2) {
      alert('Escolha um número válido de grupos.');
      return;
    }

    const shuffledPairs = [...drawPairs].sort(() => Math.random() - 0.5);
    const generatedGroups: { duplas: { id: string, id_partner: string }[] }[] = [];

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

      <p>Numero de tentativa: {attempts}</p>

      <Button text="Sortear Duplas" onClick={() => handleDrawPairs(false)} />
      {maxAttempts ?
        <Button text="Sortear Duplas Repetindo" onClick={() => handleDrawPairs(true)} />
        : <></>}

      {drawPairs.length > 0 && (
        <div className="pairs">
          <h2>Duplas Sorteados</h2>
          <ul>
            {drawPairs.map((pair, index) => (
              <li key={index}>
                {players.find(p => p.id === pair.id)?.name} e {players.find(p => p.id === pair.id_partner)?.name}
              </li>
            ))}
          </ul>

          <div className="form-group">
            <label>Número de Grupos</label>
            <input
              type="number"
              min="1"
              max={Math.floor(drawPairs.length / 2)}
              value={numGroups ?? ''}
              onChange={(e) => setNumGroups(Number(e.target.value))}
              placeholder={`Máximo: ${Math.floor(drawPairs.length / 2)}`}
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
                    {players.find(p => p.id === pair.id)?.name} e {players.find(p => p.id === pair.id_partner)?.name}
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
