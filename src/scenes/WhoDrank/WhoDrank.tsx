import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import { Player } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import beer from '../../assets/beer.png';
import gsap from 'gsap';
import './WhoDrank.css';


export default function WhoDrankPage() {
  const {user, room, setUser, setRoom} = useGlobalContext();

  const navigate = useNavigate();
  let coverImg = undefined;
  try{
    const location = useLocation();
    coverImg = location.state.coverImg;
  } catch (e){
    coverImg = true;
  }

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [SP, setSP] = useState<number>(Math.random());
  const [buttonText, setButtonText] = useState('Ninguém bebeu');

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('lobby-update', (reply) => { 
      const newPlayerList = JSON.parse(reply);                  //newPlayerList = Player[]
      setRoom(previous => {
        return {
          ...previous,
          playerList: newPlayerList,
        }
      });
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      setRoom(previous => {
        return {
          ...previous,
          URL: destination,
          page: undefined,
        }
      });
      navigate(destination);
    });
    
    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = (user.nickname === ownerName);
      setUser(previous => {
        return {
          ...previous,
          isOwner: isOwner,
        }
      });
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

  useEffect(() => {
    gsap.to('.WhoDrankAwaitingIcon', {
      rotate: -360,
      duration: 5,
      ease: 'linear',
      repeat: -1,
    });
  });

  const selectPlayer = (player: Player) => {
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
      roomCode: room.code,
      players: JSON.stringify(selectedPlayers),
    });

    socket.push('update-turn', room.code);
    socket.pushMessage(room.code, 'end-game', null);
  };

  if (user.isCurrentTurn === true) {
    return (
      <Background>
        <Header logo={coverImg} />
        <div className="WhoDrankContainer">
          <div className="WhoDrankDiv">
            <p className="WhoDrankTitle">E aí, quem perdeu?</p>
            <p style={{ margin: 0 }}>Selecione quem bebeu uma dose:</p>
            <div className="WhoDrankPlayerListDiv">
              {room.playerList.map((player) => (
                <div
                  onClick={() => {
                    selectPlayer(player);
                  }}
                  className={
                    selectedPlayers.find((p) => p.nickname === player.nickname)
                      ? 'WhoDrankSelectedItem WhoDrankPlayerListItem'
                      : 'WhoDrankUnselectedItem WhoDrankPlayerListItem'
                  }
                  key={player.playerID}>
                  <p className="WhoDrankPlayerListNickname">
                    {player.nickname}
                  </p>
                  <div
                    className={
                      selectedPlayers.find(
                        (p) => p.nickname === player.nickname
                      )
                        ? 'WhoDrankSelectedAvatar WhoDrankPlayerListAvatar'
                        : 'WhoDrankUnselectedAvatar WhoDrankPlayerListAvatar'
                    }>
                    <Avatar seed={player.avatarSeed} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button staysOnBottom onClick={backToRoulette}>
            {buttonText}
          </Button>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <Header logo={coverImg} />
      <div className="WhoDrankDiv">
        <div className="WhoDrankAwaitingDiv">
          <img className="WhoDrankAwaitingIcon" src={beer} />
          <div className="WhoDrankAwaitingTitle">
            <p>
              Aguardando o jogador da vez escolher quem bebeu dentre vocês...
            </p>
            Vamos torcer que ele não durma no processo.
          </div>
        </div>
      </div>
    </Background>
  );
}
