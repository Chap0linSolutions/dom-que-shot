import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Map from '../components/Map';
import gsap from 'gsap';
import PlayerCards from '../components/PlayerCards';
import { Content, Finish, Title } from './Finish.style';

interface CoverProps {
  results: string;
  thisPlayerName: string;
  roulettePage: () => void;
}

export type Results = {
  nickname: string;
  avatarSeed: string;
  shipPlacement: number[];
  hits: number;
  hasAppeared: boolean | undefined;
};

enum FinishState {
  Showing,
  Done,
}

export default function FinishPage({
  results,
  roulettePage,
  thisPlayerName,
}: CoverProps) {
  const finalResults: Results[] = JSON.parse(results);

  const pageRef = useRef();
  const buttonRef = useRef();
  const [icebergPlaces, setIcebergPlaces] = useState<number[]>([]);
  const [titanicPlayers, setTitanicPlayers] = useState<Results[]>(() =>
    finalResults.filter((player) => player.shipPlacement.length < 5)
  );
  const [icebergPlayer, setIcebergPlayer] = useState<Results>(
    () => finalResults.filter((player) => player.shipPlacement.length === 5)[0]
  );
  const [finishState, setFinishState] = useState<FinishState>(
    FinishState.Showing
  );
  const [places, setPlaces] = useState<number[]>(() => {
    const initialValues = Array.apply(null, Array(25));
    return initialValues.map((x, i) => i);
  });

  const noOnePlayedInTime =
    finalResults.filter((p) => p.shipPlacement[0] === -100).length ===
    finalResults.length;

  const everybodyFell =
    finalResults.filter((p) => p.shipPlacement[0] === -1).length ===
    finalResults.length - 1;

  const whoPlayed = finalResults.filter((p) => p.shipPlacement.length > 1);

  const everyoneSurvived =
    whoPlayed.length > 1 &&
    whoPlayed.filter((p) => p.hits === 0).length === whoPlayed.length - 1;

  const noTitanicPlayed = whoPlayed.length === 1 && !everybodyFell;

  const icebergsHaveAppeared = icebergPlayer && icebergPlayer.hasAppeared;
  const mapType =
    noOnePlayedInTime && icebergsHaveAppeared ? 'no one played' : 'finish';

  let title = 'E o resultado é...';
  if (noOnePlayedInTime && icebergsHaveAppeared) {
    title = 'NINGUÉM jogou a tempo!';
  } else if (everybodyFell) {
    title = `Todo mundo caiu :'(`;
  } else if (noTitanicPlayed && icebergsHaveAppeared) {
    title = 'Os titanics comeram mosca!';
  } else if (everyoneSurvived && icebergsHaveAppeared) {
    if (icebergPlayer.shipPlacement[0] === -100) {
      title = `O iceberg comeu mosca!`;
    } else {
      title = `O iceberg errou tudo!`;
    }
  } else if (icebergsHaveAppeared) {
    title = 'Quem afundou bebe!';
  }

  useLayoutEffect(() => {
    if (pageRef && buttonRef) {
      gsap
        .timeline()
        .to(pageRef.current, {
          opacity: 0,
          duration: 0,
          ease: 'linear',
        })
        .to(buttonRef.current, {
          yPercent: 200,
          duration: 0,
          ease: 'back',
        })
        .to(pageRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'linear',
        });
    }
    showResults();
  }, []);

  useEffect(() => {
    if (finishState === FinishState.Done) {
      gsap.to(buttonRef.current, {
        yPercent: 0,
        duration: 1,
        ease: 'back',
      });
    }
  }, [finishState]);

  const showResults = () => {
    let i = 0;
    titanicPlayers.forEach((player) => {
      setTimeout(() => {
        setPlaces((previous) =>
          previous.map((p, index) => {
            if (player.shipPlacement.includes(index)) {
              return p + 100;
            }
            return p;
          })
        );
        setTitanicPlayers((previous) =>
          previous.map((p) => {
            return {
              ...p,
              hasAppeared:
                p.nickname === player.nickname ? true : p.hasAppeared,
            };
          })
        );
      }, (i + 1) * 1000);
      i++;
    });
    setTimeout(() => {
      setIcebergPlaces(icebergPlayer.shipPlacement);
      setIcebergPlayer((previous) => {
        return { ...previous, hasAppeared: true };
      });
      setFinishState(FinishState.Done);
    }, (i + 1) * 1000);
  };

  const button =
    icebergPlayer && icebergPlayer.nickname === thisPlayerName ? (
      <Button staysOnBottom onClick={roulettePage}>
        Continuar
      </Button>
    ) : null;

  return (
    <Background>
      <Header logo />
      <Finish ref={pageRef}>
        <Content>
          <Title>{title}</Title>
          <Map type={mapType} places={places} icebergPlaces={icebergPlaces} />
          <PlayerCards
            titanicPlayers={titanicPlayers}
            icebergPlayer={icebergPlayer}
          />
        </Content>
        <div ref={buttonRef}>{button}</div>
      </Finish>
    </Background>
  );
}
