import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Button from '../../components/Button';

const groups = [
  { id: '1', name: 'Amigos CCS' },
  { id: '2', name: 'Galo da Madrugada' },
  { id: '3', name: 'Panelas BT' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img className='home-img' src="../corneta-logo.webp" alt="logo-corneta" height={100} />
      <h1 className="home-title">CORNETA</h1>
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
      <Button
        text="Adicionar Grupo"
        onClick={() => navigate(`/add-group/`)}
      />
    </div>
  );
};

export default Home;
