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
  const content = useMemo(
    () => (
      <>
        <BeerBadgeText>{beers}</BeerBadgeText>
        <Beer src={BeerIcon} alt="" />
      </>
    ),
    [beers]
  );

  const badgeStyle = useMemo(() => {
    return { width: 50 + 2 * beers };
  }, [beers]);

  const beerBadge = useMemo(() => {
    if (beers < 5) return <FiveBeers style={badgeStyle}>{content}</FiveBeers>;
    if (beers < 10) return <TenBeers style={badgeStyle}>{content}</TenBeers>;
    if (beers < 15)
      return <FifteenBeers style={badgeStyle}>{content}</FifteenBeers>;
    if (beers < 20)
      return <TwentyBeers style={badgeStyle}>{content}</TwentyBeers>;
    if (beers < 25)
      return <TwentyFiveBeers style={badgeStyle}>{content}</TwentyFiveBeers>;

    return <ThirtyBeers style={badgeStyle}>{content}</ThirtyBeers>;
  }, [beers]);

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
