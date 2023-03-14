import React from 'react';
import { LogOut } from 'react-feather';
import { FooterDiv, LeaveDiv } from './Footer.style';

interface FooterProps {
  button?: JSX.Element;
  exit?: boolean;
}

export default function Footer({ button, exit }: FooterProps) {
  return (
    <FooterDiv>
      {exit && <LeaveDiv>&nbsp;</LeaveDiv>}

      {button}

      {exit && (
        <LeaveDiv>
          <LogOut color="white" width={24} height={24} />
        </LeaveDiv>
      )}
    </FooterDiv>
  );
}
