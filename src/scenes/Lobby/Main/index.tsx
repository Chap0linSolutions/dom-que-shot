import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, AlertTriangle } from 'react-feather';
import { useGlobalContext } from '../../../contexts/GlobalContextProvider';
import Header from '../../../components/Header';
import Background from '../../../components/Background';
import PlayerList from './PlayerList';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import './Main.css';

type Player = {
  avatarSeed: string;
  nickname: string;
  beers: number;
  playerID: number;
};

interface MainProps {
  currentOwner: string;
  alertMessage: string | undefined;
  roomCode: string;
  beginMatch: () => void;
  copyToClipboard: () => void;
  settingsPage: () => void;
  playerList: Player[];
}

export default function Main({
  currentOwner,
  alertMessage,
  roomCode,
  beginMatch,
  copyToClipboard,
  settingsPage,
  playerList,
}: MainProps) {
  const { user, setRoom } = useGlobalContext();
  const navigate = useNavigate();
  const [copyColor, setCopyColor] = useState('#8877DF');

  const backToChooseAvatar = () => {
    const destination = '/escolheravatar';
    setRoom((previous) => ({
      ...previous,
      URL: destination,
      page: undefined,
    }));
    navigate('/escolheravatar', {
      state: { option: 'update' },
    });
  };

  const header =
    user.isOwner === true ? (
      <Header
        goBackArrow={backToChooseAvatar}
        participants
        exit
        settingsPage={() => {
          settingsPage();
        }}
      />
    ) : (
      <Header exit logo goBackArrow={backToChooseAvatar} />
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
              user.isOwner === true
                ? { display: 'none' }
                : { visibility: 'visible' }
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
            user.isOwner === true
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
