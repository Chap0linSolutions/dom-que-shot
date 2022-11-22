import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Roulette from '../../components/Roulette';
import RouletteCard from '../../components/Roulette/RouletteCard';
import socketConnection from '../../lib/socket';

import EuNunca from '../../assets/game-covers/eu-nunca.png';
import Roleta from '../../assets/game-covers/roleta.png';
import Vrum from '../../assets/game-covers/vrum.png';
import BichoBebe from '../../assets/game-covers/bicho-bebe.png';
import Medusa from '../../assets/game-covers/medusa.png';
import RouletteTriangle from '../../assets/roulette-triangle.png';
import './SelectNextGame.css';

interface GameCard {
  id: number;
  text: string;
  src: string;
}

let gameList: GameCard[] = [
  {
    id: 0,
    text: 'Eu Nunca',
    src: EuNunca,
  },
  {
    id: 1,
    text: 'Roleta',
    src: Roleta,
  },
  {
    id: 2,
    text: 'Vrum',
    src: Vrum,
  },
  {
    id: 3,
    text: 'Bicho Bebe',
    src: BichoBebe,
  },
  {
    id: 4,
    text: 'Medusa',
    src: Medusa,
  },
];

export default function SelectNextGame() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const navigate = useNavigate();
  const [games, updateGames] = useState<GameCard[]>(gameList);
  const [nextGameName, setNextGameName] = useState('');

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('games-update', (newGames) => {
      updateGameList(newGames);
    });
    socket.addEventListener('roulette-number-is', (number) => {
      console.log(`A roleta sorteou o número ${number}`);
      spin(number);
    });
    socket.addEventListener('room-is-moving-to', (destination) => {
      console.log(`Movendo a sala para ${destination}.`);
      navigate(destination);
    });
    socket.push('games-update', userData.roomCode);

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const updateGameList = (newGames: string[]) => {
    let id = 0;
    gameList = games.filter((game) => newGames.includes(game.text));

    gameList.forEach((game) => {
      game.id = id;
      id++;
    });

    updateGames(gameList);
  };

  const spin = (id) => {
    gsap.to('.RouletteButton', { opacity: 0, display: 'none', duration: 0.25 });
    const timeline = gsap.timeline();
    timeline
      .to('.RouletteCard', {
        y: `-${3 * (gameList.length - 2) * 142}px`,
        duration: 1,
        ease: 'linear',
      })
      .to('.RouletteCard', {
        y: `-${(id + 4) * 142}px`,
        duration: 2,
        ease: 'elastic',
      })
      .to('.NextGameName', {
        opacity: 1,
        duration: 1,
        ease: 'power2',
      });

    const selectedGame = gameList.find((game) => game.id === id);
    const gameName = selectedGame.text;
    setNextGameName(gameName);
  };

  const turnTheWheel = () => {
    socket.push('roulette-number-is', userData.roomCode);
  };

  return (
    <Background>
      <Header goBackArrow logo />
      <div className="SelectGameSection">
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
        <p className="NextGameName">{nextGameName}</p>
        <div className="RouletteButton">
          <Button>
            <div onClick={turnTheWheel}>Girar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
