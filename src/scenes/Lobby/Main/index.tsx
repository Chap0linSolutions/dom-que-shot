import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, AlertTriangle } from 'react-feather';
import Header from '../../../components/Header';
import Background from '../../../components/Background';
import PlayerList from './PlayerList';
import Button from '../../../components/Button';
import './Main.css';
import Alert from '../../../Components/Alert';

enum Visibility {
  Invisible,
  Visible,
}

type Player = {
  avatarSeed: string;
  nickname: string;
  beers: number;
  playerID: number;
};

interface MainProps {
  ownerVisibility: Visibility;
  currentOwner: string;
  alertMessage: string | undefined;
  roomCode: string;
  beginMatch: () => void;
  copyToClipboard: () => void;
  settingsPage: () => void;
  playerList: Player[];
}

export default function Main({
  ownerVisibility,
  currentOwner,
  alertMessage,
  roomCode,
  beginMatch,
  copyToClipboard,
  settingsPage,
  playerList,
}: MainProps) {
  //console.log(alertMessage);
  const navigate = useNavigate();
  const [copyColor, setCopyColor] = useState('#8877DF');

  const header =
    ownerVisibility === Visibility.Visible ? (
      <Header
        goBackArrow={() => {
          navigate('/ChooseAvatar', {
            state: { option: 'update', roomCode: roomCode },
          });
        }}
        settingsPage={() => {
          settingsPage();
        }}
      />
    ) : (
      <Header
        logo
        goBackArrow={() => {
          navigate('/ChooseAvatar', {
            state: { option: 'update', roomCode: roomCode },
          });
        }}
      />
    );

  const alertBox = alertMessage ? (
    <Alert
      message={alertMessage}
      noButton={true}
      icon={'src/assets/beer.png'}
    />
  ) : (
    <></>
  );

  return (
    <Background>
      {header}
      {alertBox}
      <div className="LobbyDiv">
        <div className="LobbyContent">
          <div className="RoomCodeTitleSpace">
            <p className="RoomCodeTitle">Código da Sala:</p>
            <div className="CopyWarning">
              <CheckCircle width="20px" height="20px" color="lime" />
              <p className="CopyWarningText">Copiado!</p>
            </div>
          </div>
          <div className="RoomCodeSpace">
            <p className="RoomCodeItself">{roomCode}</p>
            <Copy
              width="22px"
              height="22px"
              color={copyColor}
              onClick={() => {
                copyToClipboard();
                setCopyColor('lime');
                setTimeout(() => {
                  setCopyColor('#8877DF');
                }, 2000);
              }}
            />
          </div>
          <p className="PlayerListTitle">Jogadores:</p>
          <div className="PlayerList">
            <PlayerList players={playerList} />
          </div>
          <div
            className="WaitingMessageDiv"
            style={
              ownerVisibility === Visibility.Invisible
                ? { visibility: 'visible' }
                : { display: 'none' }
            }>
            <p className="WaitingMessage">
              Aguardando {currentOwner}
              <br />
              iniciar o jogo...
            </p>
          </div>
        </div>
        <div
          className="BeginButton"
          style={
            ownerVisibility === Visibility.Visible
              ? { visibility: 'visible' }
              : { display: 'none' }
          }>
          <div className="LobbyWarning">
            <AlertTriangle width="20px" height="20px" color="red" />
            <p className="LobbyWarningText">Mínimo de 2 jogadores!</p>
          </div>
          <Button staysOnBottom onClick={beginMatch}>
            Iniciar
          </Button>
        </div>
      </div>
    </Background>
  );
}
