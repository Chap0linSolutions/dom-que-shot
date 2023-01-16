import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import AwaitingBanner from '../../../components/AwaitingBanner';
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
          <div className="GameVoteButtonEuNunca">
            <Button onClick={finishPage}>Continuar</Button>
          </div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <Header logo={coverImg} />
      <div className='WhoDrankContainer' style={{marginTop: '3em'}}>
        <AwaitingBanner
            icon={glassIcon}
            firstText={`Aguardando o jogador da vez falar uma frase começada por "EU NUNCA"...`}
            secondText={"Se ele demorar a falar, pode dar um pescotapa. Eu deixo."}
            background="#403a55"
            border={"3px solid #f9c95c"}
        />
      </div>
    </Background>
  );
}
