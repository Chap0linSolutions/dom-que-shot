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
import Alert from '../../components/Alert';
import {
  Content,
  Page,
  Subtitle,
  Title,
  PlayerList,
  Nickname,
  AvatarDiv,
  ListItem,
} from './WhoDrank.style';

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
  const [originalPlayerIsDown, setOriginalPlayerIsDown] =
    useState<boolean>(false);
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

    socket.addEventListener('original-player-is-down', () => {
      setOriginalPlayerIsDown(true);
    });

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
      }));
    });

    socket.addEventListener('player-turn-is', (turnName) => {
      setUser((previous) => ({
        ...previous,
        isCurrentTurn: user.nickname === turnName,
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

  const alert = (
    <Alert
      onButtonClick={() => setOriginalPlayerIsDown(false)}
      message="Parece que o jogador da vez caiu, então passou pra você! Selecione quem bebeu nessa rodada!"
    />
  );

  const header = coverImg ? (
    <Header exit roomCode logo={coverImg} />
  ) : (
    <Header exit roomCode logo />
  );

  if (user.isCurrentTurn === true) {
    return (
      <Background>
        {originalPlayerIsDown && user.isCurrentTurn && alert}
        {header}
        <Page>
          <Content>
            <Title>E aí, quem perdeu?</Title>
            <Subtitle>Selecione quem bebeu uma dose:</Subtitle>
            <PlayerList>
              {playerList.current.map((player, i) => {
                let bgColor = { background: '#8877df' };
                let state = 'unselected';
                let avatarState = 'unselectedAvatar';

                if (
                  selectedPlayers.find((p) => p.nickname === player.nickname)
                ) {
                  bgColor = { background: '#403a55' };
                  state = 'selected';
                  avatarState = 'selectedAvatar';
                }

                return (
                  <ListItem
                    className={state}
                    style={bgColor}
                    onClick={() => selectPlayer(player)}
                    key={`${i}`}>
                    <Nickname>{player.nickname}</Nickname>
                    <AvatarDiv className={avatarState}>
                      <Avatar seed={player.avatarSeed} />
                    </AvatarDiv>
                  </ListItem>
                );
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
