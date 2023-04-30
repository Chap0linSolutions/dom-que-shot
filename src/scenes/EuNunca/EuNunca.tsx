import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import coverImg from '../../assets/game-covers/eu-nunca.png';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import './EuNunca.css';

enum Game {
  Cover,
  Game,
}

export default function EuNunca() {
  const { user, room, setUser, setRoom } = useGlobalContext();

  const description = (
    <>
      O jogador da vez deve dizer em voz alta uma frase iniciada por "Eu
      nunca...", seguida por algo ou situação que pode ou não ter acontecido com algum
      dos jogadores. Se faltar criatividade, na tela do aparelho vão aparecer
      algumas sugestões.
      <br />
      <br />
      Aqueles que já passaram pela situação falada pelo jogador da vez devem
      beber uma dose. Se o jogador da vez for besta a ponto de escolher uma
      frase direcionada a algum jogador específico, este pode acusá-lo de
      marcação - e aí o jogador que falou a frase também tem de beber.
    </>
  );

  const title = 'Eu Nunca';
  const navigate = useNavigate();

  const getSuggestions = () => {
    socket.pushMessage(room.code, 'eu-nunca-suggestions', 'please');
  };

  const endOfGame = () => {
    socket.pushMessage(room.code, 'end-game', coverImg);
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  const [euNuncaSuggestions, setEuNuncaSuggestions] = useState<string[]>();

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
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

    socket.addEventListener('eu-nunca-suggestions', (suggestions) => {
      setEuNuncaSuggestions(JSON.parse(suggestions));
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
    if (euNuncaSuggestions) {
      socket.push('move-room-to', {
        roomCode: room.code,
        destination: Game.Game,
      });
    }
  }, [euNuncaSuggestions]);

  switch (room.page) {
    case Game.Game:
      return (
        <GamePage
          suggestions={euNuncaSuggestions}
          finishPage={endOfGame}
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
