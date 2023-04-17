import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import api from '../../services/api';
import Welcome from './Welcome/Welcome';
import PrivacyPolicy from './PrivacyPolicy';
import AboutUs from './AboutUs';
import Contact from './Contact';

export enum Pages {
  Welcome,
  AboutUs,
  Contact,
  PrivacyPolicy,
}

export default function Start() {
  const navigate = useNavigate();
  const { setUser, setRoom } = useGlobalContext();
  const [page, setPage] = useState<Pages>(() => Pages.Welcome);

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
          setRoom((previous) => ({
            ...previous,
            code: userData.roomCode,
            URL: nextURL,
          }));
          navigate(nextURL);
        })
        .catch(() => {
          console.log('Acesso negado.');
          window.localStorage.clear();
        });
    }
  }, []);

  switch (page) {
    case Pages.AboutUs:
      return <AboutUs goBack={() => setPage(Pages.Welcome)} />;
    case Pages.Contact:
      return <Contact goBack={() => setPage(Pages.Welcome)} />;
    case Pages.PrivacyPolicy:
      return <PrivacyPolicy goBack={() => setPage(Pages.Welcome)} />;
    default:
      return (
        <Welcome setPage={setPage} navigate={navigate} setRoom={setRoom} />
      );
  }
}
