import React, { useState, useLayoutEffect, useRef } from 'react';
import { Player } from '../../../contexts/GlobalContextProvider';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import './Game.css';

interface GameProps {
  vote: React.Dispatch<React.SetStateAction<Player>>;
  msTimeLeft: number;
  playerList: Player[];
}

export default function GamePage({
  vote,
  msTimeLeft,
  playerList,
}: GameProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>({
    nickname: '',
    avatarSeed: '',
    beers: 0,
    playerID: 0,
  });

  const players = useRef(playerList);

  useLayoutEffect(() => {
    if (selectedPlayer) {
      gsap.to('.selectedItem', { scale: 1.08, duration: 0.5 });
      gsap.to('.unselectedItem', { scale: 1, duration: 0.5 });
    }
  }, [selectedPlayer]);

  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const hasSelected = selectedPlayer.nickname != '';

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
      <div className="OEscolhidoContainer">
        <div className="OEscolhidoTitleAndList">
          <p className="OEscolhidoTitle">Vote em quem deve beber:</p>
          <div className="GamePlayerListDiv">
            {players.current.map((player, i) => (
              <div
                key={`${i}`}
                onClick={() => {
                  selectPlayer(player);
                }}
                className={
                  player.nickname === selectedPlayer.nickname
                    ? 'selectedItem GamePlayerListItem'
                    : 'unselectedItem GamePlayerListItem'
                }>
                <p className="GamePlayerListNickname">{player.nickname}</p>
                <div
                  className={
                    player.nickname === selectedPlayer.nickname
                      ? 'selectedAvatar GamePlayerListAvatar'
                      : 'unselectedAvatar GamePlayerListAvatar'
                  }>
                  <Avatar seed={player.avatarSeed} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button staysOnBottom isDisabled={!hasSelected} onClick={() => vote(selectedPlayer)}>
          Votar
        </Button>
      </div>
    </Background>
  );
}
