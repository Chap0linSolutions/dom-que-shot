import styled from "@emotion/styled";

export const HeaderDiv = styled.div`
  font-family: 'Adumu';
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 107px;
  @media (max-height: 740px) {
    height: 85px;
  }
`;

export const ArrowAndTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const ArrowDiv = styled.div`
  padding-left: 1em;
`;

export const TitleDiv = styled.div`
  padding-left: 1em;
`;

export const Title = styled.p`
  margin: 0;
`;

export const Timer = styled.div`
  align-self: center;
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
  @media (min-width: 500px) {
    border-radius: 30px 20px 0 40px;
  }
`;

export const LogoBackground = styled.div`
  background-color: #170c32;
  width: 78px;
  height: 88px;
  border-radius: 28px;
  margin-right: 5px;
  margin-top: 5px;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 28px;
  object-fit: scale-down;
  overflow: hidden;
`;
