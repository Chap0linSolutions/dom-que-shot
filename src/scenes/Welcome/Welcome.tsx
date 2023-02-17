import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import logo from '../../assets/logo-darker.png';
import Background from '../../components/Background';
import Button from '../../components/Button';
import api from '../../services/api';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();
  const {setUser, setRoom} = useGlobalContext();

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    if (userData) {
      api
        .get(
          `/returningUser/${userData.roomCode}/${userData.nickname}/${userData.avatarSeed}`
        )
        .then(() => {
          console.log('OK');
          setUser({nickname: userData.nickname, avatarSeed: userData.avatarSeed});
          setRoom(previous => {return {
            ...previous,
            code: userData.roomCode,
          }});
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
