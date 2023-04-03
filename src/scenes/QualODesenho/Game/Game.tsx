import React, { useEffect, useState, useRef } from 'react';
import { XCircle } from 'react-feather';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import Popup from '../../../components/Popup';
import beer from '../../../assets/beer.png';
import undoIcon from '../../../assets/undo.svg';
import {
  GameDiv,
  DrawingDiv,
  DrawingCanvas,
  CanvasActions,
  UndoButtons,
  Options,
  Undo,
  Option,
  Color,
  Width,
  Legend,
  GuessingDiv,
  WordDiv,
  GuessesDiv,
  GuessTitle,
  GuessInput,
  GuessInputDiv,
  Palette,
  PaletteColor,
  PaletteWidth,
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
  color: string | undefined,
  width: number,
  points: Coordinates[];
}

type Message = {
  type: 'new' | 'update' | 'everything' | 'undo' | 'clear' | 'my-canvas-width-is',
  payload?: Path[] | Path | number,
}

type Previous = {
  lineLength: number,
  pathCount: number,
}

type CanvasDimensions = {
  width: number,
  height: number,
}

const colors = [
  '#000000',
  '#FFFFFF',
  '#00FF0A',
  '#000AFF',
  '#FF0000',
  '#858585',
  '#FF6289',
  '#FAFF00', 
  '#00F0FF', 
  '#FF8A00',
  '#F2D3B2',
  '#F2AE75',
  '#946635',
  '#502F18',
  '#351F09',
]

const widths = [
  3,
  5,
  7,
  11,
  17,
]

