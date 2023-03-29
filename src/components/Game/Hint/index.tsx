import React from 'react';
import Background from '../../Background';
import Header from '../../Header';
import Button from '../../Button';
import { HintPageDiv, HintPageDescription } from './Hint.style';

interface HintProps {
  coverImg: string;
  title: string;
  coverPage: () => void;
  gamePage: () => void;
  description: JSX.Element | string;
}

export default function HintPage({
  title,
  coverImg,
  coverPage,
  gamePage,
  description,
}: HintProps) {
  return (
    <Background>
      <Header roomCode logo={coverImg} goBackArrow={coverPage} title={title} />
      <HintPageDiv>
        <HintPageDescription>{description}</HintPageDescription>
        <Button staysOnBottom onClick={gamePage}>
          Finalizar
        </Button>
      </HintPageDiv>
    </Background>
  );
}
