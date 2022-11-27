import React from 'react';
import logoGame from '../../../assets/BangBang/bangbang-logo.png';
import './Info.css';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Background from '../../../components/Background';

interface InfoProps {
  coverPage: () => void;
  gamePage: () => void;
}

export function InfoPage({ coverPage, gamePage }: InfoProps) {
  return (
    <div id="info-page">
      <Background>
        <Header logo={logoGame} goBackArrow={coverPage} title="Bang Bang" />

        <div className="content">
          <p>
            Neste jogo, cada participante vai jogar com o seu aparelho. <br />
            <br />
            Inciada a partida, todos os jogadores devem atirar no alvo dentro do
            tempo de 10 segundos.
            <br />
            <br />
            Quem atirar por último ou quem não atirar dentro do tempo, bebe uma
            dose.
          </p>

          <div className="button-container">
            <Button onClick={gamePage}>Iniciar</Button>
          </div>
        </div>
      </Background>
    </div>
  );
}