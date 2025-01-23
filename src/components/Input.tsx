import React from 'react';
import styled from 'styled-components';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const StyledInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }
`;

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <StyledInput value={value} placeholder={placeholder} onChange={onChange} />
  );
};

export default Input;
