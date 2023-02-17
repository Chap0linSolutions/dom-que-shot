import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import games, { Game } from '../../contexts/games';
import gsap from 'gsap';
import './Lobby.css';

import MainPage from './Main';
import SettingsPage from './Settings';

enum Visibility {
  Invisible,
  Visible,
}

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

  const {user, room, setRoom} = useGlobalContext();
  const navigate = useNavigate();
  const returningPlayer = useLocation().state?.returningPlayer ? true : false;
  const [ownerVisibility, setOwnerVisibility] = useState<Visibility>(
    Visibility.Invisible
  );
  const [currentOwner, setCurrentOwner] = useState<string>();
  const [currentLobbyState, setCurrentLobbyState] = useState<LobbyStates>(
    LobbyStates.Main
  );

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


    if(room.gameList.length === 0){            //se for a primeira vez que o jogador está ingressando na partida, ele pede a lista de jogos ao servidor
      socket.push('games-update', room.code);  //saberemos se esse for o caso porque a lista de jogos começa vazia
    }

    socket.addEventListener('room-owner-is', (ownerID) => {
      socket.push('get-player-name-by-id', ownerID);
      if (ownerID === socket.socket.id) {
        setOwnerVisibility(Visibility.Visible);
        return;
      }
    });

    socket.addEventListener('player-name', (playerName) => {
      setCurrentOwner(playerName);
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (destination === '/SelectNextGame') {
        console.log(`Movendo a sala para ${destination}.`);
        setRoom(previous => {
          return {
            ...previous,
            currentScreen: destination,
          }
        });
        return navigate(destination);
      }
    });

    if (returningPlayer) {
      socket.addEventListener('current-game-is', (currentGame) => {
        if (currentGame == 'BangBang' || currentGame == 'OEscolhido') {
          setAlertMessage('Aguardando finalizar jogo em andamento.');
        } else if(currentGame !== null) {
          setAlertMessage('Reconectando...');
          return navigate(`/${currentGame}`, {
            state: {
              isYourTurn: false,
              isOwner: false,
            },
          });
        }
      });

      socket.push('get-current-game-by-room', room.code);
    }

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

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
      return setCurrentLobbyState(LobbyStates.Main);
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


  switch (currentLobbyState) {
    case LobbyStates.Main:
      return (
        <MainPage
          ownerVisibility={ownerVisibility}
          alertMessage={alertMessage}
          currentOwner={currentOwner}
          roomCode={room.code}
          copyToClipboard={copyToClipboard}
          beginMatch={beginMatch}
          settingsPage={() => setCurrentLobbyState(LobbyStates.Settings)}
          playerList={room.playerList}
        />
      );

    case LobbyStates.Settings:
      return (
        <SettingsPage
          previousGameSelection={room.gameList}
          mainPage={finishSettings}
        />
      );
  }
}
