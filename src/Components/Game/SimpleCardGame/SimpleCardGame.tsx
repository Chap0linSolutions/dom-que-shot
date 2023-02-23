import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../contexts/GlobalContextProvider';
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

  const {user, room, setUser, setRoom} = useGlobalContext();
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const navigate = useNavigate();

  const endOfGame = () => {
    socket.pushMessage(userData.roomCode, 'end-game', coverImg);
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/WhoDrank',
    });
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = (user.nickname === ownerName);
      setUser(previous => {
        return {
          ...previous,
          isOwner: isOwner,
        }
      });
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        setRoom(previous => {
          return {
            ...previous,
            URL: destination,
            page: undefined,
          }
        });
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
    setRoom(previous => {return {...previous, page: newPage}})
  }

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
