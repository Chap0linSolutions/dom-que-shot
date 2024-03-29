import React from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  width?: string;
  height?: string;
  staysOnBottom?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  color?: string;
  children: React.ReactNode | React.ReactNode[];
  borderRadius?: string;
}

export default function Button({
  width,
  height,
  staysOnBottom,
  onClick,
  children,
  isDisabled = false,
  color,
  borderRadius,
}: ButtonProps) {
  const buttonStyle = {
    width: width ? width : undefined,
    height: height ? height : undefined,
    background: color ? color : undefined,
    margin: staysOnBottom ? '0 auto 40px auto' : undefined,
    borderRadius: borderRadius ? borderRadius : undefined,
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
