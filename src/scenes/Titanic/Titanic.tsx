import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import FinishPage from './Finish';
import coverImg from '../../assets/game-covers/titanic.png';

enum Game {
  Cover,
  Game,
  Finish,
}

export const Status = {
  TimesUp: -100,
  TitanicTimesUp: [-100],
  IcebergTimesUp: [-100, -100, -100, -100, -100],
  IcebergMissedEveryone: -300,
  IcebergLeftAlone: [-200, -200, -200, -200, -200],
  Disconnected: [-1],
};

const ICEBERGS = 5;
const TITANICS = 3;

export default function Titanic() {
  const { user, room, setUser, setRoom } = useGlobalContext();
  const [timesUp, setTimesUp] = useState<boolean>(false);
  const [places, setPlaces] = useState<number[]>([]);
  const title = 'Titanic';

  //TIMER//////////////////////////////////////////////////////////////////////////////////////

  const gameTime = 15000;

  const [msTimer, setMsTimer] = useState(gameTime);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const startTimer = () => {
    setTimer(setInterval(run, 100));
  };

  let updatedMs = msTimer;
  const run = () => {
    if (updatedMs > 0) {
      updatedMs -= 100;
      if (updatedMs === 0) {
        setTimesUp(true);
      }
      setMsTimer(updatedMs);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const [results, setResults] = useState<string | undefined>(undefined);

  const description = (
    <>
      Este jogo é uma espécie de Batalha Naval. Aparecerá um mapa na tela de cada jogador, e cada um
      deve escolher onde vai posicionar suas peças. O jogador da vez será os ICEBERGS, e todos os
      demais serão os TITANICS.
      <br />
      <br />
      Serão 5 ICEBERGS para o jogador da vez, e 3 TITANICS para cada um dos demais. Todos vão ter 15 segundos
      para escolher onde irão botar suas peças.
      <br/>
      <br/>
      Quem não posicionar todas as peças a tempo BEBE. E claro, se o jogador da vez colocar um Iceberg
      onde algum dos demais colocou um barco, o jogador atingido deve virar uma dose.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const sendResults = (selection) => {
    clearInterval(timer);
    setMsTimer(0);
    setTimer(null);
    socket.pushMessage(room.code, 'player-has-selected', selection);
  };

  const startGame = () => {
    socket.pushMessage(room.code, 'move-to', Game.Game);
  };

  const nextRound = () => {
    socket.push('update-turn', room.code);
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/SelectNextGame',
    });
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList = JSON.parse(reply);
      setRoom((previous) => ({
        ...previous,
        playerList: newPlayerList,
      }));
    });

    socket.addEventListener('kick-player', (nickname) => {
      if (user.nickname === nickname) {
        window.localStorage.clear();
        navigate('/Home');
      }
    });

    socket.addEventListener('player-turn-is', (turnName) => {
      setUser((previous) => ({
        ...previous,
        isCurrentTurn: user.nickname === turnName,
      }));
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        setRoom((previous) => ({
          ...previous,
          URL: destination,
          page: undefined,
        }));
        return navigate(destination);
      }
      setGlobalRoomPage(destination);
    });

    socket.addEventListener('titanic-results', (finalResults) => {
      setResults(finalResults);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  useEffect(() => {
    if (room.page === Game.Game) {
      startTimer();
    }
  }, [room.page]);

  useEffect(() => {
    if(timesUp){
      const target = (user.isCurrentTurn)? ICEBERGS : TITANICS;
      const selection = places.filter((p) => p >= 100);
      if(selection.length === target){
        sendResults(JSON.stringify(selection));
      } else {
        setResults(`time's up`);
        if (user.isCurrentTurn) {
          return sendResults(JSON.stringify(Status.IcebergTimesUp));
        }
        return sendResults(JSON.stringify(Status.TitanicTimesUp));
      }
    }
  }, [timesUp, places]);

  useEffect(() => {
    if (typeof results === 'string') {
      if (timer !== null) {
        clearInterval(timer);
        setMsTimer(0);
        setTimer(null);
      }
    }
  }, [results]);

  switch (room.page) {
    case Game.Game:
      return (
        <GamePage
          sendResults={sendResults}
          receiveResults={results}
          isCurrentTurn={user.isCurrentTurn}
          msTimeLeft={msTimer}
          finishPage={() => setGlobalRoomPage(Game.Finish)}
          owner={user.isOwner}
          places={places}
          setPlaces={setPlaces}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          results={results}
          thisPlayerName={user.nickname}
          roulettePage={() => nextRound()}
          owner={user.isOwner}
        />
      );

    default:
      return (
        <CoverPage
          type="round"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          turnVisibility={user.isCurrentTurn}
          ownerVisibility={user.isOwner}
          description={description}
          gamePage={startGame}
        />
      );
  }
}
