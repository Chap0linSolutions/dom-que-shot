import styled from '@emotion/styled';

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const RankingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Word = styled.p`
  font-size: 22px;
  font-family: Adumu;
  color: white;
  align-text: center;
  background-color: #403a55;
  padding: 10px 30px;
  border-radius: 20px;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  font-family: Roboto;
  align-text: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Guidance = styled(Subtitle)`
  margin: 0;
  font-size: 16px;
  @media(max-height: 740px){
    font-size: 15px;
  }
`

export const Text = styled.p`
  margin: 0;
  font-size: 17px;
  font-family: Roboto;
  @media(max-height: 740px){
    font-size: 16px;
  }
`;

export const OnlyWinner = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  align-items: center;
  background-color: #403a55;
  width: 120px;
  height: 180px;
  border-radius: 10px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
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
`;

export const AvatarBackground = styled.div`
  border-radius: 50%;
  background-color: #8877df;
  width: 64px;
  height: 64px;
  position: relative;
`;

export const Body = styled.div`
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 2;
`;

export const Ranking = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 8px;
  margin-bottom: 10px;
`;

export const Icon = styled.img`
  position: absolute;
  z-index: 5;
  width: 30px;
  object-fit: scale-down;
  background-color: #403A55;
  padding: 2px;
  border-radius: 10px;
  
`;

export const Crown = styled(Icon)`
  left: -8px;
  top: -15px;
  transform: rotate(-33deg);
`;

export const ThumbsDown = styled(Icon)`
  right: -5px;
  bottom: -5px;
  width: 25px;
  transform: rotate(20deg);
`;

export const NoOneGuessed = styled.img`
  width: 100%;
  object-fit: scale-down;
  padding: 7px;
`;