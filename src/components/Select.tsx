import React from 'react';
import styled from 'styled-components';

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

const StyledSelect = styled.select`
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

const StyledOption = styled.option`
  padding: 10px;
  background-color: #ffffff;
  color: #333;
`;

const Select: React.FC<SelectProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {placeholder && <StyledOption value="">{placeholder}</StyledOption>}
      {options.map((option) => (
        <StyledOption key={option.value} value={option.value}>
          {option.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};

export default Select;
