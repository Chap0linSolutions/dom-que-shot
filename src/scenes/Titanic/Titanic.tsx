import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import FinishPage from './Finish';
import coverImg from '../../assets/game-covers/titanic.png';

enum Game {
  Cover,
  Game,
  Finish,
}

export default function Titanic() {
  const title = 'Titanic';

  //TIMER//////////////////////////////////////////////////////////////////////////////////////

  const gameTime = 30000;

  const [msTimer, setMsTimer] = useState(gameTime);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  let updatedMs = msTimer;
  const run = () => {
    if (updatedMs > 0) {
      updatedMs -= 10;
      if (updatedMs === 0) {
        setResults(`time's up`);
        if(turnVisibility === true){
          return sendResults(JSON.stringify([-100, -100, -100, -100, -100]));
        } return sendResults(JSON.stringify([-100]));
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
  const [results, setResults] = useState<string | undefined>(undefined);

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Aparecerá um mapa na tela, e os jogadores da roda devem escolher
      onde vão posicionar seus barcos. Enquanto isso, o jogador
      da vez escolhe onde vai posicionar seus Icebergs.
      <br />
      <br />
      Se o jogador da vez colocar um Iceberg onde algum dos demais
      colocou um barco, o jogador atingido deve virar uma dose para
      cada barco derrubado.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const sendResults = (selection) => { //selection is a JSON.stringify() of the chosen sectors positions
    clearInterval(timer);
    setTimer(null);
    socket.pushMessage(userData.roomCode, 'player-has-selected', selection);
  }

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
    socket.push('lobby-update', userData.roomCode);

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        return navigate(destination);
      }
      setCurrentGameState(destination);
    });

    socket.addEventListener('titanic-results', (finalResults) => {
      setResults(finalResults);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (currentGameState === Game.Game) {
      startTimer();
    } 
  }, [currentGameState]);

  useEffect(() => {
    if(typeof results === 'string'){
      if(timer !== null){
        console.log('parando o timer.');
        clearInterval(timer);
        setTimer(null);
      }
    }
  }, [results])

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
          sendResults={sendResults}
          receiveResults={results}
          isCurrentTurn={turnVisibility}
          msTimeLeft={msTimer}
          finishPage={() => setCurrentGameState(Game.Finish)}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          results={results}
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
