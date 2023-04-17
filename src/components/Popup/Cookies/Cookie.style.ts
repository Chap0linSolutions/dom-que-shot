import styled from '@emotion/styled';

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  color: black;
  font-family: Roboto;
  font-size: 16px;
  margin: 0;
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: space-evenly;
  justify-content: space-between;
`;

export const Button = styled.div`
  font-size: 15px;
  font-family: Roboto;
  min-width: 100px;
  padding: 0 20px;
  height: 35px;
  color: rgba(255, 255, 255, 0.9);
  background: #800080;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-height: 740px) {
    min-width: 80px;
    font-size: 14px;
    padding: 0 10px;
  }
`;

export const ButtonTwo = styled(Button)`
  color: #800080;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #800080;
`;

export const ButtonThree = styled(Button)`
  margin: 5px;
  padding: 20px 10px;
  @media (max-height: 740px) {
    font-size: 15px;
    padding: 15px 10px;
  }
`;
