import styled from '@emotion/styled';

export const CardSection = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 10px 0 20px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-height: 740px) {
    max-width: 280px;
  }
`;

export const TitanicPlayers = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
