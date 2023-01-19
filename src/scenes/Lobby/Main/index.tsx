import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, AlertTriangle } from 'react-feather';
import Header from '../../../components/Header';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import PingTracker from '../../../components/Debug/PingTracker';
import PlayerList from './PlayerList';
import './Main.css';

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
  roomCode: string;
  beginMatch: () => void;
  copyToClipboard: () => void;
  settingsPage: () => void;
  playerList: Player[];
}

export default function Main({
  ownerVisibility,
  currentOwner,
  roomCode,
  beginMatch,
  copyToClipboard,
  settingsPage,
  playerList,
}: MainProps) {
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
        goBackArrow={() => {
          navigate('/ChooseAvatar', {
            state: { option: 'update', roomCode: roomCode },
          });
        }}
      />
    );

  return (
    <Background>
      {header}
      <div className="LobbyDiv">
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
        <div
          className="BeginButton"
          style={
            ownerVisibility === Visibility.Visible
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }>
          <Button width="240px" height="56px" onClick={beginMatch}>
            Iniciar
          </Button>
        </div>
        <div className="LobbyWarning">
          <AlertTriangle width="20px" height="20px" color="red" />
          <p className="LobbyWarningText">Mínimo de 2 jogadores!</p>
        </div>
      </div>
      <PingTracker />
    </Background>
  );
}
