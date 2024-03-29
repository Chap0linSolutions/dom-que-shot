import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import games, { Game } from '../../contexts/games';
import gsap from 'gsap';
import './Lobby.css';

import MainPage from './Main';
import SettingsPage from './Settings';

enum LobbyStates {
  Main,
  Settings,
}

export default function Lobby() {
  const { user, room, setUser, setRoom } = useGlobalContext();
  const navigate = useNavigate();
  const [currentOwner, setCurrentOwner] = useState<string>('alguém');
  const [alertMessage, setAlertMessage] = useState<string>(undefined);

  useEffect(() => {
    if (room.playerList.length === 0) {
      setRoom((previous) => ({
        ...previous,
        playerList: [
          {
            nickname: user.nickname,
            avatarSeed: user.avatarSeed,
            beers: 0,
            playerID: 0,
          },
        ],
      }));
    }
  }, []);

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.connect(room.code);
    socket.joinRoom(
      {
        nickname: user.nickname,
        avatarSeed: user.avatarSeed,
        roomCode: room.code,
      },
      () => {
        const errorScreen = '/home';
        navigate(errorScreen);
      }
    );

    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList = JSON.parse(reply);
      setRoom((previous) => ({
        ...previous,
        playerList: newPlayerList,
      }));
    });

    socket.addEventListener('games-update', (newGameList) => {
      const selectedGames = games.filter((game) =>
        newGameList.includes(game.title)
      );
      const orderedSelection = selectedGames.map((game, index) => {
        return { ...game, id: index };
      });
      setRoom((previous) => ({
        ...previous,
        gameList: orderedSelection,
      }));
    });

    if (room.gameList.length === 0) {
      //se for a primeira vez que o jogador está ingressando na partida, ele pede a lista de jogos ao servidor
      socket.push('games-update', room.code); //saberemos se esse for o caso porque a lista de jogos começa vazia
    }

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
      }));
      setCurrentOwner(ownerName);
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (destination === '/roleta' || destination === '/quembebeu') {
        setRoom((previous) => ({
          ...previous,
          URL: destination,
          page: undefined,
        }));
        return navigate(destination);
      }
    });

    socket.addEventListener('current-state-is', (currentState) => {
      const { URL, page } = JSON.parse(currentState);
      switch (URL) {
        case '/bangbang':
        case '/oescolhido':
        case '/titanic':
        case '/mestredamimica':
        case '/linhadotempo':
          if (!page || page === 0) {
            //se o jogo ainda estiver na capa é possível entrar tardiamente
            setAlertMessage('Reconectando...');
            goTo(URL, page);
          } else {
            setAlertMessage('Aguardando finalizar jogo em andamento.');
          }
          break;
        case '/qualodesenho':
          if (!page || page < 2) {
            //para o qual-desenho ainda é possível entrar nas duas primeiras telas
            setAlertMessage('Reconectando...');
            goTo(URL, page);
          } else {
            setAlertMessage('Aguardando finalizar jogo em andamento.');
          }
          break;
        case '/quemsoueu':
          if (page !== 3) {
            //no caso do Quem Sou Eu os jogadores podem entrar a qualquer momento, com exceção da tela de resultados
            setAlertMessage('Reconectando...');
            goTo(URL, page);
          } else {
            setAlertMessage('Aguardando finalizar jogo em andamento.');
          }
          break;
        case '/quembebeu':
          setAlertMessage('Aguardando finalizar jogo em andamento.');
          break;
        default:
          goTo(URL, page);
      }
    });

    socket.addEventListener('cant-go-back-to', (gameName) => {
      setAlertMessage(`Oops! Parece que sua conexão falhou ou você atualizou a página durante uma rodada
      de ${gameName}, e não temos como te colocar de volta. Por favor aguarde a rodada terminar.`);
    });

    socket.push('get-current-state-by-room', room.code);

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const goTo = (URL: string, page: number | undefined) => {
    setRoom((previous) => ({
      ...previous,
      URL: URL,
      page: page,
    }));
    return navigate(URL);
  };

  const setGlobalRoomPage = (newPage: LobbyStates) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  const popWarning = (warning) => {
    gsap.to(warning, { opacity: 1, duration: 0 });
    setTimeout(() => {
      gsap.to(warning, { opacity: 0, duration: 1 });
    }, 2000);
  };

  const finishSettings = (selectedGames: Game[]) => {
    if (selectedGames.length >= 3) {
      const selection = selectedGames.map((game) => game.title);
      socket.push('selected-games-are', {
        roomCode: room.code,
        selectedGames: JSON.stringify(selection),
      });
      return setGlobalRoomPage(LobbyStates.Main);
    }
    popWarning('.LobbySettingsWarning');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(room.code);
    console.log('código da sala copiado para a área de transferência');
    popWarning('.CopyWarning');
  };

  const beginMatch = () => {
    if (room.playerList.length >= 2) {
      socket.push('set-turn', room.code);
      socket.push('move-room-to', {
        roomCode: room.code,
        destination: '/roleta',
      });
      return;
    }
    popWarning('.LobbyWarning');
  };

  switch (room.page) {
    case LobbyStates.Settings:
      return (
        <SettingsPage
          previousGameSelection={room.gameList}
          mainPage={finishSettings}
        />
      );
    default:
      return (
        <MainPage
          alertMessage={alertMessage}
          currentOwner={currentOwner}
          roomCode={room.code}
          copyToClipboard={copyToClipboard}
          beginMatch={beginMatch}
          settingsPage={() => setGlobalRoomPage(LobbyStates.Settings)}
          playerList={room.playerList}
        />
      );
  }
}
