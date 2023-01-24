import React from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  width?: string;
  height?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export default function Button({
  width,
  height,
  onClick,
  children,
  isDisabled = false,
}: ButtonProps) {
  const buttonStyle = {
    width: width ? width : undefined,
    height: height ? height : undefined,
  };

  return (
    <RegularButton onClick={onClick} style={buttonStyle} disabled={isDisabled}>
      {children}
    </RegularButton>
  );
}

const smallScreen = window.innerHeight < 740;
const fontSize = smallScreen ? 18 : 20;
const buttonSize = smallScreen ? [210, 50] : [240, 56];

const RegularButton = styled.button`
  color: white;
  width: ${buttonSize[0]}px;
  height: ${buttonSize[1]}px;
  background: linear-gradient(180deg, #642e85 0%, rgba(255, 255, 255, 0) 100%);
  background-color: purple;
  border-radius: 10px;
  border: none;
  padding: 0;
  font-size: ${fontSize}px;
  font-family: 'Roboto';
  :disabled {
    color: gray;
    background: linear-gradient(
      180deg,
      #3d2d47 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background-color: rgb(85, 1, 85);
    pointer-events: none;
  }
`;
