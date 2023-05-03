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

export const Title = styled.p`
  border-radius: 10px;
  width: 300px;
  margin: 0;
  padding: 10px 30px;
  font-family: Adumu;
  font-size: 18px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 740px) {
    font-size: 16px;
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
  @media (max-height: 740px) {
    font-size: 14px;
  }
`;

export const Guesses = styled.div`
  width: 100%;
  height: 85%;
  border-radius: 0 0 10px;
  background: #403a55;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ::webkit-scrollbar {
    display: none;
  }
`;

export const Guess = styled.p`
  margin: 0;
  font-family: Roboto;
  color: white;
  font-size: 16px;
  @media (max-height: 740px) {
    font-size: 14px;
  }
`;

export const RightGuess = styled(Guess)`
  font-weight: 600;
  color: lime;
`;

export const Timer = styled.p`
  margin: 0;
  margin-left: 5px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 5px);
  height: calc(12% - 5px);
  background: rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const GuessInputDiv = styled.div`
  width: 100%;
  margin: 0;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: space-between;
`;

export const GuessInput = styled.input`
  color: black;
  background-color: white;
  border-radius: 10px 0 0 10px;
  font-weight: 400;
  border: none;
  height: 50px;
  text-align: center;
  font-size: 20px;
`;

export const Banner = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 14px 20px;
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
