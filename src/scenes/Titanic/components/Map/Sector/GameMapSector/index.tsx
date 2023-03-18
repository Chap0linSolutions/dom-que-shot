import {
  BottomLeftSector,
  BottomRightSector,
  ElementIcon,
  RegularSector,
  TopLeftSector,
  TopRightSector,
} from './GameMapSector.style';
import titanic from '../../../../assets/ship.png';
import iceberg from '../../../../assets/iceberg.png';

interface sectorProps {
  isCurrentTurn: boolean;
  number: number;
  index: number;
  onClick: () => void;
}

export default function GameMapSector({
  isCurrentTurn,
  number,
  index,
  onClick,
}: sectorProps) {
  let GameSector = RegularSector;
  const icon = isCurrentTurn ? iceberg : titanic;

  const element =
    number >= 100 ? <ElementIcon src={icon} /> : null;

  if (index === 0) {
    GameSector = TopLeftSector;
  } else if (index === 4) {
    GameSector = TopRightSector;
  } else if (index === 20) {
    GameSector = BottomLeftSector;
  } else if (index === 24) {
    GameSector = BottomRightSector;
  }

  return (
    <GameSector onClick={onClick}>
      {element}
    </GameSector>
  );
}
