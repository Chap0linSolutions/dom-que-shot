import React from 'react';
import Background from '../../Background';
import Header from '../../Header';
import styled from '@emotion/styled';
import BottomButton from '../../Button/BottomButton';

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
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <HintPageDiv>
        <HintPageDescription>{description}</HintPageDescription>
        <BottomButton onClick={gamePage}>Finalizar</BottomButton>
      </HintPageDiv>
    </Background>
  );
}

const HintPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;

const HintPageDescription = styled.p`
  margin: 20px 0;
  padding: 0 40px;
  font-weight: 500;
  font-size: 20px;
  max-height: 600px;
  text-align: justify;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;