import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from './scenes/Welcome';
import Tutorial from './scenes/Tutorial';
import Login from './scenes/Login';
import Home from './scenes/Home';
import ChooseAvatar from './scenes/ChooseAvatar';
import Lobby from './scenes/Lobby';
import WhoDrank from './scenes/WhoDrank/WhoDrank';
import Vrum from './scenes/Vrum';
import BichoBebe from './scenes/BichoBebe';
import Medusa from './scenes/Medusa';
import CSComposto from './scenes/CSComposto';
import PensaRapido from './scenes/PensaRapido';
import DireitaEsquerda from './scenes/DireitaEsquerda';
import Buzz from './scenes/Buzz';
import EuNunca from './scenes/EuNunca';
import OEscolhido from './scenes/OEscolhido';
import BangBang from './scenes/BangBang';
import SelectNextGame from './scenes/SelectNextGame';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChooseAvatar" element={<ChooseAvatar />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/OEscolhido" element={<OEscolhido />} />
        <Route path="/SelectNextGame" element={<SelectNextGame />} />
        <Route path="/WhoDrank" element={<WhoDrank />} />
        <Route path="/Vrum" element={<Vrum />} />
        <Route path="/BichoBebe" element={<BichoBebe />} />
        <Route path="/Medusa" element={<Medusa />} />
        <Route path="/CSComposto" element={<CSComposto />} />
        <Route path="/DireitaEsquerda" element={<DireitaEsquerda />} />
        <Route path="/PensaRapido" element={<PensaRapido />} />
        <Route path="/Buzz" element={<Buzz />} />
        <Route path="/EuNunca" element={<EuNunca />} />
        <Route path="/BangBang" element={<BangBang />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
