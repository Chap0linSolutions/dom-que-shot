import styled from '@emotion/styled';

export const Title = styled.p`
  padding: 0 50px;
  margin: 20px 0;
  text-align: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  @media (max-height: 740px) {
    padding: 0 25px;
    margin: 10px 0;
    font-size: 18px;
  }
`;

export const WordDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
`;

export const Words = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Awaiting = styled(Words)`
  flex-wrap: nowrap;
  margin-top: 3em;
  justify-content: center;
`;

export const Word = styled.div`
  margin: 8px;
  width: 160px;
  height: 100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #403a55;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media (max-height: 740px) {
    width: 144px;
    height: 80px;
  }
`;

export const WordName = styled.p`
  text-align: center;
  font-size: 18px;
  font-family: 'Roboto';
  font-weight: 500;
  margin: 0;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const DrawingIconDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const DrawingIcon = styled.img`
  width: 240px;
  object-fit: conatin;
`;
