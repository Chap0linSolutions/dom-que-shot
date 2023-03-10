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
  const { setUser, setRoom } = useGlobalContext();

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    if (userData) {
      api
        .get(
          `/returningUser/${userData.roomCode}/${userData.nickname}/${userData.avatarSeed}`
        )
        .then(() => {
          console.log('OK');
          const nextURL = '/Lobby';
          setUser({
            nickname: userData.nickname,
            avatarSeed: userData.avatarSeed,
            isOwner: false,
            isCurrentTurn: false,
          });
          setRoom((previous) => {
            return {
              ...previous,
              code: userData.roomCode,
              URL: nextURL,
            };
          });
          navigate(nextURL);
        })
        .catch(() => {
          console.log('Acesso negado.');
          window.localStorage.clear();
        });
    }
  }, []);

  const goHome = () => {
    const nextURL = '/Home';
    setRoom((previous) => {
      return {
        ...previous,
        URL: nextURL,
      };
    });
    navigate(nextURL);
  };

  return (
    <Background>
      <div className="WelcomePage">
        <img className="WelcomeImage" src={logo} />
        <Button onClick={goHome}>Entrar</Button>
      </div>
    </Background>
  );
}

export default Welcome;
