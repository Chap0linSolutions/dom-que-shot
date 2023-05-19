import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import { RankingPage } from './Ranking';
import { GamePage } from './Game';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import coverImg from '../../assets/game-covers/bang-bang.png';
import './BangBang.css';

enum Game {
  Cover,
  Hint,
  Game,
  Ranking,
}

const BangBangEvents = {
  StartTimer: 'start_timer',
  Result: 'bangbang_result',
  FireEvent: 'shot',
  FinalRanking: 'bangbang_ranking',
};

export function BangBang() {
  const { user, room, setUser, setRoom } = useGlobalContext();

  const [ready, setReady] = useState(false);
  const [currentRanking, setCurrentRanking] = useState([]);
  const [finalRanking, setFinalRanking] = useState(false);
  const title = 'Bang Bang';
  const navigate = useNavigate();
  const socket = SocketConnection.getInstance();

  const description = (
    <>
      3, 2, 1, BANG! Um botão vermelho vai aparecer na tela e, após a contagem
      regressiva, todos devem tentar pressioná-lo o mais rápido que conseguirem.
      <br />
      <br />
      Quem queimar a largada, apertar por último ou não apertar dentro do tempo
      máximo de 10 segundos deve virar uma dose.
    </>
  );

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  useEffect(() => {
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

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    socket.onMessageReceived(({ message, ranking }) => {
      switch (message) {
        case BangBangEvents.StartTimer:
          setReady(true);
          break;
        case BangBangEvents.Result:
          setCurrentRanking(ranking);
          break;
        case BangBangEvents.FinalRanking:
          setCurrentRanking(ranking);
          setFinalRanking(true);
      }
    });

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
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
        navigate(destination);
        return;
      }
      setGlobalRoomPage(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const startGame = () => {
    socket.pushMessage(room.code, 'move-to', Game.Game);
  };

  const thisPlayerIsReady = () => {
    socket.pushMessage(room.code, 'player_ready', '');
  };

  const handleShot = (msTimer) => {
    socket.pushMessage(room.code, BangBangEvents.FireEvent, {
      time: msTimer,
    });
  };

  const goTo = (where: string) => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: where,
    });
  };

  switch (room.page) {
    case Game.Game:
      return (
        <GamePage
          everyoneIsReady={ready}
          iAmReady={thisPlayerIsReady}
          shot={handleShot}
          rankingPage={() => setGlobalRoomPage(Game.Ranking)}
          owner={user.isOwner}
        />
      );
    case Game.Ranking:
      return (
        <RankingPage
          data={currentRanking}
          gamePage={() => setGlobalRoomPage(Game.Game)}
          finalRanking={finalRanking}
          turnVisibility={user.isCurrentTurn}
          roulettePage={() => {
            socket.push('update-turn', room.code);
            goTo('/SelectNextGame');
          }}
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
