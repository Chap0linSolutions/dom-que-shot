import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import FinishPage from './Finish';
import AwaitingResults from './Awaiting';
import coverImg from '../../assets/game-covers/titanic.png';

interface ListedPlayerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}

enum Game {
  Cover,
  Game,
  AwaitingResults,
  Finish,
}

export default function Titanic() {
  const title = 'O Escolhido';

  //TIMER//////////////////////////////////////////////////////////////////////////////////////

  const gameTime = 10000;

  const [msTimer, setMsTimer] = useState(gameTime);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  let updatedMs = msTimer;
  const run = () => {
    if (updatedMs > 0) {
      updatedMs -= 10;
      if (updatedMs === 0) {
        console.log('Acabou o tempo.');
        socket.pushMessage(userData.roomCode, 'vote-results', null);
      }
      setMsTimer(updatedMs);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const ownerVisibility = useLocation().state.isOwner;
  const turnVisibility = useLocation().state.isYourTurn;
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const [playerList, updatePlayerList] = useState<ListedPlayerProps[]>([]);

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Aparecerá uma lista com todos os participantes da sala e cada um votará em
      uma pessoa da lista para virar uma dose.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const startGame = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: Game.Game,
    });
  };

  const nextRound = () => {
    socket.push('update-turn', userData.roomCode);
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/SelectNextGame',
    });
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.setLobbyUpdateListener(updatePlayerList);
    socket.push('lobby-update', userData.roomCode);

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        return navigate(destination);
      }
      setCurrentGameState(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          type="round"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          description={description}
          gamePage={startGame}
        />
      );

    case Game.Game:
      return (
        <GamePage
          finishPage={() => setCurrentGameState(Game.AwaitingResults)}
          msTimeLeft={msTimer}
        />
      );

    case Game.AwaitingResults:
      return (
        <AwaitingResults
          msTimeLeft={msTimer}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          turnVisibility={turnVisibility}
          roulettePage={() => nextRound()}
        />
      );

    default:
      return (
        <Background>
          <div>Erro!</div>
        </Background>
      );
  }
}
