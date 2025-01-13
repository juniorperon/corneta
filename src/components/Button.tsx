import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 200px;
  margin-top: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
