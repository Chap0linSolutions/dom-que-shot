import styled from '@emotion/styled';

export const ListedPlayerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 4px;
`;

export const AvatarAndNickname = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarDiv = styled.div`
    width: 30px;
    height: 30px;
  }
`;

export const Nickname = styled.p`
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.54);
  margin: 0 5px;
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
  justify-content: center;
  padding: 0 5px;
  height: 26px;
  border-radius: 10px;
  margin: 0 2px;
`;

export const FiveBeers = styled(BeerBadge)`
  background: #664445;
`;

export const TenBeers = styled(BeerBadge)`
  background: #777777;
`;

export const TwentyBeers = styled(BeerBadge)`
  background: #f9c95c;
`;

export const BeerBadgeText = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

export const FiveText = styled(BeerBadgeText)`
  color: rgba(255, 255, 255, 0.54);
`;

export const TenText = styled(BeerBadgeText)`
  color: rgba(255, 255, 255, 0.54);
`;

export const TwentyText = styled(BeerBadgeText)`
  color: rgba(0, 0, 0, 0.54);
`;

export const Beer = styled.img`
  height: 16px;
  object-fit: scale-down;
`;
