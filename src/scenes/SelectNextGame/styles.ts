import styled from '@emotion/styled';

export const ContentDiv = styled.div``;
export const ButtonDiv = styled.div``;

export const SelectGameDiv = styled.div`
  margin-top: 1.6em;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-height: 740px){
    margin-top: 1.2em;
  }
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
  margin: 20px;
  width: 40px;
  height: 40px;
  @media (max-height: 740px) {
    width: 30px;
    height: 30px;
    margin: 10px;
  }
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
  font-size: 25px;
  font-weight: 700;
  margin: 25px 0 40px 0;
  text-align: center;
  @media (max-height: 740px){
    font-size: 20px;
    font-weight: 500;
    margin-top: 20px;
  }
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
  font-size: 20px;
  font-family: 'Roboto';
  font-weight: 400;
  letter-spacing: 0em;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;
