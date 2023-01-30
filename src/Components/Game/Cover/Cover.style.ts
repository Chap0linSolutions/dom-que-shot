import styled from '@emotion/styled';

const smallScreen = innerHeight < 740;

const imgSize = smallScreen ? 240 : 280;
const titleSize = smallScreen ? 26 : 32;
const cardSize = smallScreen ? [264, 367] : [307, 426];
const cardMarginTop = smallScreen ? 1 : 2;

export const CoverDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;

export const CoverCard = styled.div`
  margin-top: ${cardMarginTop}em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${cardSize[0]}px;
  height: ${cardSize[1]}px;
  border-radius: 10px;
  z-index: 1;
`;

export const CoverImg = styled.img`
  width: ${imgSize}px;
  height: ${imgSize}px;
  object-fit: scale-down;
`;

export const CoverTitle = styled.p`
  font-family: 'Adumu';
  font-size: ${titleSize}px;
  font-weight: 700;
  color: white;
  margin: 12px;
`;

export const CoverButton = styled.div``;
