import { useEffect, useRef, useState } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import titanic from '../assets/ship.png';
import iceberg from '../assets/iceberg.png';
import Map from '../components/Map';
import beer from '../../../assets/beer.png';
import gsap from 'gsap';
import { OverflowHandler, Titanic, Title, Subtitle, RemainingElements, RemainingIcon, Content, End, Text, BeerIcon } from './Game.style';

interface GameProps {
  sendResults: (value: string) => void;
  finishPage: () => void;
  receiveResults: string | undefined;
  isCurrentTurn: boolean;
  msTimeLeft: number;
}

enum animationState {
  Start,
  Change,
  End,
}

export default function GamePage({
  sendResults,
  receiveResults,
  finishPage,
  isCurrentTurn,
  msTimeLeft,
}: GameProps) {

  const maxElements = (isCurrentTurn)? 5: 3;

  const [places, setPlaces] = useState<number[]>([]);
  const [animation, setAnimation] = useState<animationState>(animationState.Start);
  
  const selected = places.filter(place => place >= 100).length;
  const remainingElements = (isCurrentTurn)
  ? maxElements - selected
  : maxElements - selected; 

  const title = (isCurrentTurn)
  ? 'Escolha onde vão os Icebergs!'
  : 'Escolha onde vão seus barcos!';

  const icon = (isCurrentTurn)
  ? iceberg
  : titanic; 

  const pageRef = useRef();
  const beerIcon = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const initialValues:number[] = [];
    for(let i = 0; i < 25; i++){
      initialValues.push(i);
    }
    setPlaces(initialValues);
  }, []);

  useEffect(() => {
    gsap.to(beerIcon.current, {
      rotate: -360,
      duration: 5,
      ease: 'linear',
      repeat: -1,
    });
  });

  const sendSelection = () => {
    const selection = places.filter(p => p >= 100);
    sendResults(JSON.stringify(selection));
    setAnimation(animationState.Change);
  }

  const toggleSelection = (number) => {
    if(animation !== animationState.End){
      setPlaces(places.map((p, index) => {
        if(index === number){
          if (p >= 100){
            return p - 100;
          } else if(remainingElements > 0){
            return p + 100;
          }
        } return p;
      }));
    }
  }

  useEffect(() => {
    if(animation === animationState.Change){
      gsap.timeline()
      .to(buttonRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'linear',
      }).to(buttonRef.current, {
        opacity: 1,
        yPercent: 200,
        duration: 0,
        scale: 1,
        ease: 'linear',
      }).call(() => setAnimation(animationState.End));
    } else if(animation === animationState.End){
      gsap.to(buttonRef.current, {
        yPercent: 0,
        duration: 0.5,
        ease: 'back',
      });
    }
  }, [animation])

  const currentTurnEndStyle = {
    background: '#358fb0',
  }

  const awaitingText = (receiveResults === `time's up`)
  ? <>Tempo Esgotado!<br/>Aguardando resultados...</>
  : <>Aguardando os<br/> demais jogadores...</>;

  useEffect(() => {
    if(receiveResults === `time's up`){
     setAnimation(animationState.Change);
    } else if(typeof receiveResults === 'string'){
      gsap.to(buttonRef.current, {
        opacity: 0,
        yPercent: 200,
        duration: 0.25,
      });
      gsap.timeline()
      .to(pageRef.current, {
        xPercent: 10,
        duration: 0.5,
        ease: 'power2',
      })
      .to(pageRef.current, {
        xPercent: -100,
        duration: 0.5,
        delay: 0.1,
        ease: 'power2',
      }).call(finishPage);
    }
  }, [receiveResults]);

  let button = (animation !== animationState.End)
  ? <Button 
    staysOnBottom
    isDisabled={remainingElements > 0}
    onClick={sendSelection}>
      Finalizar
    </Button>
  : <End style={(isCurrentTurn)? currentTurnEndStyle : null}>
      <BeerIcon src={beer} ref={beerIcon}/>
      <Text>
        {awaitingText}
      </Text>
    </End>;

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
        <OverflowHandler>
          <Titanic ref={pageRef}>
            <Content>
              <Title>
                {title}
              </Title>
                <Map
                  type='game' 
                  isCurrentTurn={isCurrentTurn}
                  places={places}
                  toggleSelection={toggleSelection}
                />
              <RemainingElements>
                <Subtitle>
                  Restantes: {remainingElements}
                </Subtitle>
                <RemainingIcon src={icon}/>
              </RemainingElements>
            </Content>
            <div ref={buttonRef}>
              {button}
            </div>
          </Titanic>
        </OverflowHandler>
    </Background>
  );
}
