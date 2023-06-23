import React from 'react';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import RankingItem from './RankingItem';
import crown from '../../../assets/crown.png';
import thumbDown from '../../../assets/thumbs-down.png';
import Background from '../../../components/Background';
import noOneFiredImage from '../../../assets/no-votes.png';
import Header from '../../../components/Header';
import { AvatarDiv, Crown, ThumbsDown, BannerText, Banners, Content, Ranking, ShotTime, Winner, Loser, Players, OnlyWinner, NoOneVoted, Text } from './Ranking.style';


type Results = {
  id: string;
  nickname: string;
  avatarSeed: string;
  shotTime: number;
};

interface RankingProps {
  data: Results[];
  finalRanking: boolean;
  roulettePage: () => void;
  gamePage: () => void;
  turnVisibility: boolean;
  owner: boolean;
}

const getGuidanceText = (players: Results[], noOneFired: boolean) => { 
  if(players.length === 0) return ''; 
  if(noOneFired) return 'Todo mundo bebe!';
  const firedTooSoon = players.filter(p => p.shotTime === -10001);
  if(firedTooSoon.length > 0) return 'Quem queimou a largada bebe!';
  return 'Quem atirou por último bebe!';
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
          shotTime: Infinity,
        };

  const loser =
    data.length > 1
      ? data[data.length - 1]
      : {
          id: 1,
          nickname: 'carregando...',
          avatarSeed: 'a loser avatar has no seed',
          shotTime: Infinity,
        };

  let losersCount = 0;
  let noOneFired = false;

  data.forEach((player) => {
    if (player.shotTime / -1000 >= 10) {
      losersCount++;
    }
  });

  if (losersCount === data.length) {
    noOneFired = true;
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
      <Ranking>
        <Content>
          <Banners>
            {((losersCount < 2) && finalRanking)? (
              <>
                <Winner>
                  <AvatarDiv>
                    <Crown src={crown} />
                    <Avatar seed={winner.avatarSeed} />
                  </AvatarDiv>
                  <BannerText>{winner.nickname}</BannerText>
                  <ShotTime>
                    {(winner.shotTime / -1000).toFixed(2)}s
                  </ShotTime>
                </Winner>
                <Loser>
                  <AvatarDiv>
                    <Avatar seed={loser.avatarSeed} />
                    <ThumbsDown src={thumbDown} />
                  </AvatarDiv>
                  <BannerText>{loser.nickname}</BannerText>
                    <ShotTime>
                      {(loser.shotTime / -1000).toFixed(2)}s
                    </ShotTime>
                </Loser>
              </>
            ) : (
              <OnlyWinner>
                <AvatarDiv>
                  {!noOneFired ? (
                    <>
                      <Crown src={crown} />
                      <Avatar seed={winner.avatarSeed} />
                    </>
                  ) : (
                    <NoOneVoted
                      src={noOneFiredImage}
                    />
                  )}
                </AvatarDiv>
                {!noOneFired ? (
                  <>
                    <BannerText>{winner.nickname}</BannerText>
                    <ShotTime>
                      {(winner.shotTime / -1000).toFixed(2)}s
                    </ShotTime>
                  </>
                ) : (
                  <BannerText>
                    Todo mundo
                    <br />
                    morreu!
                  </BannerText>
                )}
              </OnlyWinner>
            )}
          </Banners>

          <Players>
            {data.map((player, i) => (
              <RankingItem
                key={i}
                name={player.nickname}
                time={(player.shotTime) / -1000}
                position={i}
              />
            ))}
          </Players>

          {finalRanking && <Text>
              {getGuidanceText(data, noOneFired)}
          </Text>}
        </Content>
        {button}
      </Ranking>
    </Background>
  );
}
