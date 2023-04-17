import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, useGlobalContext } from '../../contexts/GlobalContextProvider';
import gsap from 'gsap';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Roulette from '../../components/Roulette';
import RouletteCard from '../../components/Roulette/RouletteCard';
import SocketConnection from '../../lib/socket';
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

export default function SelectNextGame() {
  const { user, setUser, room, setRoom } = useGlobalContext();
  let nextGame = '';

  const navigate = useNavigate();
  const [nextGameName, setNextGameName] = useState('');
  const [number, setNumber] = useState<number>(-1);

  const [rouletteIsSpinning, setRouletteIsSpinning] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<string>();

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList: Player[] = JSON.parse(reply);
      setRoom((previous) => ({
        ...previous,
        playerList: newPlayerList,
      }));
    });

    socket.addEventListener('player-turn-is', (turnName) => {
      setUser((previous) => ({
        ...previous,
        isCurrentTurn: user.nickname === turnName,
      }));
      setCurrentPlayer(turnName);
    });

    socket.pushMessage(room.code, 'player-turn-is', null);

    socket.addEventListener('room-owner-is', (ownerName) => {
      setUser((previous) => ({
        ...previous,
        isOwner: user.nickname === ownerName,
      }));
    });

    socket.addEventListener('roulette-number-is', (number) => {
      console.log(`A roleta sorteou o número ${number}.`);
      setNumber(number);
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      setRoom((previous) => ({
        ...previous,
        URL: destination,
      }));
      navigate(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (number >= 0) {
      spin(number);
    }
  }, [number]);

  useEffect(() => {
    if (!rouletteIsSpinning && nextGameName !== '') {
      startSelectedGame();
    }
  }, [rouletteIsSpinning]);

  const startSelectedGame = () => {
    if (user.isCurrentTurn === true) {
      setTimeout(() => {
        socket.pushMessage(room.code, 'start-game', nextGameName);
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
    return () => {
      if (animation.current) {
        animation.current.kill();
      }
    };
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
  const animation = useRef<gsap.core.Timeline>();

  const spin = (id) => {
    const selectedGame = room.gameList.find((game) => game.id === id);
    nextGame = selectedGame.title;
    setNextGameName(nextGame);

    setRouletteIsSpinning(true);
    gsap.to(rouletteButton.current, {
      opacity: 0,
      display: 'none',
      duration: 0.25,
    });
    animation.current = gsap
      .timeline()
      .to('.rouletteCard', {
        y: `-${
          3 * (room.gameList.length - 2) * (rouletteDimensions.cardSize + 2)
        }px`,
        duration: 1,
        ease: 'linear',
      })
      .to('.rouletteCard', {
        y: `-${
          (room.gameList.length - 1 + id) * (rouletteDimensions.cardSize + 2)
        }px`,
        duration: 2,
        ease: 'elastic',
      })
      .to(nextGameTitle.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2',
      })
      .call(() => setRouletteIsSpinning(false));
  };

  const turnTheWheel = () => {
    socket.pushMessage(room.code, 'roulette-number-is', null);
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  const header =
    user.isOwner === true ? (
      <Header goBackArrow={backToLobby} roomCode logo />
    ) : (
      <Header roomCode logo />
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
              {room.gameList.map((rouletteCard, index) => (
                <Card key={index} className="rouletteCard">
                  <RouletteCard
                    width={
                      innerHeight > 740
                        ? rouletteDimensions.cardSize
                        : sizeConstant * rouletteDimensions.cardSize
                    }
                    height={rouletteDimensions.cardSize}
                    text={rouletteCard.title}
                    src={rouletteCard.src}
                  />
                </Card>
              ))}
              {room.gameList.map((rouletteCard, index) => (
                <Card key={index} className="rouletteCard">
                  <RouletteCard
                    width={
                      innerHeight > 740
                        ? rouletteDimensions.cardSize
                        : sizeConstant * rouletteDimensions.cardSize
                    }
                    height={rouletteDimensions.cardSize}
                    text={rouletteCard.title}
                    src={rouletteCard.src}
                  />
                </Card>
              ))}
              {room.gameList.map((rouletteCard, index) => (
                <Card key={index} className="rouletteCard">
                  <RouletteCard
                    width={
                      innerHeight > 740
                        ? rouletteDimensions.cardSize
                        : sizeConstant * rouletteDimensions.cardSize
                    }
                    height={rouletteDimensions.cardSize}
                    text={rouletteCard.title}
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
              currentPlayer !== user.nickname && nextGameName === ''
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
            currentPlayer === user.nickname
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
