import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import './styles.css';
import CardPlayer from '../../../components/CardPlayer';
import CardPair from '../../../components/CardPair';
import { Group, Pair, Player } from '../../../types';
import { api } from '../../../services/api';

const DrawPairs: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [drawPairs, setDrawPairs] = useState<{ id: string; idPartner: string }[]>([]);
  const [group, setGroup] = useState<Group | null>(null);
  const [maxAttempts, setMaxAttempts] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [acceptPairs, setAcceptPairs] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [edition, setEdition] = useState<string>('');
  const [showDrawButton, setShowDrawButton] = useState<boolean>(true); // Added for button control

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    const fetchPreviousPairs = async () => {
      try {
        const response = await api.get(`pair/listPairs/${Number(groupId)}`);
        const { data } = response.data;
        setPairs(data);
        console.log("Duplas já sorteadas (inicial):", data);
      } catch (error) {
        console.error("Erro ao buscar duplas já sorteadas:", error);
      }
    };

    fetchPreviousPairs();
  }, [groupId]);

  const getGroups = async () => {
    setLoading(true);
    try {
      const response = await api.get('/group/listGroups');
      const selectedGroup = response.data.data.find((g: Group) => g.id === Number(groupId));
      setGroup(selectedGroup);

      if (selectedGroup) {
        getPlayers(Number(groupId));
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

  const handleAddPlayer = () => {
    if (selectedPlayer && !selectedPlayers.some(p => p.id === selectedPlayer.id)) {
      setSelectedPlayers((prev) => [...prev, selectedPlayer]);
      setSelectedPlayer(null);
    }
  };

  const handleRemovePlayer = (playerId: number) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== playerId));
  };

  const handleDrawPairs = async (random: boolean) => {
    if (!edition) {
      alert('Por favor, insira o número da edição antes de sortear.');
      return;
    }

    if (selectedPlayers.length < 4 || selectedPlayers.length % 2 !== 0) {
      alert('O número de jogadores deve ser maior ou igual a 4 e par.');
      return;
    }

    let generatedPairs: { id: string; idPartner: string }[] = [];
    const maxAttemptsLimit = 1000;
    let localAttempts = 0;

    try {
      const response = await api.get(`pair/listPairs/${Number(groupId)}`);
      const existingPairs = response.data.data || [];
      console.log("Duplas existentes no backend antes do sorteio:", existingPairs);

      const existingPairsSet = new Set<string>();
      existingPairs.forEach((p: any) => {
        const id1 = p.playerId?.toString().trim();
        const id2 = p.partnerId?.toString().trim();
        if (id1 && id2) {
          const pairStr = [id1, id2].sort().join('-');
          existingPairsSet.add(pairStr);
          console.log(`Dupla existente normalizada: ${pairStr} (original: ${id1}-${id2})`);
        } else {
          console.warn("Dupla inválida no histórico:", p);
        }
      });
      console.log("Set de duplas existentes (normalizado):", Array.from(existingPairsSet));

      while (localAttempts < maxAttemptsLimit) {
        localAttempts++;
        generatedPairs = [];
        const shuffled = [...selectedPlayers].sort(() => Math.random() - 0.5);
        console.log(`Tentativa ${localAttempts} - Jogadores embaralhados:`, shuffled.map(p => p.id));

        let isDuplicate = false;

        for (let i = 0; i < shuffled.length; i += 2) {
          if (!shuffled[i] || !shuffled[i + 1]) {
            console.warn("Erro: jogador indefinido no embaralhamento", shuffled);
            isDuplicate = true;
            break;
          }

          const pair = {
            id: shuffled[i].id.toString().trim(),
            idPartner: shuffled[i + 1].id.toString().trim(),
          };

          const pairStr = [pair.id, pair.idPartner].sort().join('-');
          console.log(`Tentativa ${localAttempts} - Dupla gerada: ${pairStr} (original: ${pair.id}-${pair.idPartner})`);

          if (!random) {
            console.log(`Comparando dupla gerada (${pairStr}) com histórico:`, Array.from(existingPairsSet));
            if (existingPairsSet.has(pairStr)) {
              console.log(`Dupla ${pairStr} encontrada no histórico! Marcando como duplicata.`);
              isDuplicate = true;
              break;
            } else {
              console.log(`Dupla ${pairStr} não encontrada no histórico.`);
            }
          }

          generatedPairs.push(pair);
        }

        if (!isDuplicate) {
          console.log(`Sorteio concluído após ${localAttempts} tentativas. Nenhuma duplicata encontrada.`);
          break;
        }
      }

      if (!random) {
        const generatedPairsSet = new Set(generatedPairs.map(p => [p.id, p.idPartner].sort().join('-')));
        for (const pair of existingPairs) {
          if (generatedPairsSet.has(pair)) {
            console.error(`Validação final falhou: Dupla ${pair} encontrada nas duplas geradas!`);
            setMaxAttempts(true);
            setMessage('Erro interno: duplicata detectada na validação final. Tente novamente.');
            return;
          }
        }
      }

      if (localAttempts >= maxAttemptsLimit) {
        setMaxAttempts(true);
        setMessage('Não foi possível gerar pares únicos após várias tentativas. Tente novamente.');
        console.warn("Limite de tentativas atingido.");
        return;
      }

      setAttempts(localAttempts);
      setDrawPairs(generatedPairs);
      setMaxAttempts(false);
      setMessage(null);
      console.log('Duplas geradas finais:', generatedPairs);
    } catch (error) {
      console.error('Erro ao verificar duplas já sorteadas:', error);
      setMessage('Erro ao realizar o sorteio. Tente novamente.');
    }
  };

  const handleSavePairs = async () => {
    if (!drawPairs.length) {
      setMessage('Nenhuma dupla para gravar.');
      return;
    }

    setLoading(true);
    try {
      for (const pair of drawPairs) {
        const pairData = {
          playerId: Number(pair.id),
          partnerId: Number(pair.idPartner),
          groupId: Number(groupId),
          edition: edition
        };
        console.log(`Gravando dupla:`, pairData);
        await api.post('/pair/addPair', pairData);
      }
      setMessage('Duplas gravadas com sucesso!');
    } catch (error) {
      console.error('Erro ao gravar duplas:', error);
      setMessage('Erro ao gravar duplas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowPairs = () => {
    setAcceptPairs(true);
    setShowDrawButton(false);
  };

  return (
    <div className="draw-pairs-container">
      <h1>Sorteio de Duplas - {group?.name}</h1>

      <div className="form-group">
        <Select
          options={players.map((player) => ({
            value: player.id,
            label: `${player.name}`,
          }))}
          value={selectedPlayer?.id || ''}
          onChange={(e) => {
            const player = players.find(p => p.id === Number(e.target.value));
            setSelectedPlayer(player || null);
          }}
          placeholder="Selecione um jogador"
        />
        <Button text="Adicionar Jogador" onClick={handleAddPlayer} />
      </div>

      <div className="selected-players">
        <h2>Jogadores Selecionados: {selectedPlayers.length}</h2>
        {selectedPlayers.length > 0 ? (
          <div className="players-scroll-container">
            {selectedPlayers.map((player) => (
              <CardPlayer
                key={player.id}
                id={player.id}
                name={player.name}
                onRemove={handleRemovePlayer}
              />
            ))}
          </div>
        ) : (
          <p style={{ padding: '8px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            Nenhum jogador inserido.
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="edition">Número da Edição:</label>
        <input
          id="edition"
          type="text"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
          placeholder="Digite o número da edição"
          style={{ padding: '8px', margin: '8px 0', width: '200px' }}
        />
      </div>

      <p>Numero de tentativas: {attempts}</p>
      {showDrawButton && (
        <Button
          text="Sortear Duplas"
          onClick={() => handleDrawPairs(false)}
          disabled={!selectedPlayers.length || loading}
        />
      )}
      {maxAttempts && (
        <Button
          text="Sortear Duplas Repetindo"
          onClick={() => handleDrawPairs(true)}
          disabled={loading}
        />
      )}

      {message && (
        <p className={message.includes('sucesso') ? 'success' : 'error'}>{message}</p>
      )}

      {drawPairs.length > 0 && (
        <div className="pairs-list">
          <h2>Duplas Sorteadas:</h2>
          {acceptPairs ? (
            <div className="pairs-draw-list">
              {drawPairs.map((pair, index) => {
                const player1 = players.find(p => p.id === Number(pair.id));
                const player2 = players.find(p => p.id === Number(pair.idPartner));
                return (
                  <CardPair
                    key={index}
                    player1={player1 || { id: Number(pair.id), name: "Jogador não encontrado" }}
                    player2={player2 || { id: Number(pair.idPartner), name: "Jogador não encontrado" }}
                  />
                );
              })}
              <div className="save-button-container">
                <Button
                  text="Gravar Duplas"
                  onClick={handleSavePairs}
                  disabled={loading}
                />
              </div>
            </div>
          ) : (
            <Button
              text="Mostrar duplas"
              onClick={handleShowPairs}
              disabled={loading}
            />
          )}
        </div>
      )}

      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default DrawPairs;