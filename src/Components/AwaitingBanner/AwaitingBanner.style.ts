import styled from '@emotion/styled';

export const BannerDiv = styled.div`
  width: 80%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #8877df;
  padding: 1.5em;
  text-justify: justify;
  border-radius: 16px;
  @media (max-height: 740px) {
    height: 320px;
    padding: 1.2em;
  }
`;

export const BannerIcon = styled.img`
  height: 80px;
  object-fit: scale-down;
  margin-bottom: 10px;
  @media (max-height: 740px) {
    height: 60px;
  }
`;

export const BannerTexts = styled.div``;

export const FirstText = styled.p`
  font-size: 20px;
  font-family: 'Roboto';
  font-weight: 500;
  text-align: center;
  @media (max-height: 740px) {
    font-size: 18px;
  }
`;

export const SecondText = styled.p`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  color: rgba(255, 255, 255, 0.54);
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;
