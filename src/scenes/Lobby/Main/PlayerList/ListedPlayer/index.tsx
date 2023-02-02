import React from 'react';
import Avatar from '../../../../../components/Avatar';
import BeerIcon from '../../../../../assets/beer.png';
import { FiveText, TenText, TwentyText, AvatarAndNickname, AvatarDiv, Beer, BeerGroup, FiveBeers, ListedPlayerDiv, Nickname, TenBeers, TwentyBeers } from './ListedPlayer.style';

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

  const holdMyBeers = beers;
  const twentyBeers = Math.floor(holdMyBeers / 20);
  const tenBeers = Math.floor((holdMyBeers - (20 * twentyBeers)) / 10); 
  const fiveBeers = Math.floor((holdMyBeers - (20 * twentyBeers) - (10 * tenBeers)) / 5);
  const singleBeers = holdMyBeers - (20 * twentyBeers) - (10 * tenBeers) - (5 * fiveBeers);

  const beerGroup: JSX.Element[] = [];
  for (let i = 0; i < singleBeers; i++) {   //comment
    beerGroup.push(
      <Beer key={i} src={BeerIcon} alt="" />
    );
  }
  for(let i = 0; i < fiveBeers; i++) {
    beerGroup.push(
      <FiveBeers key={500*(i+1)}>
        <FiveText>5</FiveText>
        <Beer 
          key={50*(i+1)} 
          src={BeerIcon} 
          alt=""
        />
      </FiveBeers>
    );
  }
  for(let i = 0; i < tenBeers; i++) {
    beerGroup.push(
      <TenBeers key={100*(i+1)}>
        <TenText>10</TenText>
        <Beer 
          key={10*(i+1)} 
          src={BeerIcon} 
          alt=""
        />
      </TenBeers>
    );
  }
  for(let i = 0; i < twentyBeers; i++) {
    beerGroup.push(
      <TwentyBeers key={200*(i+1)}>
        <TwentyText>20</TwentyText>
        <Beer 
          key={20*(i+1)} 
          src={BeerIcon} 
          alt=""
        />
      </TwentyBeers>
    );
  }

  return (
    <ListedPlayerDiv>
      <AvatarAndNickname>
        <AvatarDiv>
          <Avatar seed={seed}/>
        </AvatarDiv>
        <Nickname>
          {nickname}
        </Nickname>
      </AvatarAndNickname>
      
      <BeerGroup>
        {beerGroup}
      </BeerGroup>
    </ListedPlayerDiv>
  );
}


























    // <ListedPlayerDiv>
    //   <AvatarAndNickname>
    //     <AvatarDiv>
    //       <Avatar seed={seed} />
    //     </AvatarDiv>
    //     <Nickname>
    //       {nickname}
    //     </Nickname>
    //   </AvatarAndNickname>

    //   <BeerGroup>
    //     {beerGroup}
    //   </BeerGroup>
    // </ListedPlayerDiv>
