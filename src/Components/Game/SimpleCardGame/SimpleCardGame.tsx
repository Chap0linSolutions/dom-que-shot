import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const turnVisibility = useLocation().state.isYourTurn;
  const ownerVisibility = useLocation().state.isOwner;
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
    socket.connect();
    socket.addEventListener('room-is-moving-to', (destination) => {
      navigate(destination, {
        state: {
          coverImg: coverImg,
          isYourTurn: turnVisibility,
          isOwner: ownerVisibility,
        },
      });
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          type="simple"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          description={description} //full game info is now loaded here
          sizeOfDescription={sizeOfDescription ? sizeOfDescription : undefined}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          gamePage={() => setCurrentGameState(Game.Hint)}
        />
      );

    case Game.Hint:
      return (
        <HintPage
          title={title}
          coverImg={coverImg}
          description={hint}
          coverPage={() => setCurrentGameState(Game.Cover)}
          gamePage={endOfGame}
        />
      );
  }
}
