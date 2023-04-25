import styled from '@emotion/styled';

export const HeaderDiv = styled.div`
  font-family: 'Adumu';
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 107px;
  @media (max-height: 740px) {
    height: 85px;
  }
`;

export const ArrowAndTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const LeftSideItem = styled.div`
  width: 26px;
  height: 100%;
  margin-left: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const RightSideItem = styled(LeftSideItem)`
  margin-left: 0;
  margin-right: 1em;
`;

export const Title = styled.p`
  margin: 0;
  margin-left: 1em;
`;

export const ConfirmDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Confirm = styled.p`
  margin: 0;
  font-size: 17px;
  color: black;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const ConfirmButton = styled.div`
  margin-left: 10px;
  padding: 0 20px;
  height: 35px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-height: 740px) {
    font-size: 16px;
    padding: 0 17px;
    margin-left: 6px;
  }
`;

export const ConfirmYes = styled(ConfirmButton)`
  border: 1px solid #800080;
  color: #800080;
`;

export const ConfirmNo = styled(ConfirmButton)`
  color: white;
  background-color: #800080;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

export const RoomCodeDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
`;

export const RoomCode = styled.p`
  font-size: 16px;
  color: #524b6e;
  margin-right: 10px;
`;

export const Timer = styled.div`
  color: red;
  font-size: 20px;
  text-align: center;
  min-width: 120px;
  min-height: 40px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid white;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const SettingsInfoAndLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoDiv = styled.div`
  margin-right: 1em;
`;

export const SettingsDiv = styled.div`
  padding-right: 1em;
`;

export const LogoDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 103px;
  height: 107px;
  border-radius: 30px 0 0 40px;
  background: #403a55;
  @media (max-height: 740px) {
    width: 81px;
    height: 85px;
    border-radius: 24px 0 0 30px;
  }
  @media (min-width: 500px) {
    border-radius: 30px 20px 0 40px;
  }
  @media (min-width: 500px) and (max-height: 740px) {
    border-radius: 24px 20px 0 30px;
  }
`;

export const LogoBackground = styled.div`
  background-color: #170c32;
  width: 78px;
  height: 88px;
  border-radius: 28px;
  margin-right: 5px;
  margin-top: 5px;
  @media (max-height: 740px) {
    width: 61px;
    height: 69px;
    border-radius: 24px;
  }
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 28px;
  object-fit: scale-down;
  overflow: hidden;
`;

export const ListItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  border: 2px solid #666666;
  margin-bottom: 5px;
  border-radius: 20px;
`;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.p`
  margin: 0;
  margin-left: 5px;
  color: #666666;
  font-weight: 500;
  font-size: 18px;
  font-family: Roboto;
`;

export const AvatarDiv = styled.div`
  width: 35px;
  height: 35px;
`;

export const Kick = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  background-color: red;
  font-size: 15px;
  margin: 0;
  color: white;
  border-radius: 20px;
  cursor: pointer;
`;