import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Map from '../components/Map';
import gsap from 'gsap';
import PlayerCards from '../components/PlayerCards';
import { Content, Finish, Title, Text } from './Finish.style';

interface CoverProps {
  results: string;
  turnVisibility: boolean;
  roulettePage: () => void;
}

export type Results = {
  nickname: string,
  avatarSeed: string,
  shipPlacement: number[],
  hits: number,
  hasAppeared: boolean | undefined;
}

enum FinishState {
  Showing,
  Done,
}

export default function FinishPage({
  results,
  roulettePage,
  turnVisibility,
}: CoverProps) {

  const pageRef = useRef();  
  const buttonRef = useRef();
  const [places, setPlaces] = useState<number[]>([]);
  const [icebergPlaces, setIcebergPlaces] = useState<number[]>([]);
  const [titanicPlayers, setTitanicPlayers] = useState<Results[]>([]);
  const [icebergPlayer, setIcebergPlayer] = useState<Results>();
  const [finishState, setFinishState] = useState<FinishState>(FinishState.Showing);
  const finalResults:Results[] = JSON.parse(results);
  
  useLayoutEffect(() => {
    gsap.timeline().
    to(pageRef.current, {
      opacity: 0,
      duration: 0,
      ease: 'linear',
    }).to(buttonRef.current, {
      yPercent: 200,
      duration: 0,
      ease: 'back',
    }).to(pageRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'linear',
    })

    const initialValues:number[] = [];
    for(let i = 0; i < 25; i++){
      initialValues.push(i);
    }
    setPlaces(initialValues);
    setTitanicPlayers(finalResults.filter(player => player.shipPlacement.length < 5));
    setIcebergPlayer(finalResults.filter(player => player.shipPlacement.length === 5)[0]);
  }, []);

  useEffect(() => {
    const hasBeenInitialized = (places.filter(p => p >= 100).length === 0);
    if(places.length > 0 && hasBeenInitialized){
      showResults();
    }
  }, [places]);

  useEffect(() => {
    if(finishState === FinishState.Done){
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
        setPlaces(previous => previous.map((p, index) => {
          if(player.shipPlacement.includes(index)){
            return p + 100;
          } return p;
        }));
        setTitanicPlayers(previous => previous.map((p) => {
          return {
            ...p,
            hasAppeared: (p.nickname === player.nickname)? true : p.hasAppeared,
          }
        }));
      }, (i + 1)*1000);
      i++;
    })
    setTimeout(() => {
      setIcebergPlaces(icebergPlayer.shipPlacement);
      setIcebergPlayer(previous => {return {...previous, hasAppeared: true}});
      setFinishState(FinishState.Done);
    }, (i + 1)*1000);
  }

  const button = (turnVisibility)
  ? <Button staysOnBottom onClick={roulettePage}>Continuar</Button>
  : null;

  return (
    <Background>
      <Header logo/>
      <Finish ref={pageRef}>
        <Content>
        <Title>Os atingidos bebem!</Title>
          <Map
            type='finish'
            places={places}
            icebergPlaces={icebergPlaces}
          />
          <PlayerCards
            titanicPlayers={titanicPlayers}
            icebergPlayer={icebergPlayer}
          /> 
        </Content>
        <div ref={buttonRef}>
          {button}
        </div>
      </Finish>
    </Background>
  );  
}
