import React, { useState, useLayoutEffect, useRef } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import './Game.css';

interface PlayerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}
interface GameProps {
  finishPage: () => void;
  msTimeLeft: number;
  playerList: PlayerProps[];
}

export default function GamePage({
  finishPage,
  msTimeLeft,
  playerList,
}: GameProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProps>({
    nickname: '',
    avatarSeed: '',
    id: 0,
  });

  useLayoutEffect(() => {
    if (selectedPlayer) {
      gsap.to('.selectedItem', { scale: 1.08, duration: 0.5 });
      gsap.to('.unselectedItem', { scale: 1, duration: 0.5 });
      window.localStorage.setItem(
        'voted-player',
        JSON.stringify(selectedPlayer)
      ); //guardamos temporariamente o nome e o seed do avatar no localstorage
    }
  }, [selectedPlayer]);

  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const players = useRef(playerList);
  const hasSelected = selectedPlayer.nickname != '';

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
      <div className="OEscolhidoDiv">
        <p>Vote em quem deve beber:</p>
        <div className="GamePlayerListDiv">
          {players.current.map((player, i) => (
            <div
              key={`${i}`}
              onClick={() => {
                selectPlayer(player);
              }}
              className={
                player.avatarSeed === selectedPlayer.avatarSeed &&
                player.nickname === selectedPlayer.nickname
                  ? 'selectedItem GamePlayerListItem'
                  : 'unselectedItem GamePlayerListItem'
              }>
              <p className="GamePlayerListNickname">{player.nickname}</p>
              <div
                className={
                  player.avatarSeed === selectedPlayer.avatarSeed &&
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

      <div className="GameVoteButton">
        <Button isDisabled={!hasSelected} onClick={finishPage}>
          Votar
        </Button>
      </div>
    </Background>
  );
}
