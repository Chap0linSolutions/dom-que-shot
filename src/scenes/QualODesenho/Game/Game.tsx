import React, { useEffect, useState, useRef } from 'react';
import Drawer from './Drawer';
import Guesser from './Guesser';

interface GameProps {
  title: string;
  msTimeLeft: number;
  description: string | JSX.Element;
  turnVisibility: boolean;
  category: string;
  drawingPaths: string;
  updateDrawingPaths: (value: string) => void;
  startGame: () => void;
  sendWinner: () => void;
  goToRankingPage: () => void;
}

type Coordinates = {
  x: number;
  y: number;
};

export type Last = {
  id: number;
  length: number;
};

export type Path = {
  id: number;
  color: string | undefined;
  width: number;
  points: Coordinates[];
};

export type CanvasDimensions = {
  width: number;
  height: number;
};

export function draw(
  context: CanvasRenderingContext2D,
  paths: Path[],
  canvasRatio: number,
  clearFirst?: boolean,
  canvas?: HTMLCanvasElement
) {
  if (paths.length === 0) return;

  if (clearFirst && canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  paths.forEach((path) => {
    context.strokeStyle = path.color;
    context.lineWidth = path.width * canvasRatio;
    const initialCoordinate = path.points.at(0);
    context.beginPath();
    context.moveTo(
      canvasRatio * initialCoordinate.x,
      canvasRatio * initialCoordinate.y
    );

    path.points.forEach((p) => {
      context.lineTo(canvasRatio * p.x, canvasRatio * p.y);
      context.stroke();
    });
    context.closePath();
  });
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
  sendWinner,
  goToRankingPage,
}: GameProps) {
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [selectedWidth, setSelectedWidth] = useState<number>(3);
  const interCanvasRatio = useRef<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>();
  const contextRef = useRef<CanvasRenderingContext2D>();
  const counter = useRef<number>(59000);
  const paths = useRef<Path[]>([]);
  const last = useRef<Last>({ id: 0, length: 0 });

  useEffect(() => {
    if (turnVisibility && counter.current > msTimeLeft) {
      counter.current -= 1000;

      if (last.current.id === 0) {
        updateDrawingPaths(
          JSON.stringify({ type: 'my-canvas-width-is', payload: canvas.width })
        );
      }
      if (paths.current.length > 0) {
        const current = paths.current.at(-1);
        if (current.id === last.current.id) {
          if (current.points.length > last.current.length) {
            updateDrawingPaths(
              JSON.stringify({ type: 'paths', payload: [current] })
            );
            last.current = { ...last.current, length: current.points.length };
          }
        } else if (current.id > last.current.id) {
          const whatToSend = paths.current.slice(last.current.id);
          updateDrawingPaths(
            JSON.stringify({ type: 'paths', payload: whatToSend })
          );
          last.current = { id: current.id, length: current.points.length };
        }
      }
    }
  }, [msTimeLeft]);

  //ajuste com o tamanho da tela///////////////////////////////////////////////////////////////

  const sizeConstant = 0.75;

  const [canvasOffsetX, setCanvasOffsetX] = useState(0);
  const [canvasOffsetY, setCanvasOffsetY] = useState(0);
  const [innerWidth, setInnerWidth] = useState<number>(
    window.innerWidth < 500 ? window.innerWidth : 412
  );
  const [canvas, setCanvas] = useState<CanvasDimensions>(() => {
    const innerW = window.innerWidth < 500 ? window.innerWidth : 412;
    return turnVisibility
      ? {
          width: innerW - 56,
          height: (innerW - 56) / sizeConstant,
        }
      : {
          width: sizeConstant * (innerW - 32),
          height: innerW - 32,
        };
  });

  const handleResize = () => {
    setInnerWidth(window.innerWidth < 500 ? window.innerWidth : 412);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    document.body.style.overscrollBehavior = 'none'; //prevent pull-to-refresh on this page
    document.querySelector('html').style.overflow = 'hidden';
    return () => {
      document.body.style.overscrollBehavior = 'auto';
      document.querySelector('html').style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    setCanvas(getCanvasSize);
    setCanvasOffsetX(canvasRef.current.offsetLeft);
    setCanvasOffsetY(canvasRef.current.offsetTop);
  }, [innerWidth]);

  const getCanvasSize = () => {
    return turnVisibility
      ? {
          width: innerWidth - 56,
          height: (innerWidth - 56) / sizeConstant,
        }
      : {
          width: sizeConstant * (innerWidth - 32),
          height: innerWidth - 32,
        };
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = 'white';
    context.lineCap = 'round';
    contextRef.current = context;
  }, []);

  const clearDrawing = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    paths.current = [];
    last.current = { id: 0, length: 0 };
  };

  const undoLastPath = () => {
    if (paths.current.length === 0) return console.log('nada para desfazer.');
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const pathsMinusOne = paths.current.filter(
      (p, index) => index + 1 < paths.current.length
    );
    paths.current = pathsMinusOne;
    const newLast = pathsMinusOne.at(-1);
    last.current = {
      id: newLast ? newLast.id : 0,
      length: newLast ? newLast.points.length : 0,
    };

    draw(
      contextRef.current,
      pathsMinusOne,
      interCanvasRatio.current,
      true,
      canvasRef.current
    );

    if (turnVisibility) {
      updateDrawingPaths(
        JSON.stringify({ type: 'undo', payload: pathsMinusOne.length })
      );
    }
  };


  if(turnVisibility) {
    return <Drawer
      title={title}
      description={description}
      category={category}
      msTimeLeft={msTimeLeft}
      paths={paths}
      canvas={canvas}
      canvasRef={canvasRef}
      contextRef={contextRef}
      canvasOffsetX={canvasOffsetX}
      canvasOffsetY={canvasOffsetY}
      selectedColor={selectedColor}
      selectedWidth={selectedWidth}
      setSelectedColor={setSelectedColor}
      setSelectedWidth={setSelectedWidth}
      clearDrawing={clearDrawing}
      undoLastPath={undoLastPath}
      updateDrawingPaths={updateDrawingPaths}
      startGame={startGame}
    />
  }

  return <Guesser
    category={category}
    description={description}
    drawingPaths={drawingPaths}
    msTimeLeft={msTimeLeft}
    canvas={canvas}
    canvasRef={canvasRef}
    contextRef={contextRef}
    interCanvasRatio={interCanvasRatio}
    paths={paths}
    sendWinner={sendWinner}
    title={title}
    undoLastPath={undoLastPath}
    goToRankingPage={goToRankingPage}
    clearDrawing={clearDrawing}
  />
}
