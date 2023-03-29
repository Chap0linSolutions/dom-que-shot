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


  
  //ajuste com o tamanho da tela///////////////////////////////////////////////////////////////

  const sizeConstant = 0.75;

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

  function startMouseDrawing(e: React.MouseEvent) {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.strokeStyle = selectedColor;
    contextRef.current.lineWidth = selectedWidth;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function startTouchDrawing(e: React.TouchEvent) {
    const offsetX = e.touches[0].clientX - canvasOffsetX;
    const offsetY = e.touches[0].clientY - canvasOffsetY;
    contextRef.current.strokeStyle = selectedColor;
    contextRef.current.lineWidth = selectedWidth;
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

  const alert = (msTimeLeft === 60000)
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
