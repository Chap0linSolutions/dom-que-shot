import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-darker.png';
import Background from '../../components/Background';
import Button from '../../components/Button';
import PingTracker from '../../components/Debug/PingTracker';
import api from '../../services/api';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    if (userData) {
      api
        .get(
          `/returningUser/${userData.roomCode}/${userData.nickname}/${userData.avatarSeed}`
        )
        .then(() => {
          console.log('OK');
          navigate('/Lobby');
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
      <PingTracker />
    </Background>
  );
}

export default Welcome;
