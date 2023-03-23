import styled from '@emotion/styled';

export const GameDiv = styled.div`
  background-color: aqua;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const DrawingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const WordDiv = styled.div`
  width: 256px;
  height: 48px;
  padding-top: 16px;

  background: #403A55;
  border-radius: 10px 10px 0px 0px;

  font-family: Roboto;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
`

export const DrawingCanvas = styled.canvas`
  background-color: white;
  border: 5px solid #142850;
  border-radius: 10px;
`

export const UnderBar = styled.div`

`

export const GuessTitle = styled.div`
  width: 256px;
  height: 48px;
  padding: 12px 0px;

  background: #403A55;
  border-radius: 10px;

  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
`

export const GuessingDiv = styled.div`
  background-color: red;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const GuessesDiv = styled.div`
  width: 98px;
  height: 264px;

  background: #403A55;
  border-radius: 10px 0px 0px 10px;
`

export const GuessInputDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: space-between;
`

export const GuessInput = styled.input`
  width: 230px;
  height: 40px;

  background: #D9D9D9;
  border-radius: 0px 10px 10px 0px;
`