import { useEffect, useState, useRef } from 'react';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import Popup from '../../../components/Popup';
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

interface ListedPlayerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}

interface WhoPlayersProps extends ListedPlayerProps {
  selected: boolean;
  isNameVisible: boolean;
}

interface GameProps {
  title: string;
  msTimeLeft: number;
  description: string | JSX.Element;
  players: ListedPlayerProps[];
  setWinners: () => void;
  turnVisibility: boolean;
  category: string;
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
  players,
  setWinners,
}: GameProps) {
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>();
  const contextRef = useRef<CanvasRenderingContext2D>();

  const sizeRef = useRef<HTMLDivElement>();
  
  //ajuste com o tamanho da tela///////////////////////////////////////////////////////////////

  const sizeConstant = 0.7;

  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [canvas, setCanvas] = useState<CanvasDimensions>(() => ((turnVisibility)
    ? {
        width: (window.innerWidth - 56),
        height: (window.innerWidth - 56) / sizeConstant,
      }
    : {
        width: sizeConstant * (window.innerWidth - 32),
        height: (window.innerWidth - 32),
      }
    )
  );

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


  const endGame = () => {
    //here's where we set the id field of each player to either 1000 (winner) or 0 (loser).
  };

  const guidanceText =
    turnVisibility === true
      ? 'Aperte "fechar" para iniciar o timer.'
      : 'Aguardando o da Vinci começar a desenhar';

  const cardStyle = (isSelected: boolean) => {
    return { background: isSelected === true ? '#8877DF' : '#403A55' };
  };

  const button = (
    <Button
      staysOnBottom
      onClick={endGame}
      isDisabled={true}>
      Finalizar
    </Button>
  );

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = 'white';
    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);

  function startDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function draw(e) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  function finishDrawing() {
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
        <Alert message={guidanceText} />
        <GameDiv>
            <DrawingDiv ref={sizeRef}>
              <WordDiv>{category}</WordDiv>
              <DrawingCanvas
                width={canvas.width}
                height={canvas.height}
                ref={canvasRef}
                onMouseDown={startDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onMouseMove={draw}
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
  return (
    <Background noImage>
      <Alert /*noButton*/ message={guidanceText} />
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
