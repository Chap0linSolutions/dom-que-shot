import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobalContext, Player } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import beer from '../../assets/beer.png';
import gsap from 'gsap';
import AwaitingBanner from '../../components/AwaitingBanner';
import { Content, Page, Subtitle, Title, PlayerList, UnselectedPlayer, SelectedPlayer, Nickname, AvatarDiv } from './WhoDrank.style';

export default function WhoDrankPage() {
  const { user, room, setUser, setRoom } = useGlobalContext();

  const navigate = useNavigate();
  let coverImg = undefined;
  try {
    const location = useLocation();
    coverImg = location.state.coverImg;
  } catch (e) {
    coverImg = true;
  }

  const playerList = useRef<Player[]>(room.playerList);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [SP, setSP] = useState<number>(Math.random());
  const [buttonText, setButtonText] = useState('Ninguém bebeu');


  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList: Player[] = JSON.parse(reply);
      setRoom((previous) => ({
        ...previous,
        playerList: newPlayerList,
      }));
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      setRoom((previous) => ({
        ...previous,
        URL: destination,
        page: undefined,
      }));
      navigate(destination);
    });

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
      }));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (selectedPlayers) {
      gsap.to('.selected', { scale: 1.08, duration: 0.5 });
      gsap.to('.unselected', { scale: 1, duration: 0.5 });

      gsap.to('.selectedAvatar', { rotate: 180, duration: 0.5 });
      gsap.to('.unselectedAvatar', { rotate: 0, duration: 0.5 });
    }
  }, [SP]);

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

  const avatarSize = (window.innerHeight <= 740)? '40px' : '44px';

  const header = coverImg ? (
    <Header roomCode logo={coverImg} />
  ) : (
    <Header roomCode logo />
  );

  if (user.isCurrentTurn === true) {
    return (
      <Background>
        {header}
        <Page>
          <Content>
            <Title>
              E aí, quem perdeu?
            </Title>
            <Subtitle>
              Selecione quem bebeu uma dose:
            </Subtitle>
            <PlayerList>
              {playerList.current.map((player) => {
                let Player = UnselectedPlayer; 
                let state = 'unselected'; 
                let avatarState = 'unselectedAvatar';
                if(selectedPlayers.find((p) => p.nickname === player.nickname)){
                  Player = SelectedPlayer;
                  state = 'selected';
                  avatarState = 'selectedAvatar';
                }

                return (
                  <Player onClick={() => selectPlayer(player)} className={state} key={player.playerID}>
                    <Nickname>
                      {player.nickname}
                    </Nickname>
                    <AvatarDiv
                      className={avatarState}>
                      <Avatar size={avatarSize} seed={player.avatarSeed} />
                    </AvatarDiv>
                  </Player>
                )
              })}
            </PlayerList>
          </Content>
          <Button staysOnBottom onClick={backToRoulette}>
            {buttonText}
          </Button>
        </Page>
      </Background>
    );
  }

  return (
    <Background>
      {header}
      <Page style={{ marginTop: '3em' }}>
        <AwaitingBanner
          icon={beer}
          firstText="Aguardando o jogador da vez escolher quem bebeu entre vocês..."
          secondText="vamos torcer que ele não durma no processo."
        />
      </Page>
    </Background>
  );
}
