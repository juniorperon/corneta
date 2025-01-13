import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Group from '../pages/Group';
import AddPlayer from '../pages/AddPlayer';
import AddPlay from '../pages/AddPlay';
import AddPoints from '../pages/AddPoints';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/group/:groupId" element={<Group />} />
      <Route path="/add-player/:groupId" element={<AddPlayer />} />
      <Route path="/add-play/:groupId" element={<AddPlay />} />
      <Route path="/add-points/:groupId" element={<AddPoints />} />
    </Routes>
  );
};

export default AppRoutes;
