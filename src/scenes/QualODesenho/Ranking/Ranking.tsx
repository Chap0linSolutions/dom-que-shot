import React from 'react';
import './Ranking.style';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import RankingItem from './RankingItem';
import thumbDown from './img/thumbs-down.png';
import crown from './img/crown.png';
import Background from '../../../components/Background';
import noOneVotedImage from '../../../assets/no-votes.png';
import { guessingPlayer } from '../QualODesenho';
import {
  Content,
  RankingDiv,
  ContainerHeader,
  ContainerOnlyWinner,
  ContainerWinner,
  ContainerLoser,
  BackgroundAvatar,
  ContainerBody,
  RankingContainer,
} from './Ranking.style';

interface RankingProps {
  data: guessingPlayer[];
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

  const convertTime = (strTime: string) => {
    return 60 - parseFloat(strTime) / 1000;
  };

  data.forEach((player) => {
    if (convertTime(player.guessTime) >= 60) {
      count++;
    }
  });

  if (count === data.length) {
    noOneVoted = true;
  }

  const button =
    turnVisibility === true ? (
      <Button staysOnBottom onClick={roulettePage}>
        Próximo jogo
      </Button>
    ) : null;

  return (
    <Background>
      <Content>
        <RankingDiv>
          <ContainerHeader>
            {count < 2 ? (
              <>
                <ContainerWinner>
                  <BackgroundAvatar>
                    <img className="crown" src={crown} />
                    <Avatar seed={winner.avatarSeed} />
                  </BackgroundAvatar>
                  <p>{winner.nickname}</p>
                  <span>{convertTime(winner.guessTime)}s</span>
                </ContainerWinner>
                <ContainerLoser>
                  <BackgroundAvatar>
                    {finalRanking && <Avatar seed={loser.avatarSeed} />}
                    <img className="thumbDown" src={thumbDown} />
                  </BackgroundAvatar>
                  {finalRanking && <p>{loser.nickname}</p>}
                  {finalRanking && <span>{convertTime(loser.guessTime)}s</span>}
                </ContainerLoser>
              </>
            ) : (
              <ContainerOnlyWinner>
                <BackgroundAvatar>
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
                </BackgroundAvatar>
                {!noOneVoted ? (
                  <>
                    <p>{winner.nickname}</p>
                    <span>{convertTime(winner.guessTime)}s</span>
                  </>
                ) : (
                  <p style={{ textAlign: 'center' }}>
                    Ninguem
                    <br />
                    acertou!
                  </p>
                )}
              </ContainerOnlyWinner>
            )}
          </ContainerHeader>

          <ContainerBody>
            <RankingContainer>
              {data.map((player, i) => (
                <RankingItem
                  key={i}
                  name={player.nickname}
                  time={convertTime(player.guessTime)}
                  position={i}
                />
              ))}
            </RankingContainer>
          </ContainerBody>
        </RankingDiv>
        {button}
      </Content>
    </Background>
  );
}
