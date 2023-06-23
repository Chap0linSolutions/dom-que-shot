import { useRef, useState, useLayoutEffect } from 'react';
import { Status } from '../LinhaDoTempo';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import beer from '../../../assets/beer.png';
import gsap from 'gsap';
import {
  Content,
  Game,
  PhraseDiv,
  Banner,
  BannerBeer,
  Text,
  Phrase,
  Line,
  InputDiv,
  Input,
  GuidanceText,
  Decoration,
  Dot,
} from './Game.style';

interface GameProps {
  question: string;
  timeLeft: number;
  turnVisibility: boolean;
  sendGuess: (value) => void;
}

export default function GamePage({
  question,
  timeLeft,
  turnVisibility,
  sendGuess,
}: GameProps) {
  const bannerRef = useRef(null);
  const beerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const phrase = useRef(question).current;
  const [guess, setGuess] = useState<number | undefined>();
  const [playerGuessed, setPlayerGuessed] = useState<boolean>(false);

  const updateGuess = () => {
    setGuess(parseInt(inputRef.current.value));
  };

  const confirmChoice = () => {
    if (playerGuessed) return;
    if (guess) {
      sendGuess(guess);
    } else {
      sendGuess(Status.TIMESUP);
    }
    setPlayerGuessed(true);
  };

  const detectKeyDown = (e) => {
    if (e.key === 'Enter') {
      confirmChoice();
    }
  };

  if (timeLeft === 0) {
    confirmChoice();
  }

  useLayoutEffect(() => {
    let loop = null;
    let show = gsap.to(bannerRef.current, {
      scale: 0,
      y: 200,
      duration: 0,
    });

    if (playerGuessed) {
      loop = gsap.to(beerRef.current, {
        rotate: 360,
        duration: 5,
        ease: 'linear',
        repeat: -1,
      });

      show = gsap.to(bannerRef.current, {
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back',
      });
    }

    return () => {
      loop && loop.revert();
      show.revert();
    };
  }, [playerGuessed]);

  return (
    <Background noImage>
      <Header participants={turnVisibility} timer={timeLeft} />
      <Game>
        <Content>
          <PhraseDiv>
            <Phrase>
              <Line>EM QUE ANO...</Line>
              <Line>{phrase}</Line>
            </Phrase>
          </PhraseDiv>
          <InputDiv>
            <GuidanceText>Sua resposta:</GuidanceText>
            <Input
              autoComplete="off"
              disabled={playerGuessed}
              onKeyDown={detectKeyDown}
              onChange={updateGuess}
              type={'number'}
              ref={inputRef}
              placeholder="Digite sua resposta..."
            />
          </InputDiv>
          <Decoration>
            <Dot />
            <Dot />
            <Dot />
          </Decoration>
        </Content>

        {!playerGuessed && (
          <Button isDisabled={!guess} staysOnBottom onClick={confirmChoice}>
            Confirmar
          </Button>
        )}

        <Banner ref={bannerRef}>
          <BannerBeer ref={beerRef} src={beer} />
          <Text>
            {guess === Status.TIMESUP ? (
              <>Tempo esgotado!</>
            ) : (
              <>Resposta enviada!</>
            )}
            <br />
            Aguardando...
          </Text>
        </Banner>
      </Game>
    </Background>
  );
}
