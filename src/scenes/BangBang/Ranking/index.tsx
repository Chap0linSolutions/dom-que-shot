import React from 'react';
import './Ranking.css';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import RankingItem from './RankingItem';
import thumbDown from './img/thumbs-down.png';
import crown from './img/crown.png';
import Background from '../../../components/Background';
import noOneVotedImage from '../../../assets/no-votes.png';
import Header from '../../../components/Header';

type Results = {
  id: string;
  nickname: string;
  avatarSeed: string;
  shotTime: string;
};

interface RankingProps {
  data: Results[];
  finalRanking: boolean;
  roulettePage: () => void;
  gamePage: () => void;
  turnVisibility: boolean;
  owner: boolean;
}

export function RankingPage({
  data,
  finalRanking,
  roulettePage,
  turnVisibility,
  owner,
}: RankingProps) {
  const winner =
    data.length > 0
      ? data[0]
      : {
          id: 0,
          nickname: 'carregando...',
          avatarSeed: 'a winner avatar has no seed',
          shotTime: `${Infinity}`,
        };

  const loser =
    data.length > 1
      ? data[data.length - 1]
      : {
          id: 1,
          nickname: 'carregando...',
          avatarSeed: 'a loser avatar has no seed',
          shotTime: `${Infinity}`,
        };

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

  const button =
    turnVisibility === true ? (
      <Button isDisabled={!finalRanking} staysOnBottom onClick={roulettePage}>
        Próximo jogo
      </Button>
    ) : null;

  return (
    <Background>
      <Header participants={owner} />
      <div id="ranking-page" className="ranking-page">
        <div className="RankingDiv">
          <div className="container-header">
            {count < 2 ? (
              <>
                <div className="container-winner">
                  <div className="background-avatar">
                    <img className="crown" src={crown} />
                    <Avatar seed={winner.avatarSeed} />
                  </div>
                  <p>{winner.nickname}</p>
                  <span>{(parseInt(winner.shotTime) / -1000).toFixed(2)}s</span>
                </div>
                <div className="container-loser">
                  <div className="background-avatar">
                    {finalRanking && <Avatar seed={loser.avatarSeed} />}
                    <img className="thumbDown" src={thumbDown} />
                  </div>
                  {finalRanking && <p>{loser.nickname}</p>}
                  {finalRanking && (
                    <span>
                      {(parseInt(loser.shotTime) / -1000).toFixed(2)}s
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="container-only-winner">
                <div className="background-avatar">
                  {!noOneVoted ? (
                    <>
                      <img className="only-crown" src={crown} />
                      <Avatar seed={winner.avatarSeed} />
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
                    <span>
                      {(parseInt(winner.shotTime) / -1000).toFixed(2)}s
                    </span>
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
          </div>
        </div>
        {button}
      </div>
    </Background>
  );
}
