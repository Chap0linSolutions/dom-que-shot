import { useState, useEffect, useRef } from 'react';
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

enum Times {
  Disconnected = -20000,
  InvalidShot = -10000,
  GameOver = 10000,
}

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
  owner: boolean;
}

export function GamePage({
  rankingPage,
  shot,
  everyoneIsReady,
  iAmReady,
  owner,
}: GameProps) {
  const [balloonText, setBalloonText] = useState('Prontos?');
  const [msTimer, setMsTimer] = useState(1); //tem de ter valor inicial > 0
  const [errorMsg, setErrorMsg] = useState<Error[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const startTimer = () => {
    setTimer(setInterval(run, 77));
  };

  const balloonTextRef = useRef(null);
  const balloonRef = useRef(null);

  useEffect(() => {
    gsap.to(balloonRef.current, { opacity: 0.01, duration: 0 });
  }, []);

  useEffect(() => {
    if (everyoneIsReady) {
      animationBalloon();
    }
  }, [everyoneIsReady]);

  let updatedMs = msTimer;
  const run = () => {
    updatedMs -= 97;
    return setMsTimer(updatedMs);
  };

  useEffect(() => {
    if (msTimer <= Times.InvalidShot) {
      clearInterval(timer);
      shot(Times.InvalidShot);
      rankingPage();
    }
  }, [msTimer]);

  const formatedTime = (): number => {
    if (msTimer > 0) {
      return Times.GameOver;
    }
    return Times.GameOver + msTimer;
  };

  const animationBalloon = () => {
    const timeline = gsap.timeline();
    timeline
      .to(balloonRef.current, { opacity: 1, duration: 0 })
      .to(balloonRef.current, { opacity: 1, duration: 0 })
      .to(balloonRef.current, { opacity: 0, duration: 0.5, delay: 1 })
      .to(balloonTextRef.current, { opacity: 1, fontSize: 44, duration: 0 })
      .call(() => {
        setBalloonText('3');
      })
      .to(balloonRef.current, { opacity: 1, duration: 0, delay: 0.1 })
      .to(balloonRef.current, { opacity: 0, duration: 0.5, delay: 0.5 })
      .call(() => {
        setBalloonText('2');
      })
      .to(balloonRef.current, { opacity: 1, duration: 0, delay: 0.1 })
      .to(balloonRef.current, { opacity: 0, duration: 0.5, delay: 0.5 })
      .call(() => {
        setBalloonText('1');
      })
      .to(balloonRef.current, { opacity: 1, duration: 0, delay: 0.1 })
      .to(balloonTextRef.current, {
        display: 'none',
        duration: 0,
        delay: 0.9,
      })
      .to(balloonRef.current, {
        display: 'none',
        duration: 0,
      })
      .to('.target-image', { opacity: 1, duration: 0.1 })
      .call(startTimer);
  };

  const shotValidation = () => {
    if (msTimer > 0) {
      // queima da largada
      console.log('False start');
      shot(Times.InvalidShot - msTimer);
    } else {
      shot(msTimer);
    }
  };

  const handleClick = () => {
    if (!everyoneIsReady) return;
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
        <Header participants={owner} timer={formatedTime()} />

        <div onClick={popNewError} className="target-image">
          <img src={targetImage} className="target-img" />
          {errorMsg.map((error) => (
            <div className="wrong-local-container" style={error.style}>
              <p className="wrong-local-message">{error.text}</p>
            </div>
          ))}
        </div>

        <div className="animation-balloon" ref={balloonRef}>
          <img
            src={balloon}
            className="balloon-img"
            onLoad={iAmReady}
            onError={iAmReady}
          />
          <p ref={balloonTextRef} className="balloon-text">
            {balloonText}
          </p>
        </div>

        <button className="button-bang" onClick={handleClick}></button>
      </div>
    </Background>
  );
}
