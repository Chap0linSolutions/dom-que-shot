import { useState, useEffect } from 'react';
import './BangBang.css';
import targetImage from '../../../assets/BangBang/target.png';
import balloon1 from '../../../assets/BangBang/balao1.png';
import balloon2 from '../../../assets/BangBang/balao2.png';
import balloon3 from '../../../assets/BangBang/balao3.png';
import balloonReady from '../../../assets/BangBang/balao-prontos.png';
import gsap from 'gsap';
import { RankingPage } from '../Ranking';

enum ButtonStatus {
  enabled = 1,
  disabled = 0,
  used = -1,
}


interface GameProps {
  rankingPage: () => void;
  shot: (ms: number) => void;
  ready: boolean;
}


export function GamePage({rankingPage, shot, ready} : GameProps) {

  const [msTimer, setMsTimer] = useState(5000);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(
    ButtonStatus.disabled
  );
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const [deadline, setDeadline] = useState(false);

  const [balloonImg, setBalloonImg] = useState(balloonReady);

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  useEffect(() => {
    ready && startTimer();
  }, [ready])

  let updatedMs = msTimer;
  const run = () => {
    updatedMs -= 10;
    return setMsTimer(updatedMs);
  };

  useEffect(() => {
    if (msTimer <= 0 && buttonStatus === ButtonStatus.disabled) {
      setButtonStatus(ButtonStatus.enabled);
    }
  }, [setButtonStatus, buttonStatus, msTimer]);

  useEffect(() => {
    if (msTimer <= -10000 && deadline == false){
      setDeadline(true);
      clearInterval(timer);
      shot(-10000);
      rankingPage();
    }
  }, [msTimer, deadline]);


  const formatedTime = (): string => {
    return (msTimer / 1000).toFixed(2);
  };


  const animationBalloon = () => {
    const timeline = gsap.timeline()
    timeline
      .to('.animation-balloon', { opacity: 1, duration: 0.5 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 }).call( () => {
        setBalloonImg(balloon3)
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.2 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 }).call( () => {
        setBalloonImg(balloon2)
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.2 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 }).call( () => {
        setBalloonImg(balloon1)
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.2 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 })
        setBalloonImg(balloonReady)
  }

  const handleClick = () => {
    shot(msTimer);
    clearInterval(timer);
    setButtonStatus(ButtonStatus.used);
    rankingPage();
  }


  return (
    <div id="game-bang-bang" className="container">
      <div className="cronometer-container" onClick={animationBalloon}>
        <h2>{`${formatedTime()}s`}</h2>
      </div>
    
      <div className={`target-image ${balloonImg == balloon1 ? "active" : "hidden"}`}>
        <img src={targetImage} alt="Target image" />
      </div>
      
      <div className="animation-balloon">
        <img src={balloonImg}/>
      </div>

      <button className='button-bang' onClick={handleClick} disabled={buttonStatus !== ButtonStatus.enabled}>
      </button>
    </div>
  );
};
