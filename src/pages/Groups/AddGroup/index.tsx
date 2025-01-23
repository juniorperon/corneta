import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import './styles.css';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Input';

const AddGroup: React.FC = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');

  const handleSubmit = () => {
    console.log(`Adicionando grupo: ${groupName}`);
    navigate(`/`);
  };

  return (
    <div className="group-container">
      <h1>Adicionar Grupo</h1>
      <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder='Digite o nome do grupo' />
      <Button text={'Adicionar'} onClick={handleSubmit} />


      <BackButton onClick={() => navigate('/')} />
    </div>
  );
};

export default AddGroup;