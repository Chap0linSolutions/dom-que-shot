import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import coverImg from '../../assets/game-covers/jogo-da-verdade.png';

enum Game {
  Cover,
  Game,
}

export default function JogoDaVerdade() {
  const { user, room, setUser, setRoom } = useGlobalContext();

  const gameRoom = room.code;

  const title = 'Jogo da Verdade';
  const navigateTo = useNavigate();
  const socket = SocketConnection.getInstance();

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const description = (
    <>
      O sorteado da rodada deverá decidir entre contar uma Verdade, respondendo
      a uma pergunta de forma sincera, ou virar duas doses.
      <br />
      <br />E aí? Vai escolher o que?
    </>
  );

  const startGame = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Game,
    });
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  const roulettePage = () => {
    socket.push('update-turn', room.code);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/SelectNextGame',
    });
  };

  const finishDrinking = () => {
    socket.push('players-who-drank-are', {
      roomCode: room.code,
      beers: 2,
      players: JSON.stringify([user]),
    });

    roulettePage();
  };

  useEffect(() => {
    socket.connect();
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
        return navigateTo(destination, {
          state: {
            coverImg: coverImg,
          },
        });
      }
      setGlobalRoomPage(destination);
    });

    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList = JSON.parse(reply);
      setRoom((previous) => ({
        ...previous,
        playerList: newPlayerList,
      }));
    });

    socket.addEventListener('kick-player', (nickname) => {
      if(user.nickname === nickname){
        window.localStorage.clear();
        navigateTo('/Home');
      }
    });

    if (user.isCurrentTurn) {
      socket.pushMessage(gameRoom, 'get-suggestions', '');
    }
    socket.addEventListener('get-suggestions', (suggs) => {
      setSuggestions(suggs);
    });

    socket.addEventListener('show-suggestions', () => {
      if (showSuggestions === false) {
        setShowSuggestions(true);
      }
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  const showSuggs = () => {
    socket.pushMessage(gameRoom, 'show-suggestions');
    setShowSuggestions(true);
  };

  switch (room.page) {
    case Game.Game:
      return (
        <GamePage
          suggestions={suggestions}
          finishDrinking={finishDrinking}
          showSuggestions={showSuggs}
          nextGame={roulettePage}
          show={showSuggestions}
          coverImg={coverImg}
          turnVisibility={user.isCurrentTurn}
          owner={user.isOwner}
        />
      );

    default:
      return (
        <CoverPage
          type="dynamic"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          gamePage={startGame}
          turnVisibility={user.isCurrentTurn}
          ownerVisibility={user.isOwner}
          description={description}
        />
      );
  }
}
