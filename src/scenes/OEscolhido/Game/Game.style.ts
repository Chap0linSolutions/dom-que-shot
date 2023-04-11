import styled from "@emotion/styled";

export const Game = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.p`
  margin: 10px;
  margin-top: 20px;
  font-size: 20px;
  @media(max-height: 740px){
    margin: 8px;
    margin-top: 16px;
    font-size: 18px;
  }
`;

export const PlayerList = styled.div`
  padding: 1em;
  width: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 107px - 2rem - 260px);
  ::-webkit-scrollbar {
    display: none;
  }
  @media(max-height: 740px){
    max-height: calc(100vh - 107px - 2rem - 230px);
  }
`;

export const PlayerItem = styled.div`
  border-radius: 10px;
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  @media(max-height: 740px){
    height: 44px;
    margin-bottom: 7px;
  }
`;

export const SelectedPlayer = styled(PlayerItem)`
  background: #403a55;
`;

export const UnselectedPlayer = styled(PlayerItem)`
  background: #8877df;
`;

export const Nickname = styled.p`
  margin: 0;
  padding: 0 1em;
  font-size: 16px;
  @media(max-height: 740px){
    font-size: 15px;
  }
`;

export const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  width: 48px;
  height: 48px;
  @media(max-height: 740px){
    width: 44px;
    height: 44px;
  }
`;

export const SelectedAvatar = styled(AvatarDiv)`
  border: 2px solid #403a55;
`;

export const UnselectedAvatar = styled(AvatarDiv)`
  border-left: 2px solid gold;
`;

