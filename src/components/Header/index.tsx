import { ArrowLeft, Info, Settings, Power } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import DomQueShotLogo from '../../assets/logo-darker.png';
import {
  ArrowDiv,
  ArrowAndTitle,
  HeaderDiv,
  TitleDiv,
  LeaveDiv,
  Title,
  Timer,
  SettingsInfoAndLogo,
  InfoDiv,
  SettingsDiv,
  LogoDiv,
  LogoBackground,
  Logo,
} from './Header.style';

interface HeaderProps {
  exit?: boolean;
  logo?: boolean | string;
  title?: string;
  goBackArrow?: true | (() => void);
  timer?: number;
  settingsPage?: string | (() => void);
  infoPage?: string | (() => void);
}

export default function Header({
  exit,
  logo,
  title,
  goBackArrow,
  timer,
  settingsPage,
  infoPage,
}: HeaderProps) {
  const navigate = useNavigate();

  const seconds = timer / 1000;
  const timerColor = seconds < 3 ? 'red' : 'white';
  const formattedTimer = `${seconds.toFixed(1)}s`;

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

  const leaveRoom = () => {
    window.localStorage.clear();
    navigate('/Home');
  }

  return (
    <HeaderDiv>
      <ArrowAndTitle>
        <ArrowDiv style={goBackArrow ? {} : { display: 'none' }}>
          <ArrowLeft width="30px" height="30px" onClick={goToPreviousPage} />
        </ArrowDiv>

        <LeaveDiv style={exit ? {} : { display: 'none' }}>
          <Power width="22px" height="22px" onClick={leaveRoom}/>  
        </LeaveDiv>

        <TitleDiv style={title ? {} : { display: 'none' }}>
          <Title>{title}</Title>
        </TitleDiv>
      </ArrowAndTitle>

      <Timer style={timer ? { color: timerColor } : { display: 'none' }}>
        <p style={{ margin: '0' }}>{formattedTimer}</p>
      </Timer>

      <SettingsInfoAndLogo>
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
