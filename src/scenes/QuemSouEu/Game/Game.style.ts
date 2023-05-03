import styled from '@emotion/styled';

export const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
`;

export const PlayerList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 0 20px 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TextAndHide = styled.div`
  margin: 0 5% 8px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GuidanceText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  @media (max-height: 740px) {
    font-size: 18px;
  }
`;

export const HideNames = styled.div`
  background: #403a55;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  @media (max-height: 740px) {
    width: 40px;
    height: 40px;
  }
`;

export const Card = styled.div`
  width: 90%;
  height: 80px;
  background-color: #403a55;
  border-radius: 10px;
  margin: 4px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Detail = styled.div`
  width: 8px;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #8877df;
  font-size: 2px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 16px 0 0 8px;
`;

export const OthersName = styled.p`
  font-family: 'Roboto';
  font-size: 22px;
  font-weight: 500;
  color: white;
  margin: 0;
  @media (max-height: 740px) {
    font-size: 20px;
  }
`;

export const YourName = styled.p`
  font-family: 'Roboto';
  font-size: 22px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  @media (max-height: 740px) {
    font-size: 20px;
    margin-bottom: 2px;
  }
`;

export const Reload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #800080;
  border-radius: 20px;
  padding: 5px 15px;
  margin-left: 10px;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 10px;
  cursor: pointer;
`;

export const ReloadsLeft = styled.p`
  color: white;
  font-size: 15px;
  font-weight: 400;
  margin: 0;
  padding-right: 5px;
`;

export const HiddenName = styled(YourName)`
  padding-left: 12px;
`;

export const WhoGotThisName = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  height: 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px 0 10px 0;
  padding: 0 10px;
  min-width: 120px;
`;

export const CategoryAndPlayer = styled.div`
  height: 38px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  @media (max-height: 740px) {
    height: 32px;
  }
`;

export const PlayerNickname = styled.p`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.54);
  margin: 0 8px;
  @media (max-height: 740px) {
    font-size: 18px;
  }
`;

export const PlayerAvatar = styled.div`
  width: 24px;
  height: 24px;
`;

export const Category = styled.p`
  margin: 0;
  margin-bottom: 4px;
  font-size: 12px;
  max-width: 30%;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.54);
  @media (max-height: 740px) {
    font-size: 11px;
    line-height: 13px;
  }
`;
