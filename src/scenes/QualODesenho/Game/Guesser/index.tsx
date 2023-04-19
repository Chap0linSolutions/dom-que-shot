import React, {useState, useRef, useEffect, useLayoutEffect } from "react";
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Alert from '../../../../components/Alert';
import Popup from '../../../../components/Popup';
import beer from '../../../../assets/beer.png';
import gsap from "gsap";
import { draw, Path, CanvasDimensions } from '../Game';
import {
  GameDiv,
  DrawingCanvas,
  GuessesAndCanvas,
  GuessesDiv,
  Title,
  GuessInput,
  GuessInputDiv,
  Guesses,
  Guess,
  GuessesTitle,
  Timer,
  Banner,
  BannerBeer,
  Text,
  RightGuess,
} from './Guesser.style';

type Message = {
    type: 'paths' | 'everything' | 'undo' | 'clear' | 'my-canvas-width-is';
    payload?: Path[] | number;
};

interface GuesserProps {
    title: string,
    description: string | JSX.Element,
    timeLeft: number[],
    category: string,
    drawingPaths: string,
    innerWidth: number,
    canvas: CanvasDimensions,
    canvasRef: React.MutableRefObject<HTMLCanvasElement>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D>,
    interCanvasRatio: React.MutableRefObject<number>,
    paths: React.MutableRefObject<Path[]>,
    sendWinner: () => void,
    clearDrawing: () => void,
    undoLastPath: () => void,
}

export default function Guesser({title, description, timeLeft, category, drawingPaths, innerWidth, canvas, canvasRef, contextRef, interCanvasRatio, paths, sendWinner, undoLastPath, clearDrawing}: GuesserProps){
  
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [playerGuessed, setPlayerGuessed] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('Digite sua resposta...');
  const guessRef = useRef<HTMLInputElement>();
  const guidanceText = 'Aguardando o Da Vinci começar a desenhar...';
  const bannerRef = useRef(null);
  const beerRef = useRef(null);

  useLayoutEffect(() => {
    let loop = null;
    let show = gsap.to(bannerRef.current, {
      scale: 0,
      y: 200,
      duration: 0,
    });

    if(playerGuessed){
      loop = gsap.to(beerRef.current, {
        rotate: 360,
        duration: 5,
        ease: 'linear',
        repeat: -1,
      });

      show = gsap.to(bannerRef.current, {
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back',
      })
    }

    return () => {
      loop && loop.revert();
      show.revert();
    };
  }, [playerGuessed]);

  const alert = timeLeft[0] > 0
  ? (
    <Alert noButton message={guidanceText} icon={beer} />
  ) : null;

  const checkGuess = () => {            
    let guess = guessRef.current.value;           
    const formattedGuess = format(guessRef.current.value);                 
    const answer = format(category);
    if (formattedGuess === answer) {
      guessRef.current.blur();
      sendWinner();
      setPlayerGuessed(true);
      setPlaceholder('Resposta correta!');
      guess = category;
    }
    setGuesses(previous => [...previous, guess]);
    guessRef.current.value = '';
  };

  const detectKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkGuess();
    }
  };

  useEffect(() => {
      if (drawingPaths) {
        const { type, payload }: Message = JSON.parse(drawingPaths);
  
        switch (type) {
          case 'everything':
            draw(
              contextRef.current,
              payload as Path[],
              interCanvasRatio.current,
              true,
              canvasRef.current
            );
            break;
          case 'clear':
            clearDrawing();
            break;
          case 'undo':
            undoLastPath();
            break;
          case 'my-canvas-width-is':
            const ratio = canvas.width / (payload as number);
            interCanvasRatio.current = ratio;
            break;
          case 'paths':
            const newPaths = payload as Path[];
            newPaths.forEach((path) => {
              const index = paths.current.findIndex((p) => p.id === path.id);
              if (index > -1) {
                paths.current = paths.current.map((p) => {
                  if (p.id === path.id) {
                    return {
                      ...p,
                      points: path.points,
                    };
                  }
                  return p;
                });
              } else {
                paths.current.push(path);
              }
              draw(contextRef.current, [path], interCanvasRatio.current);
            });
            break;
        }
      }
  }, [drawingPaths]);

  const minutes = (timeLeft[0] < 10)
  ? `0${timeLeft[0]}`
  : `${timeLeft[0]}`;

  const seconds = (timeLeft[1] < 10)
  ? `0${timeLeft[1]}`
  : `${timeLeft[1]}`;

  return (
  <Background noImage>
      {alert}
      <Popup
          type="info"
          title={title}
          description={description}
          show={popupVisibility}
          exit={() => setPopupVisibility(false)}
          comesFromTop
      />
      <Header exit infoPage={() => setPopupVisibility(true)} />
      <GameDiv>
        <Title>E aí, que desenho é esse?</Title>
        <GuessesAndCanvas>
            <DrawingCanvas
                ref={canvasRef}
                width={canvas.width}
                height={canvas.height}
            />
            <GuessesDiv style={{
              width: innerWidth - (canvas.width + 28),
            }}>
              <GuessesTitle>
                Chutes
              </GuessesTitle>
              <Guesses>
                {guesses.map((guess, i) => {
                  if(playerGuessed && (i === guesses.length - 1)) return (
                    <RightGuess key={i}>
                      {guess}
                    </RightGuess>
                  ); 
                  return (
                    <Guess key={i}>
                      {guess}
                    </Guess>
                  );
                })}
              </Guesses>
              <Timer>
                {minutes}:{seconds}
              </Timer>
            </GuessesDiv>
        </GuessesAndCanvas>
        <GuessInputDiv>
            <GuessInput
              disabled={playerGuessed}
              ref={guessRef}
              autoComplete="off"
              placeholder={placeholder}
              style={{width: canvas.width}}
              onKeyDown={detectKeyDown}
            />
            <Button isDisabled={playerGuessed} borderRadius='0 10px 10px 0' width={`${innerWidth - (canvas.width + 28)}px`} height="50px" onClick={checkGuess}>
                Enviar
            </Button>
        </GuessInputDiv>
        <Banner ref={bannerRef}>
          <BannerBeer ref={beerRef} src={beer}/>
          <Text>
            Você acertou!<br/>Aguardando...
          </Text>
        </Banner>
      </GameDiv>
  </Background>
  );
}

const format = (input) => {
  const output = input
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/,/g, '')
    .replace(/-/g, '')
    .replace(/á/g, 'a')
    .replace(/â/g, 'a')
    .replace(/ã/g, 'a')
    .replace(/é/g, 'e')
    .replace(/ê/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ô/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ç/g, 'c')
  return output;
};