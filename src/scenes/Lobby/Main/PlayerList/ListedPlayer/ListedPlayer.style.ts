import styled from '@emotion/styled';

export const ListedPlayerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 0 5px 0 10px;
  margin-bottom: 4px;
  @media (max-height: 740px) {
    height: 33px;
  }
`;

export const AvatarAndNickname = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarDiv = styled.div`
    width: 32px;
    height: 32px;
    @media (max-height: 740px) {
      width: 28px;
      height: 28px;
    }
  }
`;

export const Nickname = styled.p`
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.54);
  margin: 0 10px;
  font-size: 20px;
  font-weight: 500;
  @media (max-height: 740px){
    font-size: 18px;
  }
`;

export const BeerGroup = styled.div`
  display: flex;
  align-items: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const BeerBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  padding-right: 5px;
  height: 26px;
  border-radius: 10px;
  margin: 0 2px;
`;

export const FiveBeers = styled(BeerBadge)`
  background: linear-gradient(110deg, #403a55 8%, #4b4463 18%, #403a55 33%);
  background-size: 300% 100%;
`;

export const TenBeers = styled(BeerBadge)`
  animation: 10s shine linear infinite;
  background: linear-gradient(110deg, #5f48a4 8%, #7b5dd4 18%, #5f48a4 33%);
  background-size: 300% 100%;
  @keyframes shine {
    to {
      background-position-x: -300%;
    }
  }
`;

export const FifteenBeers = styled(BeerBadge)`
  animation: 8s shine linear infinite;
  background: linear-gradient(110deg, #800080 8%, #c200c2 18%, #800080 33%);
  background-size: 300% 100%;
  @keyframes shine {
    to {
      background-position-x: -300%;
    }
  }
`;

export const TwentyBeers = styled(BeerBadge)`
  animation: 6s shine linear infinite;
  background: linear-gradient(110deg, #914711 8%, #bf733d 18%, #914711 33%);
  background-size: 300% 100%;
  @keyframes shine {
    to {
      background-position-x: -300%;
    }
  }
`;

export const TwentyFiveBeers = styled(BeerBadge)`
  animation: 4s shine linear infinite;
  background: linear-gradient(110deg, #cc9921 8%, #e3ba5b 18%, #cc9921 33%);
  background-size: 300% 100%;
  @keyframes shine {
    to {
      background-position-x: -300%;
    }
  }
`;

export const ThirtyBeers = styled(BeerBadge)`
  animation: 3.5s shine linear infinite;
  background: linear-gradient(110deg, #ad0909 8%, #e34444 18%, #ad0909 33%);
  background-size: 300% 100%;
  @keyframes shine {
    to {
      background-position-x: -300%;
    }
  }
`;

export const BeerBadgeText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.74);
  margin: 6px;
  @media (max-height: 740px) {
    font-size: 15px;
  }
`;

export const Beer = styled.img`
  height: 16px;
  object-fit: scale-down;
`;
