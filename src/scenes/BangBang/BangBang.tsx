import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from '../../components/Game/Cover';
import { RankingPage } from './Ranking';
import { GamePage } from './Game';
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
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const [ready, setReady] = useState(false);
  const [currentRanking, setCurrentRanking] = useState([]);
  const [finalRanking, setFinalRanking] = useState(false);
  const turnVisibility = useLocation().state.isYourTurn;
  const ownerVisibility = useLocation().state.isOwner;
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const bangBangRoom = userData.roomCode;

  const title = 'Bang Bang';
  const navigateTo = useNavigate();
  const socketConn = SocketConnection.getInstance();

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Iniciada a partida, todos os jogadores devem atirar no alvo dentro do
      tempo de 10 segundos.
      <br />
      <br />
      Quem atirar por último, ou não atirar dentro do tempo de 10 segundos, bebe
      uma dose.
    </>
  );

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    socketConn.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  useEffect(() => {
    socketConn.addEventListener('room-is-moving-to', (destination) => {
      navigateTo(destination, {
        state: {
          isYourTurn: turnVisibility,
          isOwner: ownerVisibility,
        },
      });
    });

    return () => {
      socketConn.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    socketConn.onMessageReceived(({ message, ranking }) => {
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

    socketConn.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        console.log(`Movendo a sala para ${destination}.`);
        navigateTo(destination);
        return;
      }
      setCurrentGameState(destination);
    });

    return () => {
      socketConn.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (currentGameState === Game.Game) {
      socketConn.push('move-room-to', {
        roomCode: userData.roomCode,
        destination: Game.Game,
      });
      socketConn.pushMessage(bangBangRoom, 'player_ready', '');
    }
  }, [currentGameState]);

  const handleShot = (msTimer) => {
    socketConn.pushMessage(bangBangRoom, BangBangEvents.FireEvent, {
      time: msTimer,
    });
  };

  const goTo = (where: string) => {
    socketConn.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: where,
    });
  };

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
          description={description} //full game info is now loaded here
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );
    case Game.Game:
      return (
        <GamePage
          ready={ready}
          shot={handleShot}
          rankingPage={() => setCurrentGameState(Game.Ranking)}
        />
      );
    case Game.Ranking:
      return (
        <RankingPage
          data={currentRanking}
          gamePage={() => setCurrentGameState(Game.Game)}
          finalRanking={finalRanking}
          turnVisibility={turnVisibility}
          roulettePage={() => {
            socketConn.push('update-turn', userData.roomCode);
            goTo('/SelectNextGame');
          }}
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
