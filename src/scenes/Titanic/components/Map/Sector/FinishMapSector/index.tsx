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
        element = <ElementIcon src={iceberg} />;
        break;
      case 1:
        element = <ElementIcon src={icebergOnShip} />;
        break;
      case 2:
        element = <ElementIcon src={icebergOnTwoShips} />;
        break;
      case 3:
        element = <ElementIcon src={icebergOnTwoShips} />;
        break;
      default:
        element = (
          <>
            <SmallElemetIcon src={icebergOnShip} />
            <SmallElemetIcon src={icebergOnShip} />
            <SmallElemetIcon src={icebergOnShip} />
            <IconCounter>
              <IconCount>{`${iconCount}`}</IconCount>
            </IconCounter>
          </>
        );
    }
  } else {
    switch (iconCount) {
      case 0:
        break;
      case 1:
        element = <ElementIcon src={titanic} />;
        break;
      case 2:
        element = <ElementIcon src={twoTitanics} />;
        break;
      case 3:
        element = <ElementIcon src={threeTitanics} />;
        break;
      default:
        element = (
          <>
            <SmallElemetIcon src={titanic} />
            <SmallElemetIcon src={titanic} />
            <SmallElemetIcon src={titanic} />
            <IconCounter>
              <IconCount>{`${iconCount}`}</IconCount>
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
