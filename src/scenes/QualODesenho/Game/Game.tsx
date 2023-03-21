import { useEffect, useState, useRef } from 'react';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import Popup from '../../../components/Popup';
import {
  GameDiv,
  Content,
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
  const h = sizeRef.current? sizeRef.current.offsetHeight : 640;
  const w = sizeRef.current? sizeRef.current.offsetWidth : 360;

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
          <Content>
            <DrawingDiv ref={sizeRef}>
              <WordDiv>{category}</WordDiv>
              <DrawingCanvas
                width={0.85 * w}
                height={0.75 * h}
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
          </Content>
        </GameDiv>
      </Background>
    );
  } else {
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
          <Content>
            <GuessTitle>Qual é o desenho?</GuessTitle>
            <GuessingDiv ref={sizeRef}>
              <GuessesDiv />
              <DrawingCanvas
                ref={canvasRef}
                width={0.7 * w}
                height={0.8 * h}
              />
            </GuessingDiv>
            <GuessInputDiv>
              <GuessInput />
              <Button>Enviar</Button>
            </GuessInputDiv>
          </Content>
        </GameDiv>
      </Background>
    )
  }
}