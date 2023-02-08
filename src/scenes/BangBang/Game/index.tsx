import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import targetImage from './img/target.png';
import Background from '../../../components/Background';
import balloon from './img/balao.png';
import gsap from 'gsap';
import './Game.css';

const errorMsgs = [
  <>Errooooou!</>,
  <>Tu é cego?!</>,
  <>É pra apertar o BOTÃO!</>,
  <>
    Isso parece um
    <br />
    BOTÃO pra você?
  </>,
  <>
    ISSO NÃO
    <br />É UM BOTÃO!!!
  </>,
  <>Tá brincando, só pode...</>,
];

type ErrorStyle = {
  left: string;
  top: string;
};

type Error = {
  text: JSX.Element;
  style: ErrorStyle;
};

interface GameProps {
  rankingPage: () => void;
  shot: (ms: number) => void;
  everyoneIsReady: boolean;
  iAmReady: () => void;
}

export function GamePage({
  rankingPage,
  shot,
  everyoneIsReady,
  iAmReady,
}: GameProps) {
  const [balloonText, setBalloonText] = useState('Prontos?');
  const [msTimer, setMsTimer] = useState(1); //tem de ter valor inicial > 0
  const [errorMsg, setErrorMsg] = useState<Error[]>([]);

  const [timer, setTimer] = useState<NodeJS.Timer>();
  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  useEffect(() => {
    gsap.to('.balloon-img', { opacity: 1, duration: 0 });
  }, []);

  useEffect(() => {
    if (everyoneIsReady) {
      animationBalloon();
    }
  }, [everyoneIsReady]);

  let updatedMs = msTimer;
  const run = () => {
    updatedMs -= 10;
    return setMsTimer(updatedMs);
  };

  useEffect(() => {
    if (msTimer <= -10000) {
      clearInterval(timer);
      shot(-10000);
      rankingPage();
    }
  }, [msTimer]);

  const formatedTime = (): number => {
    if (msTimer > 0) {
      return 10000;
    }
    return 10000 + msTimer;
  };

  const animationBalloon = () => {
    const timeline = gsap.timeline();
    timeline
      .to('.animation-balloon', { opacity: 1, duration: 0 })
      .to('.animation-balloon', { opacity: 0, duration: 0.5, delay: 1 })
      .call(() => {
        setBalloonText('3');
      })
      .to('.balloon-text', { fontSize: 44, duration: 0 })
      .to('.animation-balloon', { opacity: 1, duration: 0, delay: 0.1 })
      .to('.animation-balloon', { opacity: 0, duration: 0.5, delay: 0.5 })
      .call(() => {
        setBalloonText('2');
      })
      .to('.animation-balloon', { opacity: 1, duration: 0, delay: 0.1 })
      .to('.animation-balloon', { opacity: 0, duration: 0.5, delay: 0.5 })
      .call(() => {
        setBalloonText('1');
      })
      .to('.animation-balloon', { opacity: 1, duration: 0, delay: 0.1 })
      .to('.animation-balloon, .balloon-text', {
        display: 'none',
        duration: 0,
        delay: 0.9,
      })
      .to('.target-image', { opacity: 1, duration: 0.1 })
      .call(startTimer);
  };

  const shotValidation = () => {
    if (msTimer > 0) {
      // queima da largada
      console.log('False start');
      shot(-10000 - msTimer);
    } else {
      shot(msTimer);
    }
  };

  const handleClick = () => {
    shotValidation();
    clearInterval(timer);
    rankingPage();
  };

  const popNewError = () => {
    const newMsg = errorMsgs.sort(() => 0.5 - Math.random())[0];
    const newMsgPosition = {
      left: `${Math.round(50 * Math.random())}%`,
      top: `${Math.round(50 * Math.random())}%`,
    };
    setErrorMsg(errorMsg.concat([{ text: newMsg, style: newMsgPosition }]));
  };

  return (
    <Background>
      <div id="game-bang-bang" className="game-bang-bang">
        <Header timer={formatedTime()} />

        <div onClick={popNewError} className="target-image">
          <img src={targetImage} className="target-img" />
          {errorMsg.map((error) => (
            <div className="wrong-local-container" style={error.style}>
              <p className="wrong-local-message">{error.text}</p>
            </div>
          ))}
        </div>

        <div className="animation-balloon">
          <img src={balloon} className="balloon-img" onLoad={iAmReady} />
          <p className="balloon-text">{balloonText}</p>
        </div>

        <button className="button-bang" onClick={handleClick}></button>
      </div>
    </Background>
  );
}
