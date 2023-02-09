import React, { useMemo } from 'react';
import Avatar from '../../../../../components/Avatar';
import BeerIcon from '../../../../../assets/beer.png';
import {
  AvatarAndNickname,
  AvatarDiv,
  Beer,
  BeerGroup,
  ListedPlayerDiv,
  Nickname,
  FiveBeers,
  TenBeers,
  TwentyBeers,
  TwentyFiveBeers,
  ThirtyBeers,
  BeerBadgeText,
  FifteenBeers,
} from './ListedPlayer.style';

interface ListedPlayerProps {
  seed: string;
  nickname: string;
  beers: number;
}

export default function ListedPlayer({
  seed,
  nickname,
  beers,
}: ListedPlayerProps) {
  const content = (
    <>
      <BeerBadgeText>{beers}</BeerBadgeText>
      <Beer src={BeerIcon} alt="" />
    </>
  );

  let beerBadge: JSX.Element;

  const badgeStyle = useMemo(() => {
    return { width: 50 + 2 * beers }
  }, [beers]);


  switch (true) {
    case beers < 5:
      beerBadge = <FiveBeers style={badgeStyle}>{content}</FiveBeers>;
      break;
    case beers < 10:
      beerBadge = <TenBeers style={badgeStyle}>{content}</TenBeers>;
      break;
    case beers < 15:
      beerBadge = <FifteenBeers style={badgeStyle}>{content}</FifteenBeers>;
      break;
    case beers < 20:
      beerBadge = <TwentyBeers style={badgeStyle}>{content}</TwentyBeers>;
      break;
    case beers < 25:
      beerBadge = (
        <TwentyFiveBeers style={badgeStyle}>{content}</TwentyFiveBeers>
      );
      break;
    case beers >= 25:
      beerBadge = <ThirtyBeers style={badgeStyle}>{content}</ThirtyBeers>;
      break;
  }

  return (
    <ListedPlayerDiv>
      <AvatarAndNickname>
        <AvatarDiv>
          <Avatar seed={seed} />
        </AvatarDiv>
        <Nickname>{nickname}</Nickname>
      </AvatarAndNickname>

      <BeerGroup>{beerBadge}</BeerGroup>
    </ListedPlayerDiv>
  );
}
