import React from 'react';
import thumbDown from '../../../../assets/thumbs-down.png';
import { CircleBorder, LoserName, LoserTime, PlayerInfo, Position, RankingItemDiv, ThumbsDown, WinnerText } from './RankingItem.styles';

interface RankingItemProps {
  position: number;
  name: string;
  time: number;
}

export default function RankingItem({ position, name, time }: RankingItemProps){
  
  const Info = () => {
    const details = (time < 0)
    ? (<>
        <LoserName>{name}</LoserName>
        <LoserTime>
          {
            (time > -100)
            ? 'Não acertou'
            : 'Caiu da partida'
          }
        </LoserTime>
      </>)
    : (<>
      <WinnerText>{name}</WinnerText>
      <WinnerText>{time}s</WinnerText>
    </>);
    return details;
  }

  return (
    <RankingItemDiv>
      <Position>
        <CircleBorder>
          {time < 0
          ? <ThumbsDown src={thumbDown} />
          : <WinnerText>{position + 1}º</WinnerText>}
        </CircleBorder>
      </Position>
      <PlayerInfo>
        <Info />
      </PlayerInfo>
    </RankingItemDiv>
  );
};