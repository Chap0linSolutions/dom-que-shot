import styled from '@emotion/styled';

export const Game = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PhraseDiv = styled.div`
  background: #302b40;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transform: rotate(5deg);
  @media (max-height: 740px) {
    padding: 14px 0;
  }
`;

export const Phrase = styled.div`
  height: 240px;
  margin: 0;
  padding: 20px;
  width: 360px;
  background: #403a55;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transform: rotate(-5deg);
  @media (max-height: 740px) {
    padding: 18px;
    width: 300px;
    height: 206px;
  }
`;

export const Line = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  font-family: Roboto;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  @media (max-height: 740px) {
    font-size: 21px;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const GuidanceText = styled.p`
  font-size: 18px;
  margin: 10px 0 5px;
  color: #aaaaaa;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  color: black;
  background-color: white;
  border-radius: 10px;
  font-weight: 400;
  border: none;
  height: 50px;
  text-align: center;
  font-size: 20px;
  width: 100%;
  -moz-appearance: textfield;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-height: 740px) {
    height: 45px;
    font-size: 18px;
  }
`;

export const Decoration = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const Dot = styled.div`
  flex-shrink: 0;
  width: 13px;
  height: 13px;
  margin: 5px;
  margin-top: 10px;
  background-color: #aaaaaa;
  border-radius: 50%;
  @media (max-height: 740px) {
    width: 11px;
    height: 11px;
  }
`;

export const Banner = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 15px 30px;
  border-radius: 20px;
  background: #800080;
  background-size: 300% 100%;
  @media (max-height: 740px) {
    padding: 10px 20px;
  }
`;

export const BannerBeer = styled.img`
  width: 30px;
  object-fit: scale-down;
`;

export const Text = styled.p`
  margin: 0;
  margin-left: 14px;
  font-size: 16px;
  @media (max-height: 740px) {
    font-size: 14px;
  }
`;
