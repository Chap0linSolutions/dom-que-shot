import {
  DefaultMap,
  AnimatedMap,
  FinishMapView,
  RadarMapView,
  Radar,
  RadarMapViewRed,
  RadarRed,
  DeadMap,
} from './Map.style';
import GameMapSector from './Sector/GameMapSector';
import FinishMapSector from './Sector/FinishMapSector';

interface mapProps {
  type: 'game' | 'finish' | 'no one played';
  isCurrentTurn?: boolean;
  places?: number[];
  icebergPlaces?: number[];
  toggleSelection?: (value: number) => void;
}

export default function Map({
  type,
  places,
  icebergPlaces,
  isCurrentTurn,
  toggleSelection,
}: mapProps) {
  const mapSectors = [];

  const RadarMap = isCurrentTurn ? RadarMapView : RadarMapViewRed;

  const RadarNeedle = isCurrentTurn ? Radar : RadarRed;

  for (let i = 0; i < 25; i++) {
    if (type === 'game') {
      mapSectors.push(
        <GameMapSector
          key={i + 500}
          onClick={() => toggleSelection(i)}
          isCurrentTurn={isCurrentTurn}
          number={places[i]}
          index={i}
        />
      );
    } else {
      mapSectors.push(
        <FinishMapSector
          key={i + 500}
          hasIceberg={icebergPlaces.includes(i)}
          number={places[i]}
          index={i}
        />
      );
    }
  }

  let MapContent = null;

  switch (type) {
    case 'game':
      MapContent = (
        <RadarMap>
          <RadarNeedle>
            <AnimatedMap>{mapSectors}</AnimatedMap>
          </RadarNeedle>
        </RadarMap>
      );
      break;
    case 'finish':
      MapContent = (
        <FinishMapView>
          <DefaultMap>{mapSectors}</DefaultMap>
        </FinishMapView>
      );
      break;
    default:
      MapContent = (
        <DeadMap>
          <DefaultMap>{mapSectors}</DefaultMap>
        </DeadMap>
      );
  }

  return <>{MapContent}</>;
}
