import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import glassIcon from '../../../assets/glass-icon-yellow-background.png';
import './Game.css';

interface GameProps {
  suggestions: string[];
  finishPage: () => void;
  coverImg: string;
  turnVisibility: boolean;
}

export default function GamePage({
  suggestions,
  finishPage,
  coverImg,
  turnVisibility,
}: GameProps) {
  if (turnVisibility === true) {
    return (
      <Background>
        <Header logo={coverImg} />
        <div className="EuNuncaDiv">
          <div className="EuNuncaTitleAndSuggestions">
            <p className="EuNuncaGameTitle">
              Crie uma afirmação iniciada com "EU NUNCA..."
            </p>
            <div className="EuNuncaSuggestionsDiv">
              <p className="EuNuncaSuggestionsTitle">
                Ou, se preferir, use uma de nossas sugestões:
              </p>
              {suggestions.map((suggestion) => (
                <div className="EuNuncaSuggestion" key={suggestion}>
                  <img className="EuNuncaSuggestionIcon" src={glassIcon} />
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
          <Button margin="0 auto 40px auto" onClick={finishPage}>Continuar</Button>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <Header logo={coverImg} />
      <div className="EuNuncaDiv">
        <div className="EuNuncaSuggestionsDiv EuNuncaAwaitingDiv">
          <img className="EuNuncaAwaitingIcon" src={glassIcon} />
          <div className="EuNuncaAwaitingTitle">
            <p>
              Aguardando o jogador da vez falar uma frase começada por "EU
              NUNCA"...
            </p>
            Se ele demorar a falar, pode dar um pescotapa. Eu deixo.
          </div>
        </div>
      </div>
    </Background>
  );
}
