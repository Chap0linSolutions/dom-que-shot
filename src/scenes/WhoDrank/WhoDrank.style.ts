import styled from '@emotion/styled';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.p`
  font-family: Adumu;
  font-size: 24px;
`;

export const Subtitle = styled.p`
  margin: 0;
`;

export const PlayerList = styled.div`
  padding: 1em;
  width: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ListItem = styled.div`
  height: 48px;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Nickname = styled.p`
  margin: 0;
  padding: 0 1em;
`;

export const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  @media (max-height: 740px) {
    width: 44px;
    height: 44px;
  }
`;
