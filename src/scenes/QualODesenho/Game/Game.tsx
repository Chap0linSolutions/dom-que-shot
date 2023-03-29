import React, { useEffect, useState, useRef } from 'react';
import { XCircle } from 'react-feather';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import Popup from '../../../components/Popup';
import beer from '../../../assets/beer.png';
import undo from '../../../assets/undo.svg';
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
  color: string,
  width: number,
  points: Coordinates[];
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
  '#731682',
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
    {colors.map(color => (
      <PaletteColor 
        style={{backgroundColor: color}}
        onClick={() => {
          setSelectedColor(color);
          setColorPaletteVisibility(false);
        }}  
      />
    ))}
  </Palette>;

  const widthPalette = <Palette>
    {widths.map(size => (
      <PaletteWidth
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
      const updatedPaths: Path[] = JSON.parse(drawingPaths);
      const constant = sizeConstant * 1.1;
      clearDrawing();
      if(updatedPaths.length > 0){
        updatedPaths.forEach(path => {
          if(path.points.length > 0){
            contextRef.current.strokeStyle = path.color;
            contextRef.current.lineWidth = path.width;
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
    paths.current.push({color: selectedColor, width: selectedWidth, points: [floorXY(x, y)]});
  }

  const updateCurrentPath = (x: number, y: number) => {
    if(paths.current.length > 0){
      paths.current.at(-1).points.push(floorXY(x, y));
    }
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
    console.log(paths.current);
    setIsDrawing(false);
  }

  function clearDrawing() {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    paths.current.length = 0;
  }

  const confirmationAlert = (clearConfirmation)
  ? <Alert 
      noButton
      yes={() => {
        clearDrawing();
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
              <CanvasActions>
                <UndoButtons>
                  <Button width='60px' height='55px'>
                    <Undo src={undo} />
                  </Button>
                  <Button width='60px' height='55px' color='#AD0000' onClick={() => setClearConfirmation(true)}>
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

  const alert = (msTimeLeft === 120000)
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
