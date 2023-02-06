import { useState, useRef, useEffect } from 'react';
import Header from '../../../components/Header';
import targetImage from './img/target.png';
import Background from '../../../components/Background';
import balloon from './img/balao.png';
import gsap from 'gsap';
import './Game.css';

enum ButtonStatus {
  enabled = 1,
  disabled = 0,
  used = -1,
}

interface GameProps {
  rankingPage: () => void;
  shot: (ms: number) => void;
  everyoneIsReady: boolean;
  iAmReady: () => void;
}

export function GamePage({ rankingPage, shot, everyoneIsReady, iAmReady }: GameProps) {

  const balloonImg = useRef();
  const [balloonText, setBalloonText] = useState('Prontos?');

  const [msTimer, setMsTimer] = useState(0);
  const [showPopUp, setPopUp] = useState(false);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(
    ButtonStatus.disabled
  );
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  useEffect(() => {
    gsap.to('.balloon-img', {opacity: 1, duration: 0});
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
    if (msTimer <= 0 && buttonStatus === ButtonStatus.disabled) {
      setButtonStatus(ButtonStatus.enabled);
    }
  }, [setButtonStatus, buttonStatus, msTimer]);

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
      .to('.animation-balloon', { opacity: 0, duration: 0, delay: 0.9 })
      .to('.target-image', { opacity: 1, duration: 0.1 })
      .call(startTimer);
    ;
  };

  const shotValidation = () => {
    if(msTimer > 0){ // queima da largada
      console.log("False start");
      shot(-10000 - msTimer);
    }
    else {
      shot(msTimer);
    }
  };

  const handleClick = () => {
    shotValidation();
    clearInterval(timer);
    setButtonStatus(ButtonStatus.used);
    rankingPage();
  };

  const showErrorPopUp = () => {
    if (showPopUp === false) {
      setPopUp(true);
      console.log("Changed to true");
    }
    else{
      setPopUp(false);
      console.log("Changed to false");
    }
  };

  return (
    <Background>
      <div id="game-bang-bang" className="game-bang-bang">
        <Header timer={formatedTime()} />

        <div onClick={showErrorPopUp} className="target-image">
          <img src={targetImage} className="target-img" />
          <div className="wrong-local-container"  style={{ visibility: showPopUp ? 'visible' : 'hidden' }}>
            <div className="wrong-local-message">
                <p>Errrroooou!!!</p>
            </div>
          </div>
        </div>

        <div className="container-baloon">
          <div className="animation-balloon">
            <img src={balloon} className='balloon-img' onLoad={iAmReady}/>
            {/* <div onClick={showErrorPopUp} className="balloon-img" ref={balloonImg} onLoad={() => alert('carregou!')}>
              <p className='balloon-text'>
                {balloonText}
              </p>
            </div> */}
          </div>
        </div>

        <button
          className="button-bang"
          onClick={handleClick}
          style={{
            opacity: buttonStatus !== ButtonStatus.enabled? 0.3 : 1, 
            cursor: buttonStatus !== ButtonStatus.enabled? "default" : "pointer" 
          }}>
        </button>
      </div>
    </Background>
  );
}
