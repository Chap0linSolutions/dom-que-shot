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
  drawingPaths: string;
  updateDrawingPaths: (value: string) => void;
  startGame: () => void;
}

type Coordinates = {
  x: number,
  y: number,
}

type Path = {
  color: string,
  points: Coordinates[];
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
  drawingPaths,
  updateDrawingPaths,
  startGame,
}: GameProps) {
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>();
  const contextRef = useRef<CanvasRenderingContext2D>();

  const sizeRef = useRef<HTMLDivElement>();
  
  const counter = useRef<number>(119000);
  const oldLength = useRef<number>(0);
  const paths = useRef<Path[]>([]);

  useEffect(() => {
    if(counter.current > msTimeLeft){
      counter.current -= 1000;
      if(paths.current.length > 0){
        const currentPath = paths.current.at(-1);
        if(currentPath.points.length === oldLength.current) return; 
        oldLength.current = currentPath.points.length;
      } else if(oldLength.current > -1){
        oldLength.current = -1;
        return updateDrawingPaths(JSON.stringify([]));
      } else if(oldLength.current === -1) return;

      updateDrawingPaths(JSON.stringify(paths.current));
    }
  }, [msTimeLeft]);
  
  //ajuste com o tamanho da tela///////////////////////////////////////////////////////////////

  const sizeConstant = 0.7;

  const [canvasOffsetX, setCanvasOffsetX] = useState(0);
  const [canvasOffsetY, setCanvasOffsetY] = useState(0);
  const [innerWidth, setInnerWidth] = useState<number>((window.innerWidth < 500)? window.innerWidth : 412);
  const [canvas, setCanvas] = useState<CanvasDimensions>(() => {
    const innerW = window.innerWidth < 500? window.innerWidth: 412;
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
    context.lineWidth = (innerWidth) > 500? 5 : 3;
    contextRef.current = context;
  }, []);

  
  useEffect(() => {
    if(drawingPaths){
      const updatedPaths: Path[] = JSON.parse(drawingPaths);
      const constant = sizeConstant * 1.1;
      clearDrawing();
      if(updatedPaths.length > 0){
        updatedPaths.forEach(path => {
          if(path.points.length > 0){
            contextRef.current.strokeStyle = path.color;
            const initialCoordinate = path.points.splice(0, 1).at(0);
            contextRef.current.beginPath();
            contextRef.current.moveTo(constant * initialCoordinate.x, constant * initialCoordinate.y);
          
            path.points.forEach(p => {
              contextRef.current.lineTo(constant * p.x, constant * p.y);
              contextRef.current.stroke();
            })

            contextRef.current.closePath();
          }
        })
      }
    } 
  }, [drawingPaths]);


  const floorXY = (x: number, y: number) => {
    return {x: Math.floor(x), y: Math.floor(y)}
  }

  const initiateNewPath = (x: number, y: number) => {
    paths.current.push({color: 'red', points: [floorXY(x, y)]});
  }

  const updateCurrentPath = (x: number, y: number) => {
    if(paths.current.length > 0){
      paths.current.at(-1).points.push(floorXY(x, y));
    }
  }

  function startMouseDrawing(e: React.MouseEvent) {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    initiateNewPath(offsetX, offsetY);
    setIsDrawing(true);
  }

  function startTouchDrawing(e: React.TouchEvent) {
    const offsetX = e.touches[0].clientX - canvasOffsetX;
    const offsetY = e.touches[0].clientY - canvasOffsetY;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    initiateNewPath(offsetX, offsetY);
    setIsDrawing(true);    
  }

  function mouseDrawing(e: React.MouseEvent) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    updateCurrentPath(offsetX, offsetY);
  }

  function touchDrawing(e: React.TouchEvent) {
    if (!isDrawing) return;
    const offsetX = e.touches[0].clientX - canvasOffsetX;
    const offsetY = e.touches[0].clientY - canvasOffsetY;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    updateCurrentPath(offsetX, offsetY);
  }

  function finishDrawing() {
    if (!isDrawing) return;
    contextRef.current.closePath();
    console.log(paths.current);
    setIsDrawing(false);
  }

  function clearDrawing() {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    paths.current.length = 0;
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

  const alert = (msTimeLeft === 120000)
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
