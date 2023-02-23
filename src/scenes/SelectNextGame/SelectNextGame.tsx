import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import Background from '../../components/Background';
import Header from '../../components/Header';
import Roulette from '../../components/Roulette';
import RouletteCard from '../../components/Roulette/RouletteCard';
import SocketConnection from '../../lib/socket';
import gameList from '../../contexts/games';
import Button from '../../components/Button';
import RouletteTriangle from '../../assets/roulette-triangle.png';
import {
  SelectGameDiv,
  RouletteDiv,
  SideIconSpace,
  SideIcon,
  Card,
  NextGameName,
  ButtonDiv,
  ContentDiv,
  WaitingMessageDiv,
  WaitingMessage,
} from './styles';

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

  //ajuste com o tamanho da tela///////////////////////////////////////////////////////////////

  const sizeConstant = 1.25;

  type rouletteProps = {
    cardSize: number;
    width: number;
    height: number;
  };

  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [rouletteDimensions, setRouletteDimensions] = useState<rouletteProps>({
    cardSize: 140,
    width: 168,
    height: 428,
  });

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const baseSize = Math.round(innerHeight / 6);

    setRouletteDimensions({
      cardSize: baseSize,
      height: 3 * baseSize + 8,
      width: innerHeight > 740 ? baseSize + 28 : sizeConstant * baseSize + 28,
    });
  }, [innerHeight]);

  ///////////////////////////////////////////////////////////////////////////////////////////

  const rouletteButton = useRef();
  const nextGameTitle = useRef();

  const spin = (id) => {
    console.log(games.map((game) => game.text));
    const selectedGame = games.find((game) => game.id === id);
    nextGame = selectedGame.text;
    setNextGameName(nextGame);

    setRouletteIsSpinning(true);
    gsap.to(rouletteButton.current, {
      opacity: 0,
      display: 'none',
      duration: 0.25,
    });
    const timeline = gsap.timeline();
    timeline
      .to('.rouletteCard', {
        y: `-${3 * (games.length - 2) * (rouletteDimensions.cardSize + 2)}px`,
        duration: 1,
        ease: 'linear',
      })
      .to('.rouletteCard', {
        y: `-${(games.length - 1 + id) * (rouletteDimensions.cardSize + 2)}px`,
        duration: 2,
        ease: 'elastic',
      })
      .to(nextGameTitle.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2',
      })
      .call(startSelectedGame);
  };

  const turnTheWheel = () => {
    socket.pushMessage(userData.roomCode, 'roulette-number-is', null);
    //socket.push('roulette-number-is', userData.roomCode);
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
      <SelectGameDiv>
        <ContentDiv>
          <RouletteDiv>
            <SideIconSpace>&nbsp;</SideIconSpace>
            <Roulette
              width={rouletteDimensions.width}
              height={rouletteDimensions.height}>
              {games.map((rouletteCard, index) => (
                <Card key={index} className="rouletteCard">
                  <RouletteCard
                    width={
                      innerHeight > 740
                        ? rouletteDimensions.cardSize
                        : sizeConstant * rouletteDimensions.cardSize
                    }
                    height={rouletteDimensions.cardSize}
                    text={rouletteCard.text}
                    src={rouletteCard.src}
                  />
                </Card>
              ))}
              {games.map((rouletteCard, index) => (
                <Card key={index} className="rouletteCard">
                  <RouletteCard
                    width={
                      innerHeight > 740
                        ? rouletteDimensions.cardSize
                        : sizeConstant * rouletteDimensions.cardSize
                    }
                    height={rouletteDimensions.cardSize}
                    text={rouletteCard.text}
                    src={rouletteCard.src}
                  />
                </Card>
              ))}
              {games.map((rouletteCard, index) => (
                <Card key={index} className="rouletteCard">
                  <RouletteCard
                    width={
                      innerHeight > 740
                        ? rouletteDimensions.cardSize
                        : sizeConstant * rouletteDimensions.cardSize
                    }
                    height={rouletteDimensions.cardSize}
                    text={rouletteCard.text}
                    src={rouletteCard.src}
                  />
                </Card>
              ))}
            </Roulette>

            <SideIconSpace>
              <SideIcon src={RouletteTriangle} />
            </SideIconSpace>
          </RouletteDiv>

          <WaitingMessageDiv
            style={
              turnVisibility === Visibility.Invisible && !rouletteIsSpinning
                ? { visibility: 'visible' }
                : { display: 'none' }
            }>
            <WaitingMessage>
              Aguardando {currentPlayer}
              <br />
              girar a roleta...
            </WaitingMessage>
          </WaitingMessageDiv>
          <NextGameName ref={nextGameTitle}>{nextGameName}</NextGameName>
        </ContentDiv>

        <ButtonDiv
          ref={rouletteButton}
          style={
            turnVisibility === Visibility.Visible
              ? { visibility: 'visible' }
              : { display: 'none' }
          }>
          <Button staysOnBottom onClick={turnTheWheel}>
            Girar
          </Button>
        </ButtonDiv>
      </SelectGameDiv>
    </Background>
  );
}
