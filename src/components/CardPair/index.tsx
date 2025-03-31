import React from 'react';
import './styles.css'; // Estilo que criaremos em seguida

interface CardPairProps {
  player1: { id: number; name: string }; // Ajuste conforme os dados reais do Player
  player2: { id: number; name: string };
}

const CardPair: React.FC<CardPairProps> = ({ player1, player2 }) => {
  return (
    <div className="card-pair">
      <div className="player-section">
        <h3>{player1?.name || "Jogador não encontrado"}</h3>
      </div>
      <div className="divider">🤝</div>
      <div className="player-section">
        <h3>{player2?.name || "Jogador não encontrado"}</h3>
      </div>
    </div>
  );
};

export default CardPair;