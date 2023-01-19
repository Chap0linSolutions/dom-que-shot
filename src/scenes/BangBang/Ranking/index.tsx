import React from 'react';
import './Ranking.css';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import RankingItem from './RankingItem';
import thumbDown from './img/thumbs-down.png';
import crown from './img/crown.png';
import Background from '../../../components/Background';
import noOneVotedImage from '../../../assets/no-votes.png';

type Player = {
  id: string;
  nickname: string;
  seed: string;
  shotTime: string;
};

interface RankingProps {
  data: Player[];
  finalRanking: boolean;
  roulettePage: () => void;
  gamePage: () => void;
  turnVisibility: boolean;
}

export function RankingPage({
  data,
  finalRanking,
  roulettePage,
  turnVisibility,
}: RankingProps) {
  if (data.length === 0) {
    return <p>Loading...</p>;
  }
  const winner = data[0];
  const loser = data[data.length - 1];
  let count = 0;
  let noOneVoted = false;

  data.forEach((player) => {
    if (parseInt(player.shotTime) / -1000 >= 10) {
      count++;
    }
  });

  if (count === data.length) {
    noOneVoted = true;
  }

  return (
    <Background>
      <div id="ranking-page" className="ranking-page">
        <div className="container-header">
          {count < 2 ? (
            <>
              <div className="container-winner">
                <div className="background-avatar">
                  <img className="crown" src={crown} />
                  <Avatar seed={winner.seed} />
                </div>
                <p>{winner.nickname}</p>
                <span>{(parseInt(winner.shotTime) / -1000).toFixed(2)}s</span>
              </div>
              <div className="container-loser">
                <div className="background-avatar">
                  {finalRanking && <Avatar seed={loser.seed} />}
                  <img className="thumbDown" src={thumbDown} />
                </div>
                {finalRanking && <p>{loser.nickname}</p>}
                {finalRanking && (
                  <span>{(parseInt(loser.shotTime) / -1000).toFixed(2)}s</span>
                )}
              </div>
            </>
          ) : (
            <div className="container-only-winner">
              <div className="background-avatar">
                {!noOneVoted ? (
                  <>
                    <img className="only-crown" src={crown} />
                    <Avatar seed={winner.seed} />
                  </>
                ) : (
                  <img
                    src={noOneVotedImage}
                    width="63px;"
                    style={{ transform: 'rotate(10deg)' }}
                  />
                )}
              </div>
              {!noOneVoted ? (
                <>
                  <p>{winner.nickname}</p>
                  <span>{(parseInt(winner.shotTime) / -1000).toFixed(2)}s</span>
                </>
              ) : (
                <p style={{ textAlign: 'center' }}>
                  Todo mundo
                  <br />
                  morreu!
                </p>
              )}
            </div>
          )}
        </div>

        <div className="container-body">
          <div className="ranking-container">
            {data.map((player, i) => (
              <RankingItem
                key={i}
                name={player.nickname}
                time={parseInt(player.shotTime) / -1000}
                position={i}
              />
            ))}
          </div>
          <div
            style={
              turnVisibility && finalRanking
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }>
            <Button onClick={roulettePage}>Próximo Jogo</Button>
          </div>
        </div>
      </div>
    </Background>
  );
}
