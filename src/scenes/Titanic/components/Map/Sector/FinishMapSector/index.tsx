import {
  BottomLeftSector,
  BottomRightSector,
  ElementIcon,
  IconCount,
  IconCounter,
  RegularSector,
  SmallElemetIcon,
  TopLeftSector,
  TopRightSector,
} from './FinishMapSector.style';
import titanic from '../../../../assets/ship.png';
import twoTitanics from '../../../../assets/2-ships.png';
import threeTitanics from '../../../../assets/3-ships.png';
import iceberg from '../../../../assets/iceberg.png';
import icebergOnShip from '../../../../assets/iceberg-on-ship.png';
import icebergOnTwoShips from '../../../../assets/iceberg-on-2-ships.png';

interface sectorProps {
  hasIceberg: boolean;
  number: number;
  index: number;
}

export default function FinishMapSector({
  hasIceberg,
  index,
  number,
}: sectorProps) {
  let GameSector = RegularSector;
  let element = null;
  const iconCount = Math.floor(number / 100);

  if (hasIceberg) {
    switch (iconCount) {
      case 0:
        element = <ElementIcon key={index + 26} src={iceberg} />;
        break;
      case 1:
        element = <ElementIcon key={index + 26} src={icebergOnShip} />;
        break;
      case 2:
        element = <ElementIcon key={index + 26} src={icebergOnTwoShips} />;
        break;
      case 3:
        element = <ElementIcon key={index + 26} src={icebergOnTwoShips} />;
        break;
      default:
        element = (
          <>
            <SmallElemetIcon key={index + 26} src={icebergOnShip} />
            <SmallElemetIcon key={index + 27} src={icebergOnShip} />
            <SmallElemetIcon key={index + 28} src={icebergOnShip} />
            <IconCounter key={index + 29}>
              <IconCount key={index + 30}>{iconCount}</IconCount>
            </IconCounter>
          </>
        );
    }
  } else {
    switch (iconCount) {
      case 0:
        break;
      case 1:
        element = <ElementIcon key={index + 31} src={titanic} />;
        break;
      case 2:
        element = <ElementIcon key={index + 31} src={twoTitanics} />;
        break;
      case 3:
        element = <ElementIcon key={index + 31} src={threeTitanics} />;
        break;
      default:
        element = (
          <>
            <SmallElemetIcon key={index + 31} src={titanic} />
            <SmallElemetIcon key={index + 32} src={titanic} />
            <SmallElemetIcon key={index + 33} src={titanic} />
            <IconCounter key={index + 34}>
              <IconCount key={index + 35}>{iconCount}</IconCount>
            </IconCounter>
          </>
        );
    }
  }

  if (index === 0) {
    GameSector = TopLeftSector;
  } else if (index === 4) {
    GameSector = TopRightSector;
  } else if (index === 20) {
    GameSector = BottomLeftSector;
  } else if (index === 24) {
    GameSector = BottomRightSector;
  }

  return <GameSector key={index}>{element}</GameSector>;
}
