import { useState, useMemo } from 'react';
import { Player, useGlobalContext } from '../../contexts/GlobalContextProvider';
import { ArrowLeft, Info, Settings, Users } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import DomQueShotLogo from '../../assets/logo-darker.png';
import Popup from '../Popup';
import Avatar from '../Avatar';
import SocketConnection from '../../lib/socket';
import {
  ArrowAndTitle,
  HeaderDiv,
  Title,
  Timer,
  SettingsInfoAndLogo,
  InfoDiv,
  SettingsDiv,
  LogoDiv,
  LogoBackground,
  Logo,
  RoomCodeDiv,
  RoomCode,
  LeftSideItem,
  ListItem,
  Name,
  AvatarDiv,
  Kick,
  PlayerInfo,
} from './Header.style';

interface HeaderProps {
  logo?: boolean | string;
  title?: string;
  goBackArrow?: true | (() => void);
  participants?: boolean;
  roomCode?: boolean;
  timer?: number;
  settingsPage?: string | (() => void);
  infoPage?: string | (() => void);
}

export default function Header({
  logo,
  title,
  goBackArrow,
  roomCode,
  participants,
  timer,
  settingsPage,
  infoPage,
}: HeaderProps) {
  const { room } = useGlobalContext();
  const navigateTo = useNavigate();
  const [warningVisibility, setWarningVisibility] = useState<boolean>(false);
  const [playerListVisibility, setPlayerListVisibility] = useState<boolean>(false);

  const seconds = timer / 1000;
  const timerColor = seconds < 3 ? 'red' : 'white';
  const formattedTimer = `${seconds.toFixed(1)}s`;

  const playerList = useMemo(() => (
    <>
      {room.playerList.map((p, i) => (
        <ListItem key={i}>
          <PlayerInfo>
            <AvatarDiv>
              <Avatar seed={p.avatarSeed}/>
            </AvatarDiv>
            <Name>
              {p.nickname}
            </Name>
          </PlayerInfo>
          <Kick onClick={() => kickPlayer(p)}>
            Expulsar
          </Kick>
        </ListItem>
      ))}
    </>
  ), [room.playerList]);


  const kickPlayer = (p: Player) => {
    const socket = SocketConnection.getInstance();
    if (!socket) return;
    socket.push('kick-player', {
      nickname: p.nickname,
      roomCode: room.code
    });
    setPlayerListVisibility(false);
  }

  const goToPreviousPage = () => {
    if (goBackArrow === true) {
      //goBackArrow pode ser boolean true OU pode ser uma arrow function
      navigateTo(-1);
      return;
    }
    goBackArrow();
  };

  const goToInfoPage = () => {
    if (typeof infoPage === 'string') {
      //infoPage pode ser string com o endereço da página OU pode ser uma arrow function
      navigateTo(infoPage);
      return;
    }
    infoPage();
  };

  const goToSettingPage = () => {
    if (typeof settingsPage === 'string') {
      //settingsPage pode ser string com o endereço da página OU pode ser uma arrow function
      navigateTo(settingsPage);
      return;
    }
    settingsPage();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(room.code);
    setWarningVisibility(true);
    setTimeout(() => {
      setWarningVisibility(false);
    }, 2000);
  };

  return (
    <HeaderDiv>
      {roomCode && (
        <Popup
          type="warning"
          warningType="success"
          description={'código da sala copiado!'}
          show={warningVisibility}
        />
      )}

      {participants && (
        <Popup
          type="info"
          title="Jogadores"
          description={playerList}
          show={playerListVisibility}
          exit={() => setPlayerListVisibility(false)}
          backgroundColor='white'
        />
      )}

      <ArrowAndTitle>
        <LeftSideItem style={goBackArrow ? {} : { display: 'none' }}>
          <ArrowLeft width="30px" height="30px" onClick={goToPreviousPage} />
        </LeftSideItem>
        <LeftSideItem style={participants ? {} : { display: 'none' }}>
          <Users width="26px" height="26px" onClick={() => setPlayerListVisibility(p => !p)} />
        </LeftSideItem>
        <LeftSideItem style={title ? {} : { display: 'none' }}>
          <Title>{title}</Title>
        </LeftSideItem>
      </ArrowAndTitle>

      <Timer style={timer ? { color: timerColor } : { display: 'none' }}>
        <p style={{ margin: '0' }}>{formattedTimer}</p>
      </Timer>

      <SettingsInfoAndLogo>
        <RoomCodeDiv
          onClick={copyCode}
          style={roomCode ? {} : { display: 'none' }}>
          <RoomCode>
            Sala:
            <br />
            {room.code}
          </RoomCode>
        </RoomCodeDiv>

        <InfoDiv style={infoPage ? {} : { display: 'none' }}>
          <Info
            color="#FBBC05"
            width="22px"
            height="22px"
            onClick={goToInfoPage}
          />
        </InfoDiv>

        <SettingsDiv style={settingsPage ? {} : { display: 'none' }}>
          <Settings width="22px" height="22px" onClick={goToSettingPage} />
        </SettingsDiv>

        <LogoDiv style={logo ? {} : { display: 'none' }}>
          <LogoBackground>
            <Logo src={typeof logo === 'string' ? logo : DomQueShotLogo}></Logo>
          </LogoBackground>
        </LogoDiv>
      </SettingsInfoAndLogo>
    </HeaderDiv>
  );
}
