import React, { useState, useLayoutEffect, useRef } from 'react';
import { Player } from '../../../contexts/GlobalContextProvider';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
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
  vote: React.Dispatch<React.SetStateAction<Player>>;
  msTimeLeft: number;
  playerList: Player[];
}

export default function GamePage({ vote, msTimeLeft, playerList }: GameProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>({
    nickname: '',
    avatarSeed: '',
    beers: 0,
    playerID: 0,
  });

  const players = useRef(playerList);

  useLayoutEffect(() => {
    if (selectedPlayer) {
      gsap.to('.selected', { scale: 1.08, duration: 0.5 });
      gsap.to('.unselected', { scale: 1, duration: 0.5 });
    }
  }, [selectedPlayer]);

  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const hasSelected = selectedPlayer.nickname != '';

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
      <Game>
        <Content>
          <Title>Vote em quem deve beber:</Title>
          <PlayerList>
            {players.current.map((player, i) => {
              let Item = UnselectedPlayer;
              let AvatarDiv = UnselectedAvatar;
              let state = 'unselected';

              if (player.nickname === selectedPlayer.nickname) {
                Item = SelectedPlayer;
                AvatarDiv = SelectedAvatar;
                state = 'selected';
              }

              return (
                <ItemContainer className={state} key={`${i}`}>
                  <Item onClick={() => selectPlayer(player)}>
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
        <Button
          staysOnBottom
          isDisabled={!hasSelected}
          onClick={() => vote(selectedPlayer)}>
          Votar
        </Button>
      </Game>
    </Background>
  );
}
