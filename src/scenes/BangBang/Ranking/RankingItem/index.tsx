import React from 'react';
import './styles.css';
import thumbDown from '../img/thumbs-down.png';

interface RankingItemProps {
  position: number;
  name: string;
  time: number;
}

const RankingItem: React.FC<RankingItemProps> = ({ position, name, time }) => {
  return (
    <div id="ranking-item">
      <div className="position">
        <div className="circle-border">
          {time >= 10  ? <img src={thumbDown} /> : <p>{position + 1}º</p>}
        </div>
      </div>
      <div className="infos">
        {time < 10 ? (
          <>
            <p>{name}</p>
            <p>{time.toFixed(2)}s</p>
          </>
        ) : (
          <></>
        )}

        {time === 10 ? (
          <>
            <p style={{ color: 'red', textDecoration: 'line-through' }}>{name}</p>
            <p style={{ color: 'red' }}>{time}s</p>
          </>
        ) : (
          <></>
        )}

        {time > 10 ? (
          <>
            <p style={{ color: 'red', textDecoration: 'line-through' }}>{name}</p>
            <p style={{ color: 'red', fontSize: "14px" }}>Queimou a largada</p>
          </>
        ) : (
          <></>
        )}

        
      </div>
    </div>
  );
};

export default RankingItem;
