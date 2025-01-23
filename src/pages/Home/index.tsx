import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Button from '../../components/Button';
import { api } from '../../services/api';

interface Group {
  id: string;
  name: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]); // Tipando como array de grupos
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    setLoading(true);
    try {
      const response = await api.get('/group/listGroups');
      setGroups(response.data.data);
      setMessage(`Grupos carregados com sucesso!`);
    } catch (error) {
      setMessage('Erro ao buscar grupos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <img className="home-img" src="../corneta-logo.webp" alt="logo-corneta" />
      <h1 className="home-title">CORNETA</h1>

      {loading ? (
        <p>Carregando grupos...</p>
      ) : (
        <>
          <ul className="group-list">
            {groups.map((group) => (
              <li key={group.id}>
                <Button
                  text={group.name}
                  onClick={() => navigate(`/group/${group.id}`)}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      <Button text="Adicionar Grupo" onClick={() => navigate(`/add-group/`)} />
    </div>
  );
};

export default Home;
