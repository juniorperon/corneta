import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import './styles.css';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Input';
import { api } from '../../../services/api';

const AddGroup: React.FC = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.post('/group/addGroup', { name: groupName });
      setMessage(`Grupo "${response.data.data.name}" criado com sucesso!`);
      setGroupName('');
    } catch (error) {
      setMessage('Erro ao criar o grupo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="group-container">
      <img className='home-img' src="../corneta-logo.webp" alt="logo-corneta" />
      <h1>Adicionar Grupo</h1>
      <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder='Digite o nome do grupo' />

      {message && (
        <p className={message.includes('sucesso') ? 'success' : 'error'}>{message}</p>
      )}


      <Button text="Adicionar" onClick={handleSubmit} disabled={loading} />
      <BackButton onClick={() => navigate('/')} />
    </div>
  );
};

export default AddGroup;