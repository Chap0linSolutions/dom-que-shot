import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import coverImg from '../../assets/game-covers/eu-nunca.png';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import './EuNunca.css';

enum Game {
  Cover,
  Game,
}

export default function EuNunca() {

  const { user, room, setRoom } = useGlobalContext();

  const description = (
    <>
      Este jogo deve ser jogado fora do aparelho, mas pode contar com o auxílio
      dele. Funciona assim:
      <br />
      <br />
      O jogador da vez deve dizer em voz alta uma frase iniciada por "Eu
      nunca...", seguida por algo ou situação que pode ter acontecido com algum
      dos jogadores. Se faltar criatividade, na tela do celular vão aparecer
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

  const startGame = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Game,
    });
  };

  const endOfGame = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/WhoDrank',
    });
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

    socket.addEventListener('eu-nunca-suggestions', (suggestions) => {
      setEuNuncaSuggestions(suggestions);
    });

    socket.push('eu-nunca-suggestions', 'please');

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom(previous => {return {...previous, page: newPage}})
  }

  switch (room.page) {
    case Game.Game:
      return (
        <GamePage
          suggestions={euNuncaSuggestions}
          finishPage={endOfGame}
          coverImg={coverImg}
          turnVisibility={user.isCurrentTurn}
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
          description={description} //full game info is now loaded here
        />
      );
  }
}
