import React, { useEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import noOneVoted from '../../../assets/no-votes.png';
import './Finish.css';

interface VotedPlayerProps {
  nickname: string;
  avatarSeed: string;
  votes: number;
}

interface CoverProps {
  votedPlayer: VotedPlayerProps[];
  turnVisibility: boolean;
  roulettePage: () => void;
}

export default function FinishPage({
  votedPlayer,
  roulettePage,
  turnVisibility,
}: CoverProps) {
  const rouletteButtonText = 'Próximo jogo';

  useEffect(() => {
    gsap.from('.ResultsOuterCard', {
      opacity: 0,
      xPercent: 100,
      duration: 1,
      ease: 'back',
    });
    gsap.from('.ResultsInnerCard', {
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

  if (votedPlayer.at(0).votes === 0) {
    return (
      <Background noImage>
        <Header />
        <div className="OEscolhidoDiv">
          <div className="FinishVotesDiv">
            <p className="ResultsTitle">POXA! Ninguém votou?</p>
            <p className="ResultsText">&#40;É sério isso?&#41;</p>
            <div className="ResultsOuterCard NoVotesInner">
              <p className="ResultsText" />
              <div className="ResultsInnerCard NoVotesOuter">
                <p className="ResultsText" />
                <div className="ResultsAvatar Avatar">
                  <img src={noOneVoted} />
                </div>
                <p className="ResultsText Nickname">R.I.P. Votação</p>
              </div>
              <p className="ResultsText" />
            </div>
            <p className="ResultsText NoVotesText">
              Neste caso...
              <br />
              TODO mundo bebe!
            </p>
          </div>
          {button}
        </div>
      </Background>
    );
  }

  if (votedPlayer.length == 1) {
    return (
      <Background noImage>
        <Header />
        <div className="OEscolhidoDiv">
          <div className="FinishVotesDiv">
            <p className="ResultsTitle">E o mais votado foi:</p>
            <div className="ResultsOuterCard">
              <p className="ResultsText" />
              <div className="ResultsInnerCard">
                <p className="ResultsText" />
                <div className="ResultsAvatar Avatar">
                  <Avatar seed={votedPlayer.at(0).avatarSeed} />
                </div>
                <p className="ResultsText Nickname">
                  {votedPlayer.at(0).nickname}
                </p>
              </div>
              <p className="ResultsText">{`${
                votedPlayer.at(0).votes
              } votos`}</p>
            </div>
          </div>
          {button}
        </div>
      </Background>
    );
  }

  if (votedPlayer.length == 2) {
    return (
      <Background noImage>
        <Header />
        <div className="OEscolhidoDiv">
          <div className="FinishVotesDiv">
            <p className="ResultsTitle">Tivemos um empate!</p>
            <div className="Tie">
              <div className="ResultsOuterCard TieOuter">
                <p className="ResultsText TieText" />
                <div className="ResultsInnerCard TieInner">
                  <div className="ResultsAvatar TieAvatar Avatar">
                    <Avatar seed={votedPlayer.at(0).avatarSeed} />
                  </div>
                  <p className="ResultsText TieText Nickname">
                    {votedPlayer.at(0).nickname}
                  </p>
                </div>
                <p className="ResultsText TieText">{`${
                  votedPlayer.at(0).votes
                } votos`}</p>
              </div>
              <div className="TieSpacer" />
              <div className="ResultsOuterCard TieOuter">
                <p className="ResultsText TieText" />
                <div className="ResultsInnerCard TieInner">
                  <div className="ResultsAvatar TieAvatar Avatar">
                    <Avatar seed={votedPlayer.at(1).avatarSeed} />
                  </div>
                  <p className="ResultsText TieText Nickname">
                    {votedPlayer.at(1).nickname}
                  </p>
                </div>
                <p className="ResultsText TieText">{`${
                  votedPlayer.at(1).votes
                } votos`}</p>
              </div>
            </div>
            <p className="ResultsText TieTitle">
              Neste caso, ambos os empatados devem beber!
            </p>
          </div>
          {button}
        </div>
      </Background>
    );
  }

  return (
    <Background noImage>
      <Header />
      <div className="OEscolhidoDiv">
        <div className="FinishVotesDiv FullHeight">
          <p className="ResultsTitle">Tivemos um empate!</p>
          <div className="ResultsMultipleTies">
            {votedPlayer.map((player) => (
              <div className="MultipleTiesOuterCard">
                <div className="MultipleTiesInnerCard Avatar">
                  <Avatar seed={player.avatarSeed} />
                </div>
                <div className="MultipleTiesTextDiv">
                  <p className="MultipleTiesText">{player.nickname}</p>
                  <p>{player.votes} votos</p>
                </div>
              </div>
            ))}
          </div>
          <p className="ResultsText TieTitle">
            Neste caso, todos os empatados devem beber!
          </p>
        </div>
        {button}
      </div>
    </Background>
  );
}
