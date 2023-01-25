import styled from "@emotion/styled";

const smallScreen = (window.innerHeight < 740);
const bannerHeight = (smallScreen)? 320 : 400;
const bannerPadding = (smallScreen)? 1.2 : 1.5;
const iconSize = (smallScreen)? 60 : 80;
const firstFontSize = (smallScreen)? 18 : 20;
const secondFontSize = (smallScreen)? 16 : 18;


export const BannerDiv = styled.div`
  width: 80%;
  height: ${bannerHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #8877df;
  padding: ${bannerPadding}em;
  text-justify: justify;
  border-radius: 16px;
`;

export const BannerIcon = styled.img`
  height: ${iconSize}px;
  object-fit: scale-down;
  margin-bottom: 10px;
`;

export const BannerTexts = styled.div``;

export const FirstText = styled.p`
  font-size: ${firstFontSize}px;
  font-family: 'Roboto';
  font-weight: 500;
  text-align: center;
`;

export const SecondText = styled.p`
  font-size: ${secondFontSize}px;
  font-weight: 300;
  text-align: center;
  color: rgba(255, 255, 255, 0.54);
`;