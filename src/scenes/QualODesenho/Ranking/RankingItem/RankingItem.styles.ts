import styled from '@emotion/styled';

export const RankingItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  background-color: #8877df;
  border-radius: 10px;
`;

export const Position = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #403a55;
  width: 56px;
  height: 48px;
  padding-left: 4px;
  padding-right: 8px;
  margin: none;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-right: 1px solid #f9c95c;
`;

const Text = styled.p`
  margin: 0;
  font-size: 20px;
  @media(max-height: 740px){
    font-size: 18px;
  }
`;

export const WinnerText = styled(Text)`
  color: white;
`;

export const LoserName = styled(Text)`
  color: firebrick;
`;

export const LoserTime = styled(Text)`
  color: firebrick;
  font-size: 14px;
`;

export const CircleBorder = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #f9c95c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlayerInfo = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
`;

export const ThumbsDown = styled.img`
  width: 25px;
  object-fit: scale-down;
`;