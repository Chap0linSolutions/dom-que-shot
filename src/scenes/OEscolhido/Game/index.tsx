import React, { useState, useEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import BottomButton from '../../../components/Button/BottomButton';
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

  useEffect(() => {
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

  const hasSelected = selectedPlayer.nickname != '';

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
      <div className="OEscolhidoDiv">
        <div className="OEscolhidoTitleAndList">
          <p>Vote em quem deve beber:</p>
          <div className="GamePlayerListDiv">
            {playerList.map((player, i) => (
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
        <BottomButton isDisabled={!hasSelected} onClick={finishPage}>
          Votar
        </BottomButton>
      </div>
    </Background>
  );
}
