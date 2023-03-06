import styled from "@emotion/styled";
import { keyframes } from '@emotion/react';
import radar from '../../assets/radar.png';
import radarRed from '../../assets/radar-red.png';
import seaWithWaves from '../../assets/sea-with-waves.png';
import seaWithRadarAndWaves from '../../assets/sea-radar.png';
import seaWithRadarAndWavesRed from '../../assets/sea-radar-red.png';
import noOnePlayed from '../../assets/no-one-played-sea.png';

const rotateCW = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const rotateCCW = keyframes`
  to {
    transform: rotate(-360deg);
  }
`;

export const MapView = styled.div`
  background: url(${seaWithWaves});
  background-size: contain;
  border-radius: 20px;
  width: 345px;
  height: 345px;
  @media(max-height: 740px){
      width: 304px;
      height: 304px;
  }
`;

export const FinishMapView = styled(MapView)`
  width: 320px;
  height: 320px;
  @media(max-height: 740px){
    width: 280px;
    height: 280px;
}
`;

export const RadarMapView = styled(MapView)`
  background: url(${seaWithRadarAndWaves});
  background-size: contain;
`;

export const RadarMapViewRed = styled(MapView)`
  background: url(${seaWithRadarAndWavesRed});
  background-size: contain;
`;

export const DeadMap = styled(FinishMapView)`
  background: url(${noOnePlayed});
  background-size: contain;
`;

export const Radar = styled.div`
  background: url(${radar});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  animation: ${rotateCW} linear 5s infinite;
  width: 100%;
  height: 100%;
`;

export const RadarRed = styled(Radar)`
  background: url(${radarRed});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const DefaultMap = styled.div`
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

export const AnimatedMap = styled(DefaultMap)`
  animation: ${rotateCCW} linear 5s infinite;
`;