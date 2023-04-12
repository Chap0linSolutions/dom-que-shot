import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'react-feather';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import { Player } from '../../../contexts/GlobalContextProvider';
import {
  AvatarDiv,
  Check,
  Content,
  InnerCard,
  OuterCard,
  Text,
  Title,
} from './Awaiting.style';
interface AwaitingProps {
  votedPlayer: Player;
  msTimeLeft: number;
  finishPage: () => void;
}

export default function AwaitingResults({
  votedPlayer,
  msTimeLeft,
}: AwaitingProps) {
  const titleRef = useRef(null);
  const checkRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from([titleRef.current, checkRef.current], {
      opacity: 0,
      yPercent: 600,
      delay: 0.25,
      duration: 1,
      ease: 'power1',
    });
    gsap.from(cardRef.current, {
      scale: 0,
      rotation: 45,
      opacity: 0,
      duration: 1,
      ease: 'power3',
    });
  }, []);

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
      <Content>
        <Title ref={titleRef}>Você votou!</Title>

        <Check ref={checkRef}>
          <CheckCircle color="lime" width="100%" height="100%" />
        </Check>

        <OuterCard ref={cardRef}>
          <InnerCard>
            <AvatarDiv>
              <Avatar seed={votedPlayer.avatarSeed} />
            </AvatarDiv>
            <Text>{votedPlayer.nickname}</Text>
          </InnerCard>
        </OuterCard>
        <Text>
          Aguardando os <br />
          demais jogadores...
        </Text>
      </Content>
    </Background>
  );
}
