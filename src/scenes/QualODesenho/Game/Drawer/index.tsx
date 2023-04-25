import React, { useState } from 'react';
import Background from '../../../../components/Background';
import Popup from '../../../../components/Popup';
import Header from '../../../../components/Header';
import Alert from '../../../../components/Alert';
import Button from '../../../../components/Button';
import undoIcon from '../../../../assets/undo.svg';
import { XCircle } from 'react-feather';
import { CanvasDimensions, Path } from '../Game';
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
  Head,
  Category,
  Palette,
  PaletteColor,
  PaletteWidth,
  Timer,
} from './Drawer.style';

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
];

const widths = [3, 5, 7, 11, 17];

interface DrawerProps {
  title: string;
  category: string;
  timeLeft: number[];
  description: string | JSX.Element;
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D>;
  paths: React.MutableRefObject<Path[]>;
  canvas: CanvasDimensions;
  canvasOffsetX: number;
  canvasOffsetY: number;
  selectedWidth: number;
  selectedColor: string;
  setSelectedWidth: React.Dispatch<React.SetStateAction<number>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  updateDrawingPaths: (value: string) => void;
  startGame: () => void;
  undoLastPath: () => void;
  clearDrawing: () => void;
}

export default function Drawer({
  description,
  title,
  category,
  timeLeft,
  canvasRef,
  contextRef,
  paths,
  canvas,
  canvasOffsetX,
  canvasOffsetY,
  selectedColor,
  selectedWidth,
  setSelectedWidth,
  setSelectedColor,
  updateDrawingPaths,
  undoLastPath,
  clearDrawing,
  startGame,
}: DrawerProps) {
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [colorPaletteVisibility, setColorPaletteVisibility] =
    useState<boolean>(false);
  const [widthPaletteVisibility, setWidthPaletteVisibility] =
    useState<boolean>(false);
  const [clearConfirmation, setClearConfirmation] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const guidanceText = 'Tudo pronto? Aperte o botão abaixo e pode começar!';

  const colorPalette = (
    <Palette>
      {colors.map((color, i) => (
        <PaletteColor
          key={i}
          style={{ backgroundColor: color }}
          onClick={() => {
            setSelectedColor(color);
            setColorPaletteVisibility(false);
          }}
        />
      ))}
    </Palette>
  );

  const widthPalette = (
    <Palette>
      {widths.map((size, i) => (
        <PaletteWidth
          key={i}
          style={{
            backgroundColor: selectedColor,
            width: 2 * size,
            height: 2 * size,
          }}
          onClick={() => {
            setSelectedWidth(size);
            setWidthPaletteVisibility(false);
          }}
        />
      ))}
    </Palette>
  );

  const confirmIntention = () => {
    if (paths.current.length > 0) setClearConfirmation(true);
  };

  const floorXY = (x: number, y: number) => {
    return { x: Math.floor(x), y: Math.floor(y) };
  };

  const initiateNewPath = (x: number, y: number) => {
    paths.current.push({
      id: paths.current.length,
      color: selectedColor,
      width: selectedWidth,
      points: [floorXY(x, y)],
    });
  };

  const updateCurrentPath = (x: number, y: number) => {
    if (paths.current.length > 0) {
      paths.current.at(-1).points.push(floorXY(x, y));
    }
  };

  const startMouseDrawing = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.strokeStyle = selectedColor;
    contextRef.current.lineWidth = selectedWidth;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    initiateNewPath(offsetX, offsetY);
    setIsDrawing(true);
  };

  const startTouchDrawing = (e: React.TouchEvent) => {
    const offsetX = e.touches[0].clientX - canvasOffsetX;
    const offsetY = e.touches[0].clientY - canvasOffsetY;
    contextRef.current.strokeStyle = selectedColor;
    contextRef.current.lineWidth = selectedWidth;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    initiateNewPath(offsetX, offsetY);
    setIsDrawing(true);
  };

  const mouseDrawing = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    updateCurrentPath(offsetX, offsetY);
  };

  const touchDrawing = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    const offsetX = e.touches[0].clientX - canvasOffsetX;
    const offsetY = e.touches[0].clientY - canvasOffsetY;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    updateCurrentPath(offsetX, offsetY);
  };

  const finishDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const confirmationAlert = clearConfirmation ? (
    <Alert
      noButton
      yes={() => {
        clearDrawing();
        updateDrawingPaths(JSON.stringify({ type: 'clear' }));
        setClearConfirmation(false);
      }}
      no={() => setClearConfirmation(false)}
      message="Apagar tudo?"
    />
  ) : null;

  const minutes = timeLeft[0] < 10 ? `0${timeLeft[0]}` : `${timeLeft[0]}`;

  const seconds = timeLeft[1] < 10 ? `0${timeLeft[1]}` : `${timeLeft[1]}`;

  return (
    <Background noImage>
      <Popup
        type="info"
        title={title}
        description={description}
        show={popupVisibility}
        exit={() => setPopupVisibility(false)}
        comesFromTop
      />
      <Popup
        type="info"
        title={'Cores'}
        description={colorPalette}
        show={colorPaletteVisibility}
        exit={() => setColorPaletteVisibility(false)}
        border="1px solid black"
      />
      <Popup
        type="info"
        title={'Larguras de linha'}
        description={widthPalette}
        show={widthPaletteVisibility}
        exit={() => setWidthPaletteVisibility(false)}
        border="1px solid black"
      />
      <Header exit infoPage={() => setPopupVisibility(true)} />
      <Alert
        message={guidanceText}
        buttonText="Pronto!"
        onButtonClick={startGame}
      />
      {confirmationAlert}
      <GameDiv>
        <DrawingDiv>
          <Head style={{ width: canvas.width }}>
            <Category>{category}</Category>
            <Timer>
              {minutes}:{seconds}
            </Timer>
          </Head>
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
              <Button width="60px" height="55px" onClick={undoLastPath}>
                <Undo src={undoIcon} />
              </Button>
              <Button
                width="60px"
                height="55px"
                color="#AD0000"
                onClick={confirmIntention}>
                <XCircle width="30px" height="30px" color="white" />
              </Button>
            </UndoButtons>
            <Options>
              <Option>
                <Width
                  style={{ width: selectedWidth }}
                  onClick={() => setWidthPaletteVisibility(true)}
                />
                <Legend>Linha</Legend>
              </Option>
              <Option>
                <Color
                  style={{ backgroundColor: selectedColor }}
                  onClick={() => setColorPaletteVisibility(true)}
                />
                <Legend>Cor</Legend>
              </Option>
            </Options>
          </CanvasActions>
        </DrawingDiv>
      </GameDiv>
    </Background>
  );
}
