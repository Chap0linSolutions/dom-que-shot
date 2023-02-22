import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

type Player = {
  avatarSeed: string;
  nickname: string;
  beers: number;
  playerID: number;
};

export default function Lobby() {

  const {user, room, setUser, setRoom} = useGlobalContext();
  const navigate = useNavigate();
  const returningPlayer = useLocation().state?.returningPlayer ? true : false;
  const [currentOwner, setCurrentOwner] = useState<string>('alguém');
  const [alertMessage, setAlertMessage] = useState<string>(undefined);

  useEffect(() => {
    if(room.playerList.length === 0){
      setRoom(previous => {
        return {
          ...previous,
          playerList: [{
            nickname: user.nickname,
            avatarSeed: user.avatarSeed,
            beers: 0,
            playerID: 0,
          }]
        }
      });
    }
  }, [])


  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.joinRoom({
      nickname: user.nickname,
      avatarSeed: user.avatarSeed,
      roomCode: room.code,
    }, () => {
      const errorScreen = '/Home';
      navigate(errorScreen);
    });

    socket.addEventListener('lobby-update', (reply) => { 
      const newPlayerList = JSON.parse(reply);                  //newPlayerList = Player[]
      setRoom(previous => {
        return {
          ...previous,
          playerList: newPlayerList,
        }
      });
    });

    socket.addEventListener('games-update', (newGameList) => {    //reply = string[] com o nome dos jogos da partida
      const selectedGames = games.filter(game => newGameList.includes(game.text));
      const orderedSelection = selectedGames.map((game, index) => {return {...game, id: index}})
      setRoom(previous => {
        return {
          ...previous,
          gameList: orderedSelection,
        }
      });
    })


    if(room.gameList.length === 0){                               //se for a primeira vez que o jogador está ingressando na partida, ele pede a lista de jogos ao servidor
      socket.push('games-update', room.code);                     //saberemos se esse for o caso porque a lista de jogos começa vazia
    }

    socket.addEventListener('room-owner-is', (ownerName) => {
      // socket.push('get-player-name-by-id', ownerID);           //não é mais necessário se o roow-owner-is já retornar o nome direto
      const isOwner = (user.nickname === ownerName);
      setUser(previous => {
        return {
          ...previous,
          isOwner: isOwner,
        }
      });
      setCurrentOwner(ownerName);
    });

    // socket.addEventListener('player-name', (playerName) => {   //aqui também não mais necessário
    //   setCurrentOwner(playerName);
    // });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (destination === '/SelectNextGame') {
        setRoom(previous => {
          return {
            ...previous,
            URL: destination,
            page: undefined,
          }
        });
        return navigate(destination);
      }
    });

    if (returningPlayer) {
      socket.addEventListener('current-game-is', (currentGame) => {        //TODO possivelmente essa lógica só vai valer para quem está entrando com um jogo em andamento,
        if (currentGame == 'BangBang' || currentGame == 'OEscolhido') {    //sendo necessário repensar o que acontecer com quem só caiu e voltou. Isso porque
          setAlertMessage('Aguardando finalizar jogo em andamento.');      //agora o jogador que caiu momentaneamente tem armazenado globalmente tanto a URL
        } else if(currentGame !== null) {                                  //quanto a página em que ele estava.

          const destination = `/${currentGame}`;
          setAlertMessage('Reconectando...');
          setRoom(previous => {             
            return {
              ...previous,
              URL: destination,
              page: undefined,    
            }
          })
          return navigate(destination);
        }
      });

      socket.push('get-current-game-by-room', room.code);
    }

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const setGlobalRoomPage = (newPage: LobbyStates) => {
    setRoom(previous => {return {...previous, page: newPage}})
  }

  const popWarning = (warning) => {
    gsap.to(warning, { opacity: 1, duration: 0 });
    setTimeout(() => {
      gsap.to(warning, { opacity: 0, duration: 1 });
    }, 2000);
  };


  const finishSettings = (selectedGames: Game[]) => {
    if (selectedGames.length >= 3) {
      const selection = selectedGames.map((game) => game.text);
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
      console.log('Iniciando a partida.');
      socket.push('set-turn', room.code);
      socket.push('move-room-to', {
        roomCode: room.code,
        destination: '/SelectNextGame',
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
