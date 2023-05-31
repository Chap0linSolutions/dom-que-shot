import styled from '@emotion/styled';

export const LobbySettings = styled.div`
  padding: 36px;
  padding-top: 0;
  width: 100%;
  height: 100%;
  @media (max-height: 740px) {
    padding: 30px;
    padding-top: 0;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  margin-top: 20px;
  padding: 0;
  color: rgba(255, 255, 255, 0.6);
  @media (max-height: 740px) {
    font-size: 18px;
  }
`;

export const Card = styled.div`
  width: 48%;
  margin: 8px 0;
`;

export const Cards = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SelectionText = styled.div`
  padding: 0;
  display: flex;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  @media (max-height: 740px) {
    font-size: 15px;
  }
`;

export const WarningDiv = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const WarningText = styled.p`
  color: red;
  font-weight: 500;
  margin: 0;
  margin-left: 4px;
  font-size: 17px;
  @media (max-height: 740px) {
    font-size: 15px;
  }
`;
