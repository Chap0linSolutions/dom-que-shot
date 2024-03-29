import styled from '@emotion/styled';

export const CoverDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
`;

export const CoverCard = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 326px;
  height: 407px;
  border-radius: 10px;
  z-index: 1;
  @media (max-height: 740px) {
    width: 284px;
    height: 367px;
    margin-top: 1em;
  }
`;

export const CoverImg = styled.img`
  width: 280px;
  object-fit: scale-down;
  @media (max-height: 740px) {
    width: 240px;
  }
`;

export const CoverTitle = styled.p`
  font-family: 'Adumu';
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 15px 5px;
  @media (max-height: 740px) {
    font-size: 26px;
  }
`;

export const CoverButton = styled.div``;
