// src/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);  // Volta para a página anterior
  };

  return (
    <button onClick={handleGoBack} style={{ padding: '10px', margin: '10px', cursor: 'pointer' }}>
      Voltar
    </button>
  );
};

export default BackButton;
