import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import beer from '../../assets/beer.png';
import gsap from 'gsap';
import './WhoDrank.css';
import AwaitingBanner from '../../components/AwaitingBanner';

interface PlayerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}

export default function WhoDrankPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const coverImg = location.state.coverImg;

  const turnVisibility = useLocation().state.isYourTurn;
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [playerList, updatePlayerList] = useState<PlayerProps[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<PlayerProps[]>([]);
  const [SP, setSP] = useState<number>(Math.random());
  const [buttonText, setButtonText] = useState('Ninguém bebeu');

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.setLobbyUpdateListener(updatePlayerList);
    socket.push('lobby-update', userData.roomCode);

    socket.addEventListener('room-is-moving-to', (destination) => {
      navigate(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (selectedPlayers) {
      gsap.to('.WhoDrankSelectedItem', { scale: 1.08, duration: 0.5 });
      gsap.to('.WhoDrankUnselectedItem', { scale: 1, duration: 0.5 });

      gsap.to('.WhoDrankSelectedAvatar', { rotate: 180, duration: 0.5 });
      gsap.to('.WhoDrankUnselectedAvatar', { rotate: 0, duration: 0.5 });
    }
  }, [SP]);

  const selectPlayer = (player: PlayerProps) => {
    const selectedOnes = selectedPlayers;
    const index = selectedPlayers.findIndex(
      (p) => p.nickname === player.nickname
    );
    if (index !== -1) {
      selectedOnes.splice(index, 1);
      if (selectedOnes.length === 0) {
        setButtonText('Ninguém bebeu');
      }
    } else {
      selectedOnes.push(player);
      setButtonText('Salvar e continuar');
    }
    setSelectedPlayers(selectedOnes);
    setSP(Math.random());
  };

  const backToRoulette = () => {
    socket.push('players-who-drank-are', {
      roomCode: userData.roomCode,
      players: JSON.stringify(selectedPlayers),
    });

    socket.push('update-turn', userData.roomCode);
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/SelectNextGame',
    });
  };

  if (turnVisibility === true) {
    return (
      <Background>
        <Header logo={coverImg} />
        <div className="WhoDrankContainer">
          <div className="WhoDrankDiv">
            <p className="WhoDrankTitle">E aí, quem perdeu?</p>
            <p style={{ margin: 0 }}>Selecione quem bebeu uma dose:</p>
            <div className="WhoDrankPlayerListDiv">
              {playerList.map((player) => (
                <div
                  onClick={() => {
                    console.log('aaah');
                    selectPlayer(player);
                  }}
                  className={
                    selectedPlayers.find((p) => p.nickname === player.nickname)
                      ? 'WhoDrankSelectedItem WhoDrankPlayerListItem'
                      : 'WhoDrankUnselectedItem WhoDrankPlayerListItem'
                  }
                  key={player.id}>
                  <p className="WhoDrankPlayerListNickname">{player.nickname}</p>
                  <div
                    className={
                      selectedPlayers.find((p) => p.nickname === player.nickname)
                        ? 'WhoDrankSelectedAvatar WhoDrankPlayerListAvatar'
                        : 'WhoDrankUnselectedAvatar WhoDrankPlayerListAvatar'
                    }>
                    <Avatar seed={player.avatarSeed} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="WhoDrankVoteButton">
            <Button onClick={backToRoulette}>{buttonText}</Button>
          </div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <Header logo={coverImg} />
      <div className='WhoDrankContainer' style={{marginTop: '3em'}}>
        <AwaitingBanner
            icon={beer}
            firstText="Aguardando o jogador da vez escolher quem bebeu entre vocês..."
            secondText="vamos torcer que ele não durma no processo."
        />
      </div>
    </Background>
  );
}
