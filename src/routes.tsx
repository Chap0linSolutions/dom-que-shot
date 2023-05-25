import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Start from './scenes/Start';
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
import Titanic from './scenes/Titanic';
import QuemSouEu from './scenes/QuemSouEu';
import QualODesenho from './scenes/QualODesenho';
import JogoDoDesafio from './scenes/JogoDoDesafio';
import JogoDaVerdade from './scenes/JogoDaVerdade';
import MestreDaMimica from './scenes/MestreDaMimica';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/avatar" element={<ChooseAvatar />} />
        <Route path="/saguao" element={<Lobby />} />
        <Route path="/oescolhido" element={<OEscolhido />} />
        <Route path="/roleta" element={<SelectNextGame />} />
        <Route path="/quembebeu" element={<WhoDrank />} />
        <Route path="/vrum" element={<Vrum />} />
        <Route path="/bichobebe" element={<BichoBebe />} />
        <Route path="/medusa" element={<Medusa />} />
        <Route path="/cscomposto" element={<CSComposto />} />
        <Route path="/direitaesquerda" element={<DireitaEsquerda />} />
        <Route path="/pensarapido" element={<PensaRapido />} />
        <Route path="/buzz" element={<Buzz />} />
        <Route path="/eununca" element={<EuNunca />} />
        <Route path="/bangbang" element={<BangBang />} />
        <Route path="/titanic" element={<Titanic />} />
        <Route path="/quemsoueu" element={<QuemSouEu />} />
        <Route path="/qualodesenho" element={<QualODesenho />} />
        <Route path="/jogododesafio" element={<JogoDoDesafio />} />
        <Route path="/jogodaverdade" element={<JogoDaVerdade />} />
        <Route path="/mestredamimica" element={<MestreDaMimica />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