function draw(context: CanvasRenderingContext2D,  paths: Path[], canvasRatio: number, clearFirst?: boolean, canvas?: HTMLCanvasElement){
  if(paths.length === 0) return;

  if(clearFirst && canvas){
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  paths.forEach(path => {
    context.strokeStyle = path.color;
    context.lineWidth = path.width * canvasRatio;
    const initialCoordinate = path.points.at(0);
    context.beginPath();
    context.moveTo(canvasRatio * initialCoordinate.x, canvasRatio * initialCoordinate.y);

    path.points.forEach(p => {
      context.lineTo(canvasRatio * p.x, canvasRatio * p.y);
      context.stroke();
    })
    context.closePath();
  })
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
  const [colorPaletteVisibility, setColorPaletteVisibility] = useState<boolean>(false);
  const [widthPaletteVisibility, setWidthPaletteVisibility] = useState<boolean>(false);
  const [clearConfirmation, setClearConfirmation] = useState<boolean>(false);

  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [selectedWidth, setSelectedWidth] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState(false);

  const interCanvasRatio = useRef<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>();
  const contextRef = useRef<CanvasRenderingContext2D>();
  const counter = useRef<number>(359000);

  const paths = useRef<Path[]>([]);
  const previous = useRef<Previous>({
    lineLength: 0,
    pathCount: 0
  });

  useEffect(() => {
    if(turnVisibility && counter.current > msTimeLeft){
      
      counter.current -= 1000;
      const currentPath = paths.current.at(-1);

      if(currentPath){
        const currentPathCount = paths.current.length;
        const currentLineLength = currentPath.points.length;
        
        console.log(paths.current);

        let previousPathCount = previous.current.pathCount;
        let previousLineLength = previous.current.lineLength;

        if(previousPathCount === 0){  
          updateDrawingPaths(JSON.stringify({type: 'my-canvas-width-is', payload: canvas.width}));
        }

        if(currentPathCount > previousPathCount) {
          if(previousPathCount > 0 && currentLineLength > previousLineLength) {   //se sobrou algo do path iniciado no último update para mandar
            const lastPathSent = paths.current.at(previousPathCount);
            const remainingPoints = lastPathSent.points.slice(previousLineLength);
            const remaining: Path = {
              ...lastPathSent,
              points: remainingPoints,
            }
            //console.log('now sending remains of path', previousPathCount - 1);
            updateDrawingPaths(JSON.stringify({type: 'update', payload: remaining}));
            previousPathCount += 1;  
          }
          while(currentPathCount > previousPathCount) {             //se há novos paths acumulados para mandar
            //console.log('now sending new path', previousPathCount);
            const newPath = paths.current.at(previousPathCount);
            updateDrawingPaths(JSON.stringify({type: 'new', payload: newPath}));
            previousPathCount += 1;
            previousLineLength = newPath.points.length;
          }
        }
        else {
          if(currentPath && previousLineLength > 0) {
            const hasNewLines = currentPath.points.length > previousLineLength;
            if(hasNewLines){
              const deltaP: Path = {
                ...currentPath,
                points: currentPath.points.slice(previousLineLength),
              }
              //console.log('now sending new points of path', previousPathCount - 1);
              updateDrawingPaths(JSON.stringify({type: 'update', payload: deltaP}));
              previousLineLength = currentPath.points.length;
            }
          }
        }

        previous.current = {
          lineLength: previousLineLength,
          pathCount: previousPathCount,
        }
      }
    }
  }, [msTimeLeft]);


  //ajuste com o tamanho da tela///////////////////////////////////////////////////////////////

  const sizeConstant = 0.75;

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

  const colorPalette = <Palette>
    {colors.map((color, i) => (
      <PaletteColor 
        key={i}
        style={{backgroundColor: color}}
        onClick={() => {
          setSelectedColor(color);
          setColorPaletteVisibility(false);
        }}  
      />
    ))}
  </Palette>;

  const widthPalette = <Palette>
    {widths.map((size, i) => (
      <PaletteWidth 
        key={i}
        style={{backgroundColor: selectedColor, width: 2*size, height: 2*size}}
        onClick={() => {
          setSelectedWidth(size);
          setWidthPaletteVisibility(false);
        }}  
      />
    ))}
  </Palette>;


  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = 'white';
    context.lineCap = 'round';
    contextRef.current = context;
  }, []);

  
  useEffect(() => {
    if(drawingPaths){
      const { type, payload }:Message = JSON.parse(drawingPaths);
      // console.log(type);

      switch(type){
        case 'everything':
          draw(contextRef.current, payload as Path[], interCanvasRatio.current, true, canvasRef.current);
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
        case 'new':
          const newPath = (payload as Path)
          previous.current.lineLength = newPath.points.length; 
          paths.current.push(newPath);
          draw(contextRef.current, [newPath], interCanvasRatio.current);
          break;
        case 'update':
          const pathSoFar = paths.current[paths.current.length - 1].points; 
          const update = (payload as Path);
          
          paths.current[paths.current.length - 1] = {
            color: update.color,
            width: update.width,
            points: [...pathSoFar, ...update.points], 
          }

          const newSegment:Path = {
            ...update,
            points: [pathSoFar.at(-1), ...update.points]
          }
          previous.current.lineLength += update.points.length;
          draw(contextRef.current, [newSegment], interCanvasRatio.current);
          break;
      }
    } 
  }, [drawingPaths]);

  const floorXY = (x: number, y: number) => {
    return {x: Math.floor(x), y: Math.floor(y)}
  }

  const initiateNewPath = (x: number, y: number) => {
    paths.current.push({color: selectedColor, width: selectedWidth, points: [floorXY(x, y)]});
  }

  const updateCurrentPath = (x: number, y: number) => {
    if(paths.current.length > 0){
      paths.current.at(-1).points.push(floorXY(x, y));
    }
  }

  const clearDrawing = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    paths.current = [];
    previous.current = {pathCount: 0, lineLength: 0}
  }

  const undoLastPath = () => {
    if(paths.current.length === 0) return console.log('nada para desfazer.');
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const pathsMinusOne = paths.current.filter((p, index) => (index + 1) < paths.current.length);
    paths.current = pathsMinusOne;
    previous.current = {
      lineLength: 0,
      pathCount: pathsMinusOne.length,
    }
    
    draw(contextRef.current, pathsMinusOne, interCanvasRatio.current, true, canvasRef.current);
    
    if(turnVisibility){
      updateDrawingPaths(JSON.stringify({type: 'undo', payload: pathsMinusOne.length}));
    }
  }

  const confirmIntention = () => {
    if(paths.current.length > 0) setClearConfirmation(true);
  }

  function startMouseDrawing(e: React.MouseEvent) {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.strokeStyle = selectedColor;
    contextRef.current.lineWidth = selectedWidth;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    initiateNewPath(offsetX, offsetY);
    setIsDrawing(true);
  }

  function startTouchDrawing(e: React.TouchEvent) {
    const offsetX = e.touches[0].clientX - canvasOffsetX;
    const offsetY = e.touches[0].clientY - canvasOffsetY;
    contextRef.current.strokeStyle = selectedColor;
    contextRef.current.lineWidth = selectedWidth;
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
    setIsDrawing(false);
  }

  const confirmationAlert = (clearConfirmation)
  ? <Alert 
      noButton
      yes={() => {
        clearDrawing();
        updateDrawingPaths(JSON.stringify({type: 'clear'}));
        setClearConfirmation(false);
      }}
      no={() => setClearConfirmation(false)}
      message='Apagar tudo?'
    />
  : null;

  if (turnVisibility) {
    return (
      <Background noImage>
        <Popup
          type='info'
          title={title}
          description={description}
          show={popupVisibility}
          exit={() => setPopupVisibility(false)}
          comesFromTop
        />
        <Popup
          type='info'
          title={'Cores'}
          description={colorPalette}
          show={colorPaletteVisibility}
          exit={() => setColorPaletteVisibility(false)}
          border='1px solid black'
        />
        <Popup
          type='info'
          title={'Larguras de linha'}
          description={widthPalette}
          show={widthPaletteVisibility}
          exit={() => setWidthPaletteVisibility(false)}
          border='1px solid black'
        />
        <Header infoPage={() => setPopupVisibility(true)} />
        <Alert message={guidanceText} buttonText="Pronto!" onButtonClick={startGame}/>
        {confirmationAlert}
        <GameDiv>
            <DrawingDiv>
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
              <CanvasActions>
                <UndoButtons>
                  <Button width='60px' height='55px' onClick={undoLastPath}>
                    <Undo src={undoIcon} />
                  </Button>
                  <Button width='60px' height='55px' color='#AD0000' onClick={confirmIntention}>
                    <XCircle width='30px' height='30px' color='white'/>
                  </Button>
                </UndoButtons>
                <Options>
                  <Option>
                    <Width style={{width: selectedWidth}} onClick={() => setWidthPaletteVisibility(true)}/>
                    <Legend>
                      Linha
                    </Legend>
                  </Option>
                  <Option>
                    <Color style={{backgroundColor: selectedColor}} onClick={() => setColorPaletteVisibility(true)}/>
                    <Legend>
                      Cor
                    </Legend>
                  </Option>
                </Options>
              </CanvasActions>
            </DrawingDiv>
        </GameDiv>
      </Background>
    );
  } 

  const alert = (msTimeLeft === 360000)
  ? <Alert noButton message={guidanceText} icon={beer}/>
  : null;

  return (
    <Background noImage>
      {alert}
      <Popup
        type='info'
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
          <GuessingDiv>
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