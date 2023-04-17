import React, {useState, useRef, useEffect } from "react";
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Alert from '../../../../components/Alert';
import Popup from '../../../../components/Popup';
import beer from '../../../../assets/beer.png';
import { draw, Path, CanvasDimensions } from '../Game';
import {
  GameDiv,
  DrawingCanvas,
  GuessingDiv,
  GuessesDiv,
  GuessTitle,
  GuessInput,
  GuessInputDiv,
} from './Guesser.style';

type Message = {
    type: 'paths' | 'everything' | 'undo' | 'clear' | 'my-canvas-width-is';
    payload?: Path[] | number;
};

interface GuesserProps {
    title: string,
    description: string | JSX.Element,
    msTimeLeft: number,
    category: string,
    drawingPaths: string;
    canvas: CanvasDimensions,
    canvasRef: React.MutableRefObject<HTMLCanvasElement>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D>,
    interCanvasRatio: React.MutableRefObject<number>,
    paths: React.MutableRefObject<Path[]>,
    sendWinner: () => void,
    goToRankingPage: () => void,
    clearDrawing: () => void,
    undoLastPath: () => void,
}

export default function Guesser({title, description, msTimeLeft, category, drawingPaths, canvas, canvasRef, contextRef, interCanvasRatio, paths, sendWinner, goToRankingPage, undoLastPath, clearDrawing}: GuesserProps){
  
    const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
    const guesses = useRef<string[]>([]);
    const guessRef = useRef<HTMLInputElement>();
    const guidanceText = 'Aguardando o Da Vinci começar a desenhar...';

    const alert = msTimeLeft === 60000
    ? (
      <Alert noButton message={guidanceText} icon={beer} />
    ) : null;

    const checkGuess = () => {                       
      const guess = format(guessRef.current.value);                 
      const answer = format(category);
      if (guess === answer) {
          sendWinner();
          goToRankingPage();
          return;
      }
      guesses.current.push(guess);
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


    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown);
        return () => {
            document.removeEventListener('keydown', detectKeyDown);
        };
    }, [guessRef]);


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
        <Header infoPage={() => setPopupVisibility(true)} />
        <GameDiv>
            <GuessTitle>Qual é o desenho?</GuessTitle>
            <GuessingDiv>
                <GuessesDiv
                    style={{
                        width: innerWidth - (canvas.width + 32),
                    }}>
                    {guesses.current.map((guess) => {
                        return (
                        <span>
                            {guess}
                            <br />
                        </span>
                        );
                    })}
                </GuessesDiv>
                <DrawingCanvas
                    ref={canvasRef}
                    width={canvas.width}
                    height={canvas.height}
                />
            </GuessingDiv>
            <GuessInputDiv>
                <GuessInput ref={guessRef} placeholder="Digite sua resposta..." />
                <Button width="120px" height="40px" onClick={checkGuess}>
                    Enviar
                </Button>
            </GuessInputDiv>
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