import React, { useEffect } from 'react';
import { Player } from '../../../contexts/GlobalContextProvider';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import noOneVoted from '../../../assets/no-votes.png';
import './Finish.style';
import {
  Finish,
  Content,
  Title,
  Text,
  NoVotesText,
  TieText,
  TieTitle,
  NoVotesOuter,
  NoVotesInner,
  AvatarDiv,
  NoVotesImg,
  OuterCard,
  InnerCard,
  Tie,
  TieOuter,
  TieInner,
  TieAvatar,
  MultipleTies,
  MultipleTiesInner,
  MultipleTiesOuter,
  MultipleTiesTextDiv,
  MultipleTiesText,
  MultipleTiesTitle,
  MultipleTiesAvatar,
} from './Finish.style';


interface CoverProps {
  votedPlayer: Player[];
  numberOfVotes: number;
  turnVisibility: boolean;
  roulettePage: () => void;
}

export default function FinishPage({
  votedPlayer,
  roulettePage,
  turnVisibility,
  numberOfVotes,
}: CoverProps) {
  const rouletteButtonText = 'Próximo jogo';

  useEffect(() => {
    gsap.from('.OuterCard', {
      opacity: 0,
      xPercent: 100,
      duration: 1,
      ease: 'back',
    });
    gsap.from('.InnerCard', {
      opacity: 0,
      xPercent: -400,
      duration: 1,
      ease: 'back',
    });
    gsap.from('.Avatar', {
      opacity: 0,
      rotation: 180,
      delay: 1,
      duration: 1,
      ease: 'back',
    });
    gsap.from('.MultipleTiesTextDiv', { opacity: 0, duration: 2, delay: 1 });
    gsap.from('.MultipleTiesOuterCard', { scaleX: 0, duration: 1 });
    gsap.from('.Nickname', { opacity: 0, delay: 1, duration: 1 });
    gsap.from('.ResultsButtons', { opacity: 0, duration: 1, delay: 2 });
  }, []);

  const button =
    turnVisibility === true ? (
      <Button staysOnBottom onClick={roulettePage}>
        {rouletteButtonText}
      </Button>
    ) : null;

  const votesText = numberOfVotes > 1 ? ' votos' : ' voto';

  if (numberOfVotes === 0) {
    return (
      <Background noImage>
        <Header />
        <Finish>
          <Content>
            <Title>POXA! Ninguém votou?</Title>
            <Text>&#40;É sério isso?&#41;</Text>
            <NoVotesOuter className="OuterCard">
              <NoVotesInner className="InnerCard">
                <Text />
                <AvatarDiv className="Avatar">
                  <NoVotesImg src={noOneVoted} />
                </AvatarDiv>
                <Text className="Nickname">R.I.P. Votação</Text>
              </NoVotesInner>
            </NoVotesOuter>
            <NoVotesText>
              Neste caso...
              <br />
              TODO mundo bebe!
            </NoVotesText>
          </Content>
          {button}
        </Finish>
      </Background>
    );
  }

  if (votedPlayer.length == 1) {
    return (
      <Background noImage>
        <Header />
        <Finish>
          <Content>
            <Title>E o mais votado foi:</Title>
            <OuterCard className="OuterCard">
              <Text />
              <InnerCard className="InnerCard">
                <Text />
                <AvatarDiv className="Avatar">
                  <Avatar seed={votedPlayer.at(0).avatarSeed} />
                </AvatarDiv>
                <Text className="Nickname">{votedPlayer.at(0).nickname}</Text>
              </InnerCard>
              <Text>
                {numberOfVotes} {votesText}
              </Text>
            </OuterCard>
          </Content>
          {button}
        </Finish>
      </Background>
    );
  }

  if (votedPlayer.length == 2) {
    return (
      <Background noImage>
        <Header />
        <Finish>
          <Content>
            <Title>Tivemos um empate!</Title>
            <Tie>
              <TieOuter className="OuterCard">
                <TieText />
                <TieInner className="InnerCard">
                  <TieAvatar className="Avatar">
                    <Avatar seed={votedPlayer.at(0).avatarSeed} />
                  </TieAvatar>
                  <TieText className="Nickname">
                    {votedPlayer.at(0).nickname}
                  </TieText>
                </TieInner>
                <TieText>
                  {numberOfVotes}
                  {votesText}
                </TieText>
              </TieOuter>
              <TieOuter className="OuterCard">
                <TieText />
                <TieInner className="InnerCard">
                  <TieAvatar className="Avatar">
                    <Avatar seed={votedPlayer.at(1).avatarSeed} />
                  </TieAvatar>
                  <TieText className="Nickname">
                    {votedPlayer.at(1).nickname}
                  </TieText>
                </TieInner>
                <TieText>
                  {numberOfVotes} {votesText}
                </TieText>
              </TieOuter>
            </Tie>
            <TieTitle>
              Neste caso, todos os
              <br />
              empatados devem beber!
            </TieTitle>
          </Content>
          {button}
        </Finish>
      </Background>
    );
  }

  return (
    <Background noImage>
      <Finish>
        <Content>
          <MultipleTiesTitle>Tivemos um empate!</MultipleTiesTitle>
          <MultipleTies>
            {votedPlayer.map((player) => (
              <MultipleTiesOuter className="OuterCard">
                <MultipleTiesInner className="InnerCard">
                  <MultipleTiesAvatar className="Avatar">
                    <Avatar seed={player.avatarSeed} />
                  </MultipleTiesAvatar>
                </MultipleTiesInner>
                <MultipleTiesTextDiv className="Nickname">
                  <MultipleTiesText>{player.nickname}</MultipleTiesText>
                  <Text>
                    {numberOfVotes} {votesText}
                  </Text>
                </MultipleTiesTextDiv>
              </MultipleTiesOuter>
            ))}
          </MultipleTies>
          <TieTitle>
            Neste caso, todos os
            <br />
            empatados devem beber!
          </TieTitle>
        </Content>
        {button}
      </Finish>
    </Background>
  );
}
