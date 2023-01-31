import React from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  width?: string;
  height?: string;
  margin?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export default function Button({
  width,
  height,
  margin,
  onClick,
  children,
  isDisabled = false,
}: ButtonProps) {
  const buttonStyle = {
    width: width ? width : undefined,
    height: height ? height : undefined,
    margin: margin ? margin : undefined,
  };

  return (
    <RegularButton onClick={onClick} style={buttonStyle} disabled={isDisabled}>
      {children}
    </RegularButton>
  );
}

const RegularButton = styled.button`
  color: white;
  width: 240px;
  height: 56px;
  background: linear-gradient(180deg, #642e85 0%, rgba(255, 255, 255, 0) 100%);
  background-color: purple;
  border-radius: 10px;
  border: none;
  padding: 0;
  font-size: 20px;
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
  @media (max-height: 740px) {
    width: 210px;
    height: 50px;
    font-size: 18px;
  }
`;