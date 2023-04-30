import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Player,
  useGlobalContext,
} from '../../../contexts/GlobalContextProvider';
import SocketConnection from '../../../lib/socket';
import CoverPage from '../Cover';
import HintPage from '../Hint';
import './SimpleCardGame.css';

enum Game {
  Cover,
  Hint,
}

interface SimpleCardGameProps {
  title: string;
  description: string | JSX.Element;
  hint: string | JSX.Element;
  sizeOfDescription?: number;
  coverImg: string;
}

export default function SimpleCardGame({
  title,
  description,
  hint,
  sizeOfDescription,
  coverImg,
}: SimpleCardGameProps) {
  const { user, room, setUser, setRoom } = useGlobalContext();
  const navigate = useNavigate();

  const endOfGame = () => {
    socket.pushMessage(room.code, 'end-game', null);
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList: Player[] = JSON.parse(reply);
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
        return navigate(destination, {
          state: {
            coverImg: coverImg,
          },
        });
      }
      setGlobalRoomPage(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  switch (room.page) {
    case Game.Hint:
      return (
        <HintPage
          title={title}
          coverImg={coverImg}
          description={hint}
          coverPage={() => setGlobalRoomPage(Game.Cover)}
          gamePage={endOfGame}
        />
      );
    default:
      return (
        <CoverPage
          type="simple"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          description={description}
          sizeOfDescription={sizeOfDescription ? sizeOfDescription : undefined}
          turnVisibility={user.isCurrentTurn}
          ownerVisibility={user.isOwner}
          gamePage={() => setGlobalRoomPage(Game.Hint)}
        />
      );
  }
}
