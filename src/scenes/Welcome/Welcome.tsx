import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext, useGlobalUserUpdater, useGlobalRoomUpdater } from '../../contexts/GlobalContextProvider';
import logo from '../../assets/logo-darker.png';
import Background from '../../components/Background';
import Button from '../../components/Button';
import api from '../../services/api';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();
  const globalData = useGlobalContext();
  const setGlobalUserData = useGlobalUserUpdater();
  const setGlobalRoomData = useGlobalRoomUpdater();

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    if (userData) {
      api
        .get(
          `/returningUser/${userData.roomCode}/${userData.nickname}/${userData.avatarSeed}`
        )
        .then(() => {
          console.log('OK');
          setGlobalUserData({nickname: userData.nickname, avatarSeed: userData.avatarSeed});
          setGlobalRoomData({...globalData.room, code: userData.roomCode})
          navigate('/Lobby', { state: { returningPlayer: true } });
        })
        .catch(() => {
          console.log('Acesso negado.');
          window.localStorage.clear();
        });
    }
  }, []);

  return (
    <Background>
      <div className="WelcomePage">
        <img className="WelcomeImage" src={logo} />
        <Button onClick={() => navigate('/Home')}>Entrar</Button>
      </div>
    </Background>
  );
}

export default Welcome;
