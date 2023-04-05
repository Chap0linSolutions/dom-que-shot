import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import { Inner, Content } from './Details.style';

interface DetailsProps {
  goBack: () => void;
  children: string | JSX.Element;
  title?: string;
}

export default function Details({ goBack, children, title }: DetailsProps) {
  return (
    <Background noImage>
      <Header title={title ? title : ''} goBackArrow={goBack} />
      <Content>
        <Inner>{children}</Inner>
      </Content>
    </Background>
  );
}
