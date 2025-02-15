import React from 'react';
import styled from 'styled-components';

const StyledBackButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  background-color: #ff4d4d;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 200px;
  margin-top: 16px;

  &:hover {
    background-color: #cc0000;
  }
`;

interface ButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <StyledBackButton onClick={onClick}>
      Voltar
    </StyledBackButton>
  );
};

export default BackButton;
