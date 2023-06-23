import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import GamePage from './Game';
import CoverPage from '../../components/Game/Cover';
import coverImg from '../../assets/game-covers/linha-do-tempo.png';
import FinishPage from './Finish';

export type Results = {
  answer: number,
  guesses: {
    player: string,
    guess: number,
  }[]
}

enum Game {
  Cover,
  Game,
  Finish,
}

export enum Status {
  DISCONNECTED = -1,
  TIMESUP = -100,
}

const GAME_DURATION = 20000;
const DELTA_TIME = 100;

export default function LinhaDoTempo() {
  const title = 'Linha do Tempo';
  const { user, room, setUser, setRoom } = useGlobalContext();
  const [question, setQuestion] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<Results | undefined>(undefined);

  //TIMER//////////////////////////////////////////////////////////////////////////////////////

  const [msTimer, setMsTimer] = useState(() => GAME_DURATION);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, DELTA_TIME));
  };

  const run = () => {
    setMsTimer((previous) => (previous > 0 ? previous - DELTA_TIME : 0));
  };

  useEffect(() => {
    if (msTimer === 0) {
      console.log('acabou o tempo.');
      clearInterval(timer);
    }
  }, [msTimer]);

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();

  const description = (
    <>
      Aparecerá uma pergunta de quando determinado evento histórico aconteceu
      (ex.: 'Em que ano foi inventada a lâmpada?') e os jogadores então terão
      20 segundos para responder. O jogador que mais se aproximar da data correta
      é o único que não bebe!
      <br/>
      <br/>
      Se a resposta dele for exata, todos os demais bebem duas vezes
      (quem mandou chamar o nerd pro jogo? rs).
      <br />
      <br />
      Boa sorte!
    </>
  );

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  const getQuestion = () => {
    socket.pushMessage(room.code, 'question-is');
  }

  const startGame = () => {
    socket.pushMessage(room.code, 'start-game', Game.Game);
  };

  const sendGuess = (value: string | number) => {
    socket.pushMessage(room.code, 'my-guess-is', JSON.stringify({
      player: user.nickname,
      guess: value,
    }));
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/saguao',
    });
  };

  const backToRoulette = () => {
    socket.push('update-turn', room.code);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/roleta',
    });
  }

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

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
      }));
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

    socket.addEventListener('question-is', (value) => {
      setQuestion(value);
      user.isCurrentTurn && startGame();
    });

    socket.addEventListener('results', (value) => {
      setResults(JSON.parse(value));
    })

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if(room.page === Game.Game){
      startTimer();
    }
  }, [room.page]);

  useEffect(() => {
    if(results){
      setGlobalRoomPage(Game.Finish);
    }
  }, [results]);

  switch (room.page) {
    case Game.Game:
      return (
        <GamePage 
          turnVisibility={user.isCurrentTurn}
          question={question}
          timeLeft={msTimer}
          sendGuess={sendGuess}
        />
      );
    case Game.Finish:
      return (
        <FinishPage
          turnVisibility={user.isCurrentTurn}
          results={results}
          backToRoulette={backToRoulette}
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
          gamePage={getQuestion}
        />
      );
  }
}
