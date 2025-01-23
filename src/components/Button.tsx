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

  &:disabled {
    background-color:gray;
  }
`;

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
