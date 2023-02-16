import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext, useGlobalRoomUpdater } from '../../contexts/GlobalContextProvider';
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

  //GLOBAL CONTEXT//////////////////////////////////////////////////////////////////////////////////////////////
  
  const globalData = useGlobalContext();
  const setGlobalRoomData = useGlobalRoomUpdater();

  const updateGlobalRoomData = (gameList: Game[], playerList: Player[], nextScreen: string) => {
    setGlobalRoomData({
      ...globalData.room,
      gameList: gameList,
      playerList: playerList,
      currentScreen: nextScreen,
    })  
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

  const [gameList, setGameList] = useState<string[]>([]);   //idealmente, agora que temos um useState global eu não queria nenhum desses dois auxiliares aqui
  const [playerList, setPlayerList] = useState<Player[]>([
    {
      avatarSeed: globalData.user.avatarSeed,
      nickname: globalData.user.nickname,
      beers: 0,
      playerID: 0,
    },
  ]);


  useEffect(() => {
    const selectedGames = games.filter(game => gameList.includes(game.text));
    setGlobalRoomData({
      ...globalData.room,
      gameList: selectedGames,
    });
  }, [gameList]);

  useEffect(() => {
    const players = playerList;                       //lista atualizada de jogadores
    const games = globalData.room.gameList;
    const screen = globalData.room.currentScreen; 
    updateGlobalRoomData(games, players, screen);
  }, [playerList]);




  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.joinRoom({
      nickname: globalData.user.nickname,
      avatarSeed: globalData.user.avatarSeed,
      roomCode: globalData.room.code,
    }, () => navigate('/Home'));

    socket.setLobbyUpdateListener(setPlayerList);
    socket.setGamesUpdateListener(setGameList);               //só consegui fazer funcionar desse jeito, com um useState auxiliar

    // socket.addEventListener('lobby-update', (reply) => {   //mas preferia ter implementado desse jeito
    //   const newPlayerList = JSON.parse(reply);
    //   setGlobalRoomData({
    //     ...globalData.room,
    //       playerList: newPlayerList,
    //   });
    // });


    if(globalData.room.gameList.length === 0){            //se for a primeira vez que o jogador está ingressando na partida, ele pede a lista de jogos ao servidor
      socket.push('games-update', globalData.room.code);  //saberemos se esse for o caso porque a lista de jogos começa vazia
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

      socket.push('get-current-game-by-room', globalData.room.code);
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
        roomCode: globalData.room.code,
        selectedGames: JSON.stringify(selection),
      });
      return setCurrentLobbyState(LobbyStates.Main);
    }
    popWarning('.LobbySettingsWarning');
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(globalData.room.code);
    console.log('código da sala copiado para a área de transferência');
    popWarning('.CopyWarning');
  };


  const beginMatch = () => {
    if (globalData.room.playerList.length >= 2) {
      console.log('Iniciando a partida.');
      socket.push('set-turn', globalData.room.code);
      socket.push('move-room-to', {
        roomCode: globalData.room.code,
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
          roomCode={globalData.room.code}
          copyToClipboard={copyToClipboard}
          beginMatch={beginMatch}
          settingsPage={() => setCurrentLobbyState(LobbyStates.Settings)}
          playerList={globalData.room.playerList}
        />
      );

    case LobbyStates.Settings:
      return (
        <SettingsPage
          previousGameSelection={globalData.room.gameList}
          mainPage={finishSettings}
        />
      );
  }
}
