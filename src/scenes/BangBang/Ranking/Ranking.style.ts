import styled from '@emotion/styled';

export const Ranking = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Banners = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
  position: relative;
`;

export const Winner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 24px;
  align-items: center;
  background-color: #403a55;
  width: 120px;
  height: 180px;
  border-radius: 10px;
  transform: rotate(-15deg);
  border-color: black;
  border-width: 1px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
  overflow: hidden;
`;

export const Loser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 24px;
  align-items: center;
  background-color: #403a55;
  width: 120px;
  height: 180px;
  border-radius: 10px;
  transform: rotate(15deg);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 0;
  overflow: hidden;
`;

export const AvatarDiv = styled.div`
  border-radius: 50%;
  background-color: #8877df;
  width: 64px;
  height: 64px;
  position: relative;
`;

export const NoOneVoted = styled.img`
  width: 65px;
  transform: rotate(0deg);
`;

export const Icon = styled.img`
  position: absolute;
  width: 33px;
  padding: 3px;
  object-fit: scale-down;
  background: #403a55;
  border-radius: 10px;
`;

export const Crown = styled(Icon)`
  top: -16px;
  left: -8px;
  transform: rotate(-33deg);
`;

export const ThumbsDown = styled(Icon)`
  right: -14px;
  top: 40px;
  transform: rotate(12deg);
  padding: 5px;
`;

export const BannerText = styled.p`
  margin: 0;
  margin-top: 2px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  z-index: 2;
  @media (max-height: 740px) {
    font-size: 15px;
  }
`;

export const ShotTime = styled(BannerText)`
  color: #aaaaaa;
  font-weight: 400;
`;

export const Players = styled.div`
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  align-items: center;
  gap: 5px;
  z-index: 2;
  @media (max-height: 740px) {
    margin-top: -36px;
  }
`;

export const OnlyWinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 24px;
  align-items: center;
  background-color: #403a55;
  width: 120px;
  height: 180px;
  border-radius: 10px;
  border-color: black;
  border-width: 1px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

export const Text = styled.p`
  width: 100%;
  font-size: 16px;
  color: #aaaaaa;
  text-align: center;
  @media (max-height: 740px) {
    font-size: 15px;
  }
`;
