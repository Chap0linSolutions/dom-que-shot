import styled from '@emotion/styled';

export const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const DrawingCanvas = styled.canvas`
  background-color: white;
  border-radius: 10px 0 10px 10px;
  flex-grow: 0;
`;

export const UnderBar = styled.div``;

export const GuessTitle = styled.p`
  width: 256px;
  height: 48px;
  background: #403a55;
  border-radius: 10px;
  margin: 0;
  margin-bottom: 24px;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 740px) {
    font-size: 16px;
    height: 44px;
    width: 230px;
  }
`;

export const GuessesAndCanvas = styled.div`
  display: flex;
  justify-content: center;
`;

export const GuessesDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GuessesTitle = styled.div`
  width: 100%;
  height: 35px;
  border-radius: 0 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #282436;
  color: white;
  font-size: 16px;
  font-family: Adumu;
  @media(max-height: 740px){
    font-size: 14px;
  }
`;

export const Guesses = styled.div`
  width: 100%;
  height: 80%;
  background: #403a55;
  border-radius: 0 0 10px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Guess = styled.p`
  margin: 0;
  font-family: Roboto;
  color: white;
  font-size: 16px;
  @media(max-height: 740px){
    font-size: 14px;
  }
`;

export const GuessInputDiv = styled.div`
  width: 100%;
  margin: 0;
  padding: 24px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: space-between;
`;

export const GuessInput = styled.input`
  font-size: 16px;
  color: black;
  padding-left: 4px;
  margin-right: 5px;
  width: 100%;
  height: 40px;
  background: #d9d9d9;
  border-radius: 0px 10px 10px 0px;
`;
