import React from 'react';
import thumbDown from '../img/thumbs-down.png';
import { RankingItemDiv } from './RankingItem.styles';

interface RankingItemProps {
  position: number;
  name: string;
  time: number;
}

const RankingItem: React.FC<RankingItemProps> = ({ position, name, time }) => {
  return (
    <RankingItemDiv>
      <div className="position">
        <div className="circle-border">
          {time >= 60 ? <img src={thumbDown} /> : <p>{position + 1}º</p>}
        </div>
      </div>
      <div className="infos">
        {time < 60 ? (
          <>
            <p>{name}</p>
            <p>{time}s</p>
          </>
        ) : (
          <></>
        )}

        {time === 60 ? (
          <>
            <p style={{ color: 'red', textDecoration: 'line-through' }}>
              {name}
            </p>
            <p style={{ color: 'red' }}>{time}s</p>
          </>
        ) : (
          <></>
        )}

        {time > 60 ? (
          <>
            <p style={{ color: 'red', textDecoration: 'line-through' }}>
              {name}
            </p>
            <p style={{ color: 'red', fontSize: '14px' }}>Não acertou...</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </RankingItemDiv>
  );
};

export default RankingItem;
