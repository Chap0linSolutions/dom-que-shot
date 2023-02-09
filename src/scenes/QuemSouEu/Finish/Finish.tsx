import React, { useLayoutEffect, useRef } from 'react';
import Background from '../../../components/Background';
import { ListedPlayerProps } from '../QuemSouEu';
import Header from '../../../components/Header';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import beer from '../../../assets/beer.png';
import crown from '../../../assets/crown.png';
import Button from '../../../components/Button';
import {
  AvatarDiv,
  Content,
  FinishDiv,
  Icon,
  IconDiv,
  LosersDiv,
  Name,
  NameAndRole,
  PlayerOuterCard,
  PlayersList,
  Role,
  Title,
  WinnersDiv,
  ButtonDiv,
} from './Finish.style';

interface CoverProps {
  logo: string;
  players: ListedPlayerProps[];
  turnVisibility: boolean;
  roulettePage: () => void;
}

export default function FinishPage({
  logo,
  players,
  roulettePage,
  turnVisibility,
}: CoverProps) {
  const rouletteButtonText = 'Próximo jogo';
  const finishButton = useRef();

  useLayoutEffect(() => {
    const cardAnimation = gsap
      .timeline()
      .to('.playerCard', {
        opacity: 0,
        scale: 0,
        xPercent: 100,
        rotation: 180,
        duration: 0,
      })
      .to('.playerCard', {
        opacity: 1,
        scale: 1,
        xPercent: 0,
        rotation: 0,
        duration: 1,
        ease: 'back',
      });

    const avatarAnimation = gsap
      .timeline()
      .to('.avatar', {
        opacity: 0,
        rotation: 180,
        duration: 0,
      })
      .to('.avatar', {
        opacity: 1,
        rotation: 0,
        duration: 1,
        delay: 0.25,
        ease: 'back',
      });

    const roleAnimation = gsap
      .timeline()
      .to('.role', {
        opacity: 0,
        duration: 0,
      })
      .to('.role', {
        opacity: 1,
        duration: 1,
        delay: 1,
      });

    const nickAnimation = gsap
      .timeline()
      .to('.nickname', {
        opacity: 0,
        duration: 0,
      })
      .to('.nickname', {
        opacity: 1,
        delay: 1.2,
        duration: 1,
      });

    const buttonAnimation = gsap
      .timeline()
      .to(finishButton.current, {
        opacity: 0,
        duration: 0,
      })
      .to(finishButton.current, {
        opacity: 1,
        duration: 1,
        delay: 1.4,
      });

    return () => {
      cardAnimation.revert();
      avatarAnimation.revert();
      roleAnimation.revert();
      nickAnimation.revert();
      buttonAnimation.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const iconAnimation = gsap.to('.icon', {
      rotate: -360,
      duration: 5,
      ease: 'linear',
      repeat: -1,
    });

    return () => {
      iconAnimation.revert();
    };
  });

  const winners = useRef<ListedPlayerProps[]>(
    players.filter((player) => player.id === 1000)
  );
  const losers = useRef<ListedPlayerProps[]>(
    players.filter((player) => player.id === 0)
  );

  const screenRatio = window.innerHeight < 740 ? [0.35, 0.48] : [0.42, 0.5];

  const loserStyle = {
    maxHeight:
      turnVisibility === true
        ? window.innerHeight * screenRatio[0]
        : window.innerHeight * screenRatio[1],
  };

  const button = (
    <Button margin="0 auto 40px auto" onClick={roulettePage}>
      {rouletteButtonText}
    </Button>
  );

  return (
    <Background>
      <Header logo={logo} />
      <FinishDiv>
        <Content>
          <Title>Quem acertou primeiro:</Title>
          <WinnersDiv>
            <PlayersList>
              {winners.current.map((player) => (
                <PlayerOuterCard className="playerCard" key={player.nickname}>
                  <AvatarDiv className="avatar">
                    <Avatar seed={player.avatarSeed} />
                  </AvatarDiv>
                  <NameAndRole>
                    <Name className="nickname">{player.nickname}</Name>
                    <Role className="role">{player.whoYouAre}</Role>
                  </NameAndRole>
                </PlayerOuterCard>
              ))}
            </PlayersList>
            <IconDiv style={{ backgroundColor: '#F9C95C' }}>
              <Icon className="icon" src={crown} />
            </IconDiv>
          </WinnersDiv>

          <Title>Quem bebe:</Title>
          <LosersDiv style={loserStyle}>
            <PlayersList>
              {losers.current.map((player) => (
                <PlayerOuterCard className="playerCard" key={player.nickname}>
                  <AvatarDiv className="avatar">
                    <Avatar seed={player.avatarSeed} />
                  </AvatarDiv>
                  <NameAndRole>
                    <Name className="nickname">{player.nickname}</Name>
                    <Role className="role">{player.whoYouAre}</Role>
                  </NameAndRole>
                </PlayerOuterCard>
              ))}
            </PlayersList>
            <IconDiv style={{ backgroundColor: '#8877DF' }}>
              <Icon className="icon" src={beer} />
            </IconDiv>
          </LosersDiv>
        </Content>

        <ButtonDiv ref={finishButton}>
          {turnVisibility === true ? button : null}
        </ButtonDiv>
      </FinishDiv>
    </Background>
  );
}
