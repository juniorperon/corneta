import React from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

interface CardPlayerProps {
  id: number;
  name: string;
  onRemove?: (id: number) => void;
}

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
`;

const PlayerName = styled.p`
  margin-left: 10px;
  font-size: 16px;
  color: #333;
`;

const TrashIcon = styled(FaTrashAlt)`
  color: red;
  cursor: pointer;
  margin-right: 10px;
`;

const CardPlayer: React.FC<CardPlayerProps> = ({ id, name, onRemove }) => {
  return (
    <CardContainer>
      <PlayerName>{name}</PlayerName>
      {onRemove && <TrashIcon onClick={() => onRemove(id)} />}
    </CardContainer>
  );
};

export default CardPlayer;
