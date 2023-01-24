import React from 'react';
import { RouletteDiv, UpperDetail, LowerDetail, Center } from './styles';

interface RouletteProps {
  width?: number;
  height?: number;
  children: React.ReactNode | React.ReactNode[];
}

export default function Roulette({ width, height, children }: RouletteProps) {
  const bodyStyle = {
    width: width ? width : undefined,
    height: height ? height : undefined,
  };

  const detailStyle = {
    width: width ? Math.round(0.87 * width) : undefined,
  };

  return (
    <RouletteDiv>
      <UpperDetail style={detailStyle} />
      <Center style={bodyStyle}>{children}</Center>
      <LowerDetail style={detailStyle} />
    </RouletteDiv>
  );
}
