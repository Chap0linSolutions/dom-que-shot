import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import GamePage from './Game';
import CoverPage from '../../components/Game/Cover';
import coverImg from '../../assets/game-covers/linha-do-tempo.png';

export type PhraseAndOptions = {
  phrase: string,
  options: string[],
}

enum Game {
  Cover,
  Game,
  Finish,
}

export default function LinhaDoTempo() {
  const title = 'Linha do Tempo';
  const { user, room, setUser, setRoom } = useGlobalContext();
  const [phraseAndOptions, setPhraseAndOptions] = useState<PhraseAndOptions | undefined>(undefined);
  

  //TIMER//////////////////////////////////////////////////////////////////////////////////////

  const gameTime = 10000;

  const [msTimer, setMsTimer] = useState(gameTime);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, 100));
  };

  let updatedMs = msTimer;
  const run = () => {
    if (updatedMs > 0) {
      updatedMs -= 100;
      if (updatedMs === 0) {
        setMsTimer(0);
      }
      setMsTimer(updatedMs);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();

  const description = (
    <>
      Aparecerá uma frase com algum acontecimento histórico (ex.: 'Quando foi inventada a lâmpada?')
      e algumas opções de data em que o acontecimento pode ter ocorrido.
      <br/>
      <br/>
      Os jogadores então terão
      15 segundos pare escolher uma opção, e quem escolher errado (ou não escolher a tempo) bebe.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  const getPhraseAndOptions = () => {
    socket.pushMessage(room.code, 'phrase-and-options');
  }

  const startGame = () => {
    socket.pushMessage(room.code, 'move-to', Game.Game);
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList = JSON.parse(reply);
      setRoom((previous) => ({
        ...previous,
        playerList: newPlayerList,
      }));
    });

    socket.addEventListener('kick-player', (nickname) => {
      if (user.nickname === nickname) {
        window.localStorage.clear();
        navigate('/Home');
      }
    });

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
      }));
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        setRoom((previous) => ({
          ...previous,
          URL: destination,
          page: undefined,
        }));
        return navigate(destination);
      }
      setGlobalRoomPage(destination);
    });

    socket.addEventListener('phrase-and-options', (value) => {
      setPhraseAndOptions(JSON.parse(value));
      startGame();
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  switch (room.page) {
    case Game.Game:
      return (
        <GamePage 
          phraseAndOptions={phraseAndOptions}
          gameDescription={description}
          gameName={title}
        />
      );
    case Game.Finish:
    default:
      return (
        <CoverPage
          type="round"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          turnVisibility={user.isCurrentTurn}
          ownerVisibility={user.isOwner}
          description={description}
          gamePage={getPhraseAndOptions}
        />
      );
  }
}
