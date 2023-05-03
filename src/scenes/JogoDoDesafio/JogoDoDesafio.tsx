import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import coverImg from '../../assets/game-covers/jogo-do-desafio.png';

enum Game {
  Cover,
  Game,
}

export default function JogoDoDesafio() {
  const { user, room, setUser, setRoom } = useGlobalContext();

  const gameRoom = room.code;

  const title = 'Jogo do Desafio';
  const navigate = useNavigate();
  const socket = SocketConnection.getInstance();

  const [suggestions, setSuggestions] = useState<string[]>();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const description = (
    <>
      O jogador da vez deverá decidir entre realizar um dos desafios sugeridos
      pelo jogo ou virar duas doses.
      <br />
      <br />E aí? Vai escolher o que?
    </>
  );

  const getSuggestions = () => {
    socket.pushMessage(room.code, 'desafio-suggestions', 'please');
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

  const showSuggs = () => {
    socket.pushMessage(gameRoom, 'show-suggestions');
    setShowSuggestions(true);
  };

  const finishDrinking = () => {
    socket.push('players-who-drank-are', {
      roomCode: room.code,
      beers: 2,
      players: JSON.stringify([user]),
    });

    roulettePage();
  };

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    socket.connect(room.code);
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

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        setRoom((previous) => ({
          ...previous,
          URL: destination,
          page: undefined,
        }));
        return navigate(destination, {
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

    socket.addEventListener('desafio-suggestions', (suggs) => {
      setSuggestions(JSON.parse(suggs));
    });

    socket.addEventListener('show-suggestions', () => {
      if (!showSuggestions) setShowSuggestions(true);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  useEffect(() => {
    if (user.isCurrentTurn && suggestions) {
      socket.push('move-room-to', {
        roomCode: room.code,
        destination: Game.Game,
      });
    }
  }, [suggestions]);

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
          gamePage={getSuggestions}
          turnVisibility={user.isCurrentTurn}
          ownerVisibility={user.isOwner}
          description={description}
        />
      );
  }
}
