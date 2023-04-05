import { useState } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import { ArrowLeft, Info, Settings, Menu } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import DomQueShotLogo from '../../assets/logo-darker.png';
import Popup from '../Popup';
import {
  ArrowDiv,
  ArrowAndTitle,
  HeaderDiv,
  TitleDiv,
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
} from './Header.style';

interface HeaderProps {
  logo?: boolean | string;
  title?: string;
  goBackArrow?: true | (() => void);
  roomCode?: boolean;
  timer?: number;
  settingsPage?: string | (() => void);
  infoPage?: string | (() => void);
  burguer?: (() => void);
}

export default function Header({
  logo,
  title,
  goBackArrow,
  roomCode,
  timer,
  settingsPage,
  infoPage,
  burguer,
}: HeaderProps) {
  const { room } = useGlobalContext();
  const navigateTo = useNavigate();
  const [warningVisibility, setWarningVisibility] = useState<boolean>(false);

  const seconds = timer / 1000;
  const timerColor = seconds < 3 ? 'red' : 'white';
  const formattedTimer = `${seconds.toFixed(1)}s`;

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

      <ArrowAndTitle>        
        <ArrowDiv style={goBackArrow ? {} : { display: 'none' }}>
          <ArrowLeft width="30px" height="30px" onClick={goToPreviousPage} />
        </ArrowDiv>
        <TitleDiv style={title ? {} : { display: 'none' }}>
          <Title>{title}</Title>
        </TitleDiv>
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
