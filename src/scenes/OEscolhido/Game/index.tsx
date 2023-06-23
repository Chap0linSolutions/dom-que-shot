import React, { useRef } from 'react';
import { Player } from '../../../contexts/GlobalContextProvider';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Avatar from '../../../components/Avatar';
import {
  Content,
  Game,
  Title,
  PlayerList,
  Nickname,
  SelectedAvatar,
  UnselectedAvatar,
  SelectedPlayer,
  UnselectedPlayer,
  ItemContainer,
} from './Game.style';

interface GameProps {
  voted: Player;
  setVoted: React.Dispatch<React.SetStateAction<Player>>;
  msTimeLeft: number;
  playerList: Player[];
  owner: boolean;
}

export default function GamePage({
  voted,
  setVoted,
  msTimeLeft,
  playerList,
  owner,
}: GameProps) {
  const players = useRef(playerList);

  return (
    <Background noImage>
      <Header participants={owner} timer={msTimeLeft} />
      <Game>
        <Content>
          <Title>Vote em quem deve beber:</Title>
          <PlayerList>
            {players.current.map((player, i) => {
              let Item = UnselectedPlayer;
              let AvatarDiv = UnselectedAvatar;
              let state = 'unselected';

              if (voted && player.nickname === voted.nickname) {
                Item = SelectedPlayer;
                AvatarDiv = SelectedAvatar;
                state = 'selected';
              }

              return (
                //TODO código 'obscuro' rs
                <ItemContainer className={state} key={`${i}`}>
                  <Item onClick={() => setVoted(player)}>
                    <Nickname>{player.nickname}</Nickname>
                    <AvatarDiv>
                      <Avatar seed={player.avatarSeed} />
                    </AvatarDiv>
                  </Item>
                </ItemContainer>
              );
            })}
          </PlayerList>
        </Content>
      </Game>
    </Background>
  );
}
