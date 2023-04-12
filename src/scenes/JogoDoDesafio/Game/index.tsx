import React, { useState, useEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import AwaitingBanner from '../../../components/AwaitingBanner';
import beer from '../../../assets/beer.png';

import {
  GameContainer,
  Title,
  SuggestionsDiv,
  SuggestionItem,
  ExclamationIcon,
  SuggestionItemText,
  AnotherSuggestion,
  AwaitingDiv,
  VoteButton,
} from './Game.style';

interface GameProps {
  suggestions: string[];
  finishDrinking: () => void;
  showSuggestions: () => void;
  nextGame: () => void;
  show: boolean;
  coverImg: string;
  turnVisibility: boolean;
}

export default function GamePage({
  suggestions,
  finishDrinking,
  showSuggestions,
  nextGame,
  show,
  coverImg,
  turnVisibility,
}: GameProps) {
  const [countdown, setCountdown] = useState(3);

  const startCounting = () => {
    setInterval(() => {
      setCountdown((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
  };

  useEffect(() => {
    if (show) {
      startCounting();
    }
  }, [show]);

  if (turnVisibility === true) {
    return (
      <Background>
        <Header logo={coverImg} />
        <GameContainer>
          <Title>Realize um dos desafios:</Title>
          <SuggestionsDiv>
            {suggestions.map((suggestion, i) => (
              <SuggestionItem key={i}>
                <ExclamationIcon>!</ExclamationIcon>
                <SuggestionItemText>{suggestion}</SuggestionItemText>
              </SuggestionItem>
            ))}
          </SuggestionsDiv>

          <AnotherSuggestion>Ou beba duas doses!!!</AnotherSuggestion>
          <VoteButton>
            {show ? (
              <>
                <Button onClick={nextGame} isDisabled={countdown > 0}>
                  {countdown > 0 ? `Avançar em ${countdown}` : 'Próximo Jogo'}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={finishDrinking}>IHHH, bebi!</Button>
                <Button onClick={showSuggestions}>
                  Realizar e revelar a carta
                </Button>
              </>
            )}
          </VoteButton>
        </GameContainer>
      </Background>
    );
  }

  return (
    <Background>
      <Header logo={coverImg} />
      {show ? (
        <GameContainer>
          <Title>Estes eram os desafios:</Title>
          <SuggestionsDiv>
            {suggestions.map((suggestion, i) => (
              <SuggestionItem key={i}>
                <ExclamationIcon>!</ExclamationIcon>
                <SuggestionItemText>{suggestion}</SuggestionItemText>
              </SuggestionItem>
            ))}
          </SuggestionsDiv>
          <AnotherSuggestion>
            {countdown > 0
              ? `Aguardando... ${countdown}`
              : 'Esperando o jogador da vez continuar.'}
          </AnotherSuggestion>
        </GameContainer>
      ) : (
        <GameContainer>
          <AwaitingDiv>
            <AwaitingBanner
              icon={beer}
              firstText={`Aguardando o jogador da vez escolher algum desafio
                para realizar...`}
              secondText={'Gato persa ou gato parça?'}
            />
          </AwaitingDiv>
        </GameContainer>
      )}
    </Background>
  );
}
