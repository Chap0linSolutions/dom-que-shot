import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const turnVisibility = useLocation().state.isYourTurn;
  const ownerVisibility = useLocation().state.isOwner;

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
      roomCode: userData.roomCode,
      destination: Game.Game,
    });
  };

  const endOfGame = () => {
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

  const [euNuncaSuggestions, setEuNuncaSuggestions] = useState<string[]>();

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        return navigate(destination, {
          state: {
            coverImg: coverImg,
            isYourTurn: turnVisibility,
            isOwner: ownerVisibility,
          },
        });
      }
      setCurrentGameState(destination);
    });

    socket.addEventListener('eu-nunca-suggestions', (suggestions) => {
      console.log('Recebidas as sugestões de Eu Nunca do backend.');
      setEuNuncaSuggestions(suggestions);
    });

    socket.push('eu-nunca-suggestions', 'please');

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          type="dynamic"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          gamePage={startGame}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          description={description} //full game info is now loaded here
        />
      );

    case Game.Game:
      return (
        <GamePage
          suggestions={euNuncaSuggestions}
          finishPage={endOfGame}
          coverImg={coverImg}
          turnVisibility={turnVisibility}
        />
      );

    default:
      return (
        <Background>
          <div>Erro!</div>
        </Background>
      );
  }
}
