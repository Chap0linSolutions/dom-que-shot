import styled from '@emotion/styled';

export const OverflowHandler = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Titanic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Content = styled(Titanic)`
  justify-content: flex-start;
`;

export const Title = styled.p`
  font-size: 22px;
  font-family: Adumu;
  @media (max-height: 740px) {
    font-size: 20px;
  }
`;

export const Subtitle = styled.p`
  margin: 0 10px;
  font-size: 18px;
  font-family: Adumu;
  @media (max-height: 740px) {
    font-size: 17px;
  }
`;

export const RemainingElements = styled(Titanic)`
  flex-direction: row;
  justify-content: flex-end;
  height: auto;
  padding: 10px 40px;
`;

export const RemainingIcon = styled.img`
  object-fit: scale-down;
  width: 40px;
`;

export const End = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  margin-bottom: 40px;
  background: #ef4f59;
  padding: 14px 20px;
  border-radius: 20px;
  @media (max-height: 740px) {
    padding: 10px 20px;
  }
`;

export const Text = styled.p`
  margin: 0;
  margin-left: 14px;
  font-size: 18px;
  @media (max-height: 740px) {
    font-size: 14px;
  }
`;

export const BeerIcon = styled(RemainingIcon)`
  width: 30px;
`;
