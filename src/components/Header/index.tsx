import { useState, useEffect, useMemo } from 'react';
import { Player, useGlobalContext } from '../../contexts/GlobalContextProvider';
import { ArrowLeft, HelpCircle, Settings, Users, Power } from 'react-feather';
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
  InfoButton,
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
  RightSideItem,
  Confirm,
  ConfirmDiv,
  ConfirmYes,
  ConfirmNo,
  Buttons,
} from './Header.style';

interface HeaderProps {
  exit?: boolean;
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
  exit,
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
  const navigate = useNavigate();
  const [playerListVisibility, setPlayerListVisibility] =
    useState<boolean>(false);
  const [warning, setWarning] = useState<
    'success' | 'failure' | 'alert' | undefined
  >(undefined);

  const seconds = timer / 1000;
  const timerColor = seconds < 3 ? 'red' : 'white';
  const formattedTimer = `${seconds.toFixed(1)}s`;

  const playerList = useMemo(
    () => (
      <>
        {room.playerList.map((p, i) => (
          <ListItem key={i}>
            <PlayerInfo>
              <AvatarDiv>
                <Avatar seed={p.avatarSeed} />
              </AvatarDiv>
              <Name>{p.nickname}</Name>
            </PlayerInfo>
            <Kick onClick={() => kickPlayer(p)}>Expulsar</Kick>
          </ListItem>
        ))}
      </>
    ),
    [room.playerList]
  );

  useEffect(() => {
    try {
      window.history.replaceState(
        {},
        'Dom Que Shot',
        process.env.VITE_REACT_APP_ADRESS
      );
    } catch (e) {
      console.log(
        'Erro ao renomear o endereço da página (window.history.replaceState).'
      );
    }
  }, []);

  const kickPlayer = (p: Player) => {
    const socket = SocketConnection.getInstance();
    socket &&
      socket.push('kick-player', {
        nickname: p.nickname,
        roomCode: room.code,
      });
  };

  const goToPreviousPage = () => {
    if (goBackArrow === true) {
      //goBackArrow pode ser boolean true OU pode ser uma arrow function
      navigate(-1);
      return;
    }
    goBackArrow();
  };

  const goToInfoPage = () => {
    if (typeof infoPage === 'string') {
      //infoPage pode ser string com o endereço da página OU pode ser uma arrow function
      navigate(infoPage);
      return;
    }
    infoPage();
  };

  const goToSettingPage = () => {
    if (typeof settingsPage === 'string') {
      //settingsPage pode ser string com o endereço da página OU pode ser uma arrow function
      navigate(settingsPage);
      return;
    }
    settingsPage();
  };

  const togglePlayerListVisibility = () => {
    setPlayerListVisibility((p) => !p);
    setWarning(undefined);
  };

  const confirmLeaveRoom = () => {
    setPlayerListVisibility(false);
    if (!warning) return setWarning('alert');
    setWarning(undefined);
  };

  const leaveRoom = () => {
    window.localStorage.clear();
    navigate('/home');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(room.code);
    setWarning('success');
    setTimeout(() => {
      setWarning(undefined);
    }, 2000);
  };

  const leaveWarning = (
    <ConfirmDiv>
      <Confirm>Quer mesmo sair?</Confirm>
      <Buttons>
        <ConfirmYes onClick={leaveRoom}>Sim</ConfirmYes>
        <ConfirmNo onClick={() => setWarning(undefined)}>Não</ConfirmNo>
      </Buttons>
    </ConfirmDiv>
  );

  if (!timer) {
    return (
      <HeaderDiv>
        {roomCode && (
          <Popup
            type="warning"
            warningType="success"
            description="código da sala copiado!"
            show={warning === 'success'}
          />
        )}

        {participants && (
          <Popup
            type="info"
            title="Jogadores"
            description={playerList}
            show={playerListVisibility}
            exit={() => setPlayerListVisibility(false)}
            backgroundColor="white"
          />
        )}

        {exit && (
          <Popup
            type="warning"
            description={leaveWarning}
            show={warning === 'alert'}
          />
        )}

        <ArrowAndTitle>
          <LeftSideItem style={goBackArrow ? {} : { display: 'none' }}>
            <ArrowLeft width="30px" height="30px" onClick={goToPreviousPage} />
          </LeftSideItem>
          <LeftSideItem style={participants ? {} : { display: 'none' }}>
            <Users
              width="26px"
              height="26px"
              onClick={togglePlayerListVisibility}
            />
          </LeftSideItem>

          <LeftSideItem style={exit ? {} : { display: 'none' }}>
            <Power width="22px" height="22px" onClick={confirmLeaveRoom} />
          </LeftSideItem>

          <Title style={title ? {} : { display: 'none' }}>{title}</Title>
        </ArrowAndTitle>

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

          <InfoButton
            onClick={goToInfoPage}
            style={infoPage ? {} : { display: 'none' }}>
            <HelpCircle color="#170c32" width="20px" height="20px" />
          </InfoButton>

          <SettingsDiv style={settingsPage ? {} : { display: 'none' }}>
            <Settings width="22px" height="22px" onClick={goToSettingPage} />
          </SettingsDiv>

          <LogoDiv style={logo ? {} : { display: 'none' }}>
            <LogoBackground>
              <Logo
                src={typeof logo === 'string' ? logo : DomQueShotLogo}></Logo>
            </LogoBackground>
          </LogoDiv>
        </SettingsInfoAndLogo>
      </HeaderDiv>
    );
  }

  return (
    <HeaderDiv>
      {exit && (
        <Popup
          type="warning"
          description={leaveWarning}
          show={warning === 'alert'}
        />
      )}

      {participants && (
        <Popup
          type="info"
          title="Jogadores"
          description={playerList}
          show={playerListVisibility}
          exit={() => setPlayerListVisibility(false)}
          backgroundColor="white"
        />
      )}

      {participants && (
        <LeftSideItem>
          <Users
            width="26px"
            height="26px"
            onClick={() => setPlayerListVisibility((p) => !p)}
          />
        </LeftSideItem>
      )}

      {exit && (
        <LeftSideItem>
          <Power width="22px" height="22px" onClick={confirmLeaveRoom} />
        </LeftSideItem>
      )}

      <LeftSideItem />
      <Timer style={timer ? { color: timerColor } : { display: 'none' }}>
        <p style={{ margin: '0' }}>{formattedTimer}</p>
      </Timer>
      <RightSideItem />

      {exit && <RightSideItem />}

      {participants && <RightSideItem />}
    </HeaderDiv>
  );
}
