import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Group from '../pages/Groups/Group';
import AddGroup from '../pages/Groups/AddGroup';
import AddPlayer from '../pages/Players/AddPlayer';
import AddPlay from '../pages/Plays/AddPlay';
import AddPoints from '../pages/Points/AddPoints';
import DrawPairs from '../pages/Pairs/DrawPairs';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-group" element={<AddGroup />} />
      <Route path="/group/:groupId" element={<Group />} />
      <Route path="/add-player/:groupId" element={<AddPlayer />} />
      <Route path="/add-play/:groupId" element={<AddPlay />} />
      <Route path="/add-points/:groupId" element={<AddPoints />} />
      <Route path="/draw-pairs/:groupId" element={<DrawPairs />} />
    </Routes>
  );
};

export default AppRoutes;
