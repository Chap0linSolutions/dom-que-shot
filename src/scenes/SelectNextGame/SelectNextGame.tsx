import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Roulette from '../../components/Roulette';
import RouletteCard from '../../components/Roulette/RouletteCard';
import PingTracker from '../../components/Debug/PingTracker';
import SocketConnection from '../../lib/socket';
import gameList from '../../contexts/games';

import RouletteTriangle from '../../assets/roulette-triangle.png';
import './SelectNextGame.css';

enum Visibility {
  Invisible,
  Visible,
}

interface GameCard {
  id: number;
  text: string;
  src: string;
}

export default function SelectNextGame() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  let nextGame = '';

  const navigate = useNavigate();
  const [nextGameName, setNextGameName] = useState('');
  const [games, updateGames] = useState<GameCard[]>(gameList);
  const [number, setNumber] = useState<number>(-1);

  const [turnVisibility, setTurnVisibility] = useState<Visibility>(
    Visibility.Invisible
  );
  const [ownerVisibility, setOwnerVisibility] = useState<Visibility>(
    Visibility.Invisible
  );
  const [rouletteIsSpinning, setRouletteIsSpinning] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<string>();

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();
  let isMyTurn = false;

  useEffect(() => {
    socket.addEventListener('player-turn', (turnID) => {
      socket.push('get-player-name-by-id', turnID);
      if (turnID === socket.socket.id) {
        setTurnVisibility(Visibility.Visible);
        isMyTurn = true;
      }
    });
    socket.push('player-turn', userData.roomCode);

    socket.addEventListener('room-owner-is', (ownerID) => {
      console.log();
      if (ownerID === socket.socket.id) {
        setOwnerVisibility(Visibility.Visible);
      }
    });
    socket.push('room-owner-is', userData.roomCode);

    socket.addEventListener('player-name', (playerName) => {
      setCurrentPlayer(playerName);
    });

    socket.addEventListener('games-update', (newGames) => {
      updateGameList(newGames);
    });

    socket.addEventListener('roulette-number-is', (number) => {
      console.log(`A roleta sorteou o número ${number}`);
      setNumber(number);
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      console.log(`Movendo a sala para ${destination}.`);
      navigate(destination, {
        state: {
          isYourTurn: isMyTurn,
          isOwner: ownerVisibility === Visibility.Visible ? true : false,
        },
      });
    });
    socket.push('games-update', userData.roomCode);

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const updateGameList = (newGames: string[]) => {
    let id = -1;
    const rouletteGames = games.filter((game) => newGames.includes(game.text));
    //console.log(rouletteGames.map((game) => game.text));

    updateGames(
      rouletteGames.map((game) => {
        id += 1;
        return { ...game, id: id };
      })
    );
  };

  useEffect(() => {
    if (number >= 0) {
      console.log(games.map((game) => game.text));
      console.log(number);
      spin(number);
    }
  }, [number]);

  const startSelectedGame = () => {
    if (ownerVisibility === Visibility.Visible) {
      setTimeout(() => {
        socket.push('start-game', {
          roomCode: userData.roomCode,
          nextGame: nextGame,
        });
      }, 1000);
    }
  };

  const spin = (id) => {
    console.log(games.map((game) => game.text));
    const selectedGame = games.find((game) => game.id === id);
    nextGame = selectedGame.text;
    setNextGameName(nextGame);

    setRouletteIsSpinning(true);
    gsap.to('.RouletteButton', { opacity: 0, display: 'none', duration: 0.25 });
    const timeline = gsap.timeline();
    const heightOffset = window.innerHeight < 720 ? 112 : 142;
    timeline
      .to('.RouletteCard', {
        y: `-${3 * (games.length - 2) * heightOffset}px`,
        duration: 1,
        ease: 'linear',
      })
      .to('.RouletteCard', {
        y: `-${(games.length - 1 + id) * heightOffset}px`,
        duration: 2,
        ease: 'elastic',
      })
      .to('.NextGameName', {
        opacity: 1,
        duration: 1,
        ease: 'power2',
      })
      .call(startSelectedGame);
  };

  const turnTheWheel = () => {
    socket.push('roulette-number-is', userData.roomCode);
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  const header =
    ownerVisibility === Visibility.Visible ? (
      <Header goBackArrow={backToLobby} logo />
    ) : (
      <Header logo />
    );

  return (
    <Background>
      {header}
      <div className="SelectGameSection" id="RoulettePage">
        <div className="RouletteDiv">
          <div className="RouletteSideIconSpace" />
          <Roulette>
            {games.map((rouletteCard, index) => (
              <div key={index} className="RouletteCard">
                <RouletteCard text={rouletteCard.text} src={rouletteCard.src} />
              </div>
            ))}
            {games.map((rouletteCard, index) => (
              <div key={index} className="RouletteCard">
                <RouletteCard text={rouletteCard.text} src={rouletteCard.src} />
              </div>
            ))}
            {games.map((rouletteCard, index) => (
              <div key={index} className="RouletteCard">
                <RouletteCard text={rouletteCard.text} src={rouletteCard.src} />
              </div>
            ))}
          </Roulette>

          <div className="RouletteSideIconSpace">
            <img src={RouletteTriangle} width="40px" height="44px" />
          </div>
        </div>
        <div
          className="WaitingMessageDiv"
          style={
            turnVisibility === Visibility.Invisible && !rouletteIsSpinning
              ? { visibility: 'visible' }
              : { display: 'none', height: 0, margin: 0 }
          }>
          <p className="WaitingMessage">
            Aguardando {currentPlayer}
            <br />
            girar a roleta...
          </p>
        </div>
        <p className="NextGameName">{nextGameName}</p>
        <div
          className="RouletteButton"
          style={
            turnVisibility === Visibility.Visible
              ? { visibility: 'visible' }
              : { visibility: 'hidden', height: 0, margin: 0 }
          }>
          <Button onClick={turnTheWheel}>Girar</Button>
        </div>
      </div>
      <PingTracker />
    </Background>
  );
}
