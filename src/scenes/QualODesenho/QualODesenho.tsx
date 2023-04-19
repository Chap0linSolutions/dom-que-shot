import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import coverImg from '../../assets/game-covers/qual-o-desenho.png';
import GamePage from './Game';
import RankingPage from './Ranking';
import WordPage from './Word';

export interface GuessingPlayer {
  id: string;
  nickname: string;
  avatarSeed: string;
  guessTime: number;
}

enum Game {
  Cover,
  Word,
  Game,
  Finish,
}

const GAME_DURATION = 60000;
const DELTA_TIME = 500;

export default function QualODesenho() {
  const { user, room, setUser, setRoom } = useGlobalContext();
  const title = 'Qual é o desenho?';

  const navigate = useNavigate();
  const [word, setWord] = useState<string>(undefined);
  const [finalResults, setFinalResults] = useState<boolean>(false);
  const [drawingPaths, setDrawingPaths] = useState<string>();
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [playersAndGuesses, setPlayersAndGuesses] = useState<GuessingPlayer[]>([]);

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho. O jogador da
      vez vai escolher uma palavra para desenhar (pode ser um animal, um objeto,
      dentre outros) e terá 1 minuto para finalizar o desenho.
      <br />
      <br />
      - Os que não acertarem dentro do tempo BEBEM; - Se ninguém acertar, o
      jogador da vez BEBE.
      <br />
      <br />
      Boa sorte!
    </>
  );

  //TIMER//////////////////////////////////////////////////////////////////////////////////

  

  const [msTimer, setMsTimer] = useState(GAME_DURATION);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, DELTA_TIME));
  };

  const run = () => {
    setMsTimer(previous => ((previous > 0)
      ? previous - DELTA_TIME
      : previous
    ));
  };

  useEffect(() => {
    if(msTimer === 0 || room.page === Game.Finish){
      if(user.isCurrentTurn){
        console.log('acabou o tempo do jogo.');
        socket.pushMessage(room.code, 'times-up');
      }
      clearInterval(timer);
    }
  }, [msTimer, room.page]);

  ////////////////////////////////////////////////////////////////////////////////////////

  const startWordSelection = () => {
    socket.pushMessage(room.code, 'que-desenho-suggestions');
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Word,
    });
  };

  const startGame = () => {
    socket.pushMessage(room.code, 'start-game');
  };

  const finishGame = () => {
    user.isCurrentTurn && socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Finish,
    });
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  const sendWinner = () => {
    const winner = JSON.stringify({nickname: user.nickname, time: (60000 - msTimer)/1000});
    socket.pushMessage(room.code, 'correct-guess', winner);
    clearInterval(timer);
  };

  const backToRoulette = () => {
    socket.push('update-turn', room.code);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/SelectNextGame',
    });
  };

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  const selectWord = (word: string) => {
    console.log(`palavra selecionada: ${word}`);
    setWord(word);
    socket.pushMessage(room.code, 'game-word-is', word);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Game,
    });
  };

  const sendDrawingUpdate = (stringifiedArray: string) => {
    socket.pushMessage(room.code, 'drawing-points', stringifiedArray);
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

    socket.addEventListener('updated-winners', (winners: string) => {
      setPlayersAndGuesses(JSON.parse(winners));
    });

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
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

    socket.addEventListener('start-game', () => {
      startTimer();
    });

    if (!user.isCurrentTurn) {
      socket.addEventListener('drawing-points', (DPs) => {
        setDrawingPaths(DPs);
      });
    }

    socket.addEventListener('que-desenho-suggestions', (suggestions) => {
      setWordSuggestions(suggestions);
    });

    socket.addEventListener('game-word-is', (word) => {
      setWord(word);
    });

    socket.addEventListener('results', (results) => {
      setPlayersAndGuesses(JSON.parse(results));
      finishGame();
      setFinalResults(true);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  switch (room.page) {
    case Game.Word:
      return (
        <WordPage
          title={title}
          description={description}
          suggestions={wordSuggestions}
          setWord={selectWord}
          turnVisibility={user.isCurrentTurn}
        />
      );

    case Game.Game:
      return (
        <GamePage
          title={title}
          description={description}
          category={word}
          turnVisibility={user.isCurrentTurn}
          msTimeLeft={msTimer}
          startGame={startGame}
          updateDrawingPaths={sendDrawingUpdate}
          sendWinner={sendWinner}
          drawingPaths={drawingPaths}
        />
      );

    case Game.Finish:
      return (
        <RankingPage
          data={playersAndGuesses}
          turnVisibility={user.isCurrentTurn}
          roulettePage={() => backToRoulette()}
          word={word}
          finalResults={finalResults}
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
          gamePage={startWordSelection}
        />
      );
  }
}
