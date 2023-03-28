import React, { useEffect, useState, useRef } from 'react';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import Popup from '../../../components/Popup';
import beer from '../../../assets/beer.png';
import {
  GameDiv,
  DrawingDiv,
  DrawingCanvas,
  GuessingDiv,
  WordDiv,
  GuessesDiv,
  GuessTitle,
  GuessInput,
  GuessInputDiv,
} from './Game.style';

interface GameProps {
  title: string;
  msTimeLeft: number;
  description: string | JSX.Element;
  turnVisibility: boolean;
  category: string;
  startGame: () => void;
}

type Coordinates = {
  x: number,
  y: number,
}

type CanvasDimensions = {
  width: number,
  height: number,
}

export default function GamePage({
  title,
  description,
  category,
  turnVisibility,
  msTimeLeft,
  startGame,
}: GameProps) {
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>();
  const contextRef = useRef<CanvasRenderingContext2D>();

  const sizeRef = useRef<HTMLDivElement>();
  



  
  //ajuste com o tamanho da tela///////////////////////////////////////////////////////////////

  const sizeConstant = 0.7;

  const [canvasOffsetX, setCanvasOffsetX] = useState(0);
  const [canvasOffsetY, setCanvasOffsetY] = useState(0);
  const [innerWidth, setInnerWidth] = useState<number>((window.innerWidth < 500)? window.innerWidth : 412);
  const [canvas, setCanvas] = useState<CanvasDimensions>(() => {
    const innerW = window.innerWidth < 500? window.innerWidth: 412;
    console.log(innerW);
    return (turnVisibility)
    ? {
        width: (innerW - 56),
        height: (innerW - 56) / sizeConstant,
      }
    : {
        width: sizeConstant * (innerW - 32),
        height: (innerW - 32),
      }
  });

  const handleResize = () => {
      setInnerWidth((window.innerWidth < 500)
        ? window.innerWidth
        : 412
      );
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCanvas(getCanvasSize);
    setCanvasOffsetX(canvasRef.current.offsetLeft);
    setCanvasOffsetY(canvasRef.current.offsetTop);
  }, [innerWidth]);

  const getCanvasSize = () => {
    return (turnVisibility)
    ? {
        width: (innerWidth - 56),
        height: (innerWidth - 56) / sizeConstant,
      }
    : {
        width: sizeConstant * (innerWidth - 32),
        height: (innerWidth - 32),
      }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  const guidanceText = (turnVisibility)
  ? 'Pronto? Aperte o botão abaixo e pode começar!'
  : 'Aguardando o Da Vinci começar a desenhar...';

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = 'white';
    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);

  function startMouseDrawing(e: React.MouseEvent) {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function startTouchDrawing(e: React.TouchEvent) {
    const offsetX = e.touches[0].clientX - canvasOffsetX;
    const offsetY = e.touches[0].clientY - canvasOffsetY;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function mouseDrawing(e: React.MouseEvent) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  function touchDrawing(e: React.TouchEvent) {
    if (!isDrawing) return;
    const offsetX = e.touches[0].clientX - canvasOffsetX;
    const offsetY = e.touches[0].clientY - canvasOffsetY;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  function finishDrawing() {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  function clearDrawing() {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  if (turnVisibility) {
    return (
      <Background noImage>
        <Popup
          title={title}
          description={description}
          show={popupVisibility}
          exit={() => setPopupVisibility(false)}
          comesFromTop
        />
        <Header infoPage={() => setPopupVisibility(true)} />
        <Alert message={guidanceText} buttonText="Pronto!" onButtonClick={startGame}/>
        <GameDiv>
            <DrawingDiv ref={sizeRef}>
              <WordDiv>{category}</WordDiv>
              <DrawingCanvas
                width={canvas.width}
                height={canvas.height}
                ref={canvasRef}
                onMouseDown={startMouseDrawing}
                onTouchStart={startTouchDrawing}
                onMouseMove={mouseDrawing}
                onTouchMove={touchDrawing}
                onMouseUp={finishDrawing}
                onTouchEnd={finishDrawing}
              />
              <Button onClick={clearDrawing}>
                Recomeçar
              </Button>
            </DrawingDiv>
        </GameDiv>
      </Background>
    );
  } 

  const alert = (msTimeLeft === 60000)
  ? <Alert noButton message={guidanceText} icon={beer}/>
  : null;

  return (
    <Background noImage>
      {alert}
      <Popup
        title={title}
        description={description}
        show={popupVisibility}
        exit={() => setPopupVisibility(false)}
        comesFromTop
      />
      <Header infoPage={() => setPopupVisibility(true)} />
      <GameDiv>
          <GuessTitle>
            Qual é o desenho?
          </GuessTitle>
          <GuessingDiv ref={sizeRef}>
            <GuessesDiv
              style={{
                width: innerWidth - (canvas.width + 32),
              }}
            />
            <DrawingCanvas
              ref={canvasRef}
              width={canvas.width}
              height={canvas.height}
            /> 
          </GuessingDiv>
          <GuessInputDiv>
            <GuessInput
              placeholder="Digite sua resposta..."
            />
            <Button width='120px' height='40px'>Enviar</Button>
          </GuessInputDiv>
      </GameDiv>
    </Background>
  )
}
