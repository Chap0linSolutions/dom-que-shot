import styled from '@emotion/styled';

const smallScreen = window.innerHeight < 720;
const gameDivMargin = smallScreen ? 1.2 : 1.6;
const rouletteIconMargin = smallScreen ? 20 : 10;
const rouletteIconSize = smallScreen ? 30 : 40;
const nextGameFontSize = smallScreen ? 20 : 25;
const nextGameFontWeight = smallScreen ? 500 : 700;
const nextGameMargin = smallScreen ? '20px 0 40px 0' : '25px 0 40px 0';
const waitingMessageFontSize = smallScreen ? 16 : 20;

export const ContentDiv = styled.div``;
export const ButtonDiv = styled.div``;

export const SelectGameDiv = styled.div`
  margin-top: ${gameDivMargin}em;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const RouletteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SideIconSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${rouletteIconMargin}px;
  width: ${rouletteIconSize}px;
  height: ${rouletteIconSize}px;
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #170c32;
  border-radius: 10px;
  margin-top: 2px;
`;

export const SideIcon = styled.img`
  width: 40px;
  height: 44px;
  object-fit: scale-down;
`;

export const NextGameName = styled.p`
  opacity: 0;
  font-size: ${nextGameFontSize}px;
  font-weight: ${nextGameFontWeight};
  margin: ${nextGameMargin};
  text-align: center;
`;

export const WaitingMessageDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 5%;
`;

export const WaitingMessage = styled.p`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-size: ${waitingMessageFontSize};
  font-family: 'Roboto';
  font-weight: 400;
  letter-spacing: 0em;
`;
