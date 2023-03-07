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
        element = <ElementIcon key={1000 + index} src={iceberg} />;
        break;
      case 1:
        element = <ElementIcon key={1000 + index} src={icebergOnShip} />;
        break;
      case 2:
        element = <ElementIcon key={1000 + index} src={icebergOnTwoShips} />;
        break;
      case 3:
        element = <ElementIcon key={1000 + index} src={icebergOnTwoShips} />;
        break;
      default:
        element = (
          <>
            <SmallElemetIcon key={1000 + index} src={icebergOnShip} />
            <SmallElemetIcon key={2000 + index} src={icebergOnShip} />
            <SmallElemetIcon key={3000 + index} src={icebergOnShip} />
            <IconCounter key={4000 + index}>
              <IconCount key={5000 + index}>{iconCount}</IconCount>
            </IconCounter>
          </>
        );
    }
  } else {
    switch (iconCount) {
      case 0:
        break;
      case 1:
        element = <ElementIcon key={1000 + index} src={titanic} />;
        break;
      case 2:
        element = <ElementIcon key={1000 + index} src={twoTitanics} />;
        break;
      case 3:
        element = <ElementIcon key={1000 + index} src={threeTitanics} />;
        break;
      default:
        element = (
          <>
            <SmallElemetIcon key={1000 + index} src={titanic} />
            <SmallElemetIcon key={2000 + index} src={titanic} />
            <SmallElemetIcon key={3000 + index} src={titanic} />
            <IconCounter key={4000 + index}>
              <IconCount key={5000 + index}>{iconCount}</IconCount>
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

  return <GameSector key={number}>{element}</GameSector>;
}
