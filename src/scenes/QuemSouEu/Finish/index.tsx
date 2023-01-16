import React, { useState, useEffect } from 'react';
import Background from '../../../components/Background';
import { ListedPlayerProps } from '../QuemSouEu';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import beer from '../../../assets/beer.png';
import crown from '../../../assets/crown.png';
import './Finish.css';



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

  useEffect(() => {   
    gsap.timeline()
    .to('.WhoPlayerInnerCard', {
      opacity: 0,
      scale: 0,
      xPercent: 100,
      rotation: 180,
      duration: 0,
    }).to('.WhoPlayerInnerCard', {
      opacity: 1,
      scale: 1,
      xPercent: 0,
      rotation: 0,
      duration: 1,
      ease: 'back'
    });

    gsap.to('.WhoCardsTextDiv', { opacity: 1, duration: 2, delay: 1 });
    gsap.to('.WhoCardsNickname', { opacity: 1, delay: 1, duration: 1 });
    gsap.to('.WhoResultsButton', { opacity: 1, duration: 1, delay: 2 });
  }, []);

  useEffect(() => {
    gsap.to('.WhoIcon', {
      rotate: -360,
      duration: 5,
      ease: 'linear',
      repeat: -1,
    });
  });

  const [winners, setWinners] = useState<ListedPlayerProps[]>(players.filter(player => player.id === 1000));
  const [losers, setLosers ] = useState<ListedPlayerProps[]>(players.filter(player => player.id === 0));

  return (
    <Background>
      <Header logo={logo}/>
      <div className="WhoDiv">
        <p className="WhoTitle">Quem acertou:</p>
        <div className="WhoCardsWinnersDiv">
          {winners.map((player) => (
            <div key={player.nickname} className="WhoPlayerOuterCard">
              <div className="WhoPlayerInnerCard Avatar">
                <Avatar seed={player.avatarSeed} />
              </div>
              <div className="WhoCardsTextDiv">
                <p className="WhoCardsNickname">{player.nickname}</p>
                <p className="WhoCardsRole">{player.whoYouAre}</p>
              </div>
            </div>
          ))}
          <div className="WhoIconDiv" style={{backgroundColor: '#F9C95C'}}>
            <img src={crown} className="WhoIcon"/>
          </div>
        </div>

        <p className="WhoTitle">Quem perdeu &#40;e bebe&#41;:</p>
        <div className='WhoCardsLosersDiv'>
            <div className="WhoCardsLoser">
              {losers.map((player) => (
                <div key={player.nickname} className="WhoPlayerOuterCard">
                  <div className="WhoPlayerInnerCard Avatar">
                    <Avatar seed={player.avatarSeed} />
                  </div>
                  <div className="WhoCardsTextDiv">
                    <p className="WhoCardsNickname">{player.nickname}</p>
                    <p className="WhoCardsRole">{player.whoYouAre}</p>
                  </div>
                </div>
              ))}
            </div>
          <div className="WhoIconDiv" style={{backgroundColor: '#8877DF'}}>
            <img src={beer} className="WhoIcon"/>
          </div>
        </div>
        <div
          className="WhoResultsButton"
          style={
            turnVisibility
              ? { visibility: 'visible' }
              : { visibility: 'hidden', height: 0, padding: 0 }
          }>
          <Button onClick={roulettePage}>{rouletteButtonText}</Button>
        </div>
      </div>
    </Background>
  );
}
