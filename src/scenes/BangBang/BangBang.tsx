import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import { CoverPage } from './Cover';
import { InfoPage } from './Info';
import { RankingPage } from './Ranking';
import { GamePage } from './Game';

const bangBangRoom = '1';

enum Game {
  Cover,
  Info,
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
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const navigateTo = useNavigate();
  const socketConn = socketConnection.getInstance();

  useEffect(() => {
    // socketConn.joinRoomWithCode(bangBangRoom);//// atuar em cima disso
    socketConn.joinRoom(userData);
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
  }, []);

  useEffect(() => {
    if (currentGameState === Game.Game) {
      socketConn.pushMessage(bangBangRoom, 'player_ready', ''); // temporario ate pegar o codigo do alex
    }
  }, [currentGameState]);

  const handleShot = (msTimer) => {
    socketConn.pushMessage(bangBangRoom, BangBangEvents.FireEvent, {
      time: msTimer,
    });
  };

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          infoPage={() => setCurrentGameState(Game.Info)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );
    case Game.Info:
      return (
        <InfoPage
          coverPage={() => setCurrentGameState(Game.Cover)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );
    case Game.Game:
      return (
        <GamePage
          ready={ready}
          shot={handleShot}
          //coverPage={() => setCurrentGameState(Game.Cover)}
          rankingPage={() => setCurrentGameState(Game.Ranking)}
        />
      );
    case Game.Ranking:
      return (
        <RankingPage
          data={currentRanking}
          gamePage={() => setCurrentGameState(Game.Game)}
          finishPage={() => navigateTo('/Home')}
          finalRanking={finalRanking}
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
