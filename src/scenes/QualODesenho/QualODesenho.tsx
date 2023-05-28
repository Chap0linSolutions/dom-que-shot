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

export enum Game {
  Cover,
  Word,
  Game,
  Finish,
}

export default function QualODesenho() {
  const { user, room, setUser, setRoom } = useGlobalContext();
  const title = 'Qual é o desenho?';

  const navigate = useNavigate();
  const [gameCanStart, setGameStart] = useState<boolean>(false);
  const [word, setWord] = useState<string>(undefined);
  const [finalResults, setFinalResults] = useState<boolean>(false);
  const [drawingPaths, setDrawingPaths] = useState<string>();
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [playersAndGuesses, setPlayersAndGuesses] = useState<GuessingPlayer[]>(
    []
  );

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho. O jogador da
      vez vai escolher uma palavra para desenhar (pode ser um animal, um objeto,
      dentre outros) e terá 1 minuto para finalizar o desenho.
      <br />
      <br />
      Os que não acertarem dentro do tempo BEBEM; Se ninguém acertar, o jogador
      da vez BEBE.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const startWordSelection = () => {
    socket.pushMessage(room.code, 'que-desenho-suggestions', user.nickname);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Word,
    });
  };

  const startGame = () => {
    socket.pushMessage(room.code, 'start-game');
  };

  const finishGame = () => {
    user.isCurrentTurn &&
      socket.push('move-room-to', {
        roomCode: room.code,
        destination: Game.Finish,
      });
  };

  const timesUp = () => {
    socket.pushMessage(room.code, 'times-up');
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  const sendWinner = (t: number) => {
    const winner = JSON.stringify({
      nickname: user.nickname,
      time: (60000 - t) / 1000,
    });
    socket.pushMessage(room.code, 'correct-guess', winner);
  };

  const backToRoulette = () => {
    socket.push('update-turn', room.code);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/roleta',
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

  useEffect(() => {
    window.history.replaceState({}, 'Dom Que Shot', process.env.VITE_REACT_APP_ADRESS);
  }, []);

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

    socket.addEventListener('start-game', () => {
      setGameStart(true);
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
          gameCanStart={gameCanStart}
          startGame={startGame}
          updateDrawingPaths={sendDrawingUpdate}
          sendWinner={sendWinner}
          drawingPaths={drawingPaths}
          room={room}
          timesUp={timesUp}
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
