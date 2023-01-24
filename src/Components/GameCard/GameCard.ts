import styled from '@emotion/styled';

const smallScreen = window.innerHeight < 720;
const fontSize = smallScreen ? 17 : 20;

export const CardBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  padding: 1em 0;
`;

export const CardImage = styled.img`
  width: 90%;
  object-fit: scale-down;
`;

export const CardTitle = styled.p`
  font-family: 'Adumu';
  font-size: ${fontSize}px;
  margin: 10px 0;
  color: white;
`;
