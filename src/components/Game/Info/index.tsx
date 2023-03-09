import React from 'react';
import Background from '../../Background';
import Header from '../../Header';
import Button from '../../Button';
import './Info.css';

interface InfoProps {
  coverImg: string;
  title: string;
  coverPage: () => void;
  gamePage?: () => void;
  description: JSX.Element | string;
  turnVisibility?: boolean;
}

export default function InfoPage({
  title,
  coverImg,
  coverPage,
  gamePage,
  description,
  turnVisibility,
}: InfoProps) {
  const buttonAction = gamePage ? gamePage : coverPage;
  const buttonText = gamePage ? 'Iniciar jogo' : 'Voltar';

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="InfoPageDiv">
        <p className="InfoPageDescription">{description}</p>
        <div
          style={
            turnVisibility
              ? turnVisibility === true
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
              : {}
          }>
          <Button onClick={buttonAction}>{buttonText}</Button>
        </div>
      </div>
    </Background>
  );
}
