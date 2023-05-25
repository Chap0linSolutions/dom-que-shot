import { useState, useEffect, useRef } from 'react';
import { ArrowRight, AlertTriangle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import ImageSlider from './ImageSlider';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import api from '../../services/api';
import games from '../../contexts/games';
import {
  Input,
  InputAndButton,
  JoinButton,
  Content,
  Text,
  Warning,
  WarningText,
  HomeDiv,
} from './Home.style';

type GameInformation = {
  title: string;
  description: string | JSX.Element;
};

function Home() {
  const { setUser, setRoom } = useGlobalContext();
  const navigate = useNavigate();

  const [gameInfo, setGameInfo] = useState<GameInformation>({
    title: '',
    description: '',
  });
  const [createRoomDisabled, setCreateRoomDisabled] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>('');
  const [inputErrorMsg, setInputErrorMsg] = useState({
    msg: '',
    visibility: 'hidden',
  });

  const inputRef = useRef(null);

  const newRoom = () => {
    api
      .put(`/createRoom`)
      .then((response) => {
        console.log(response.data);
        window.localStorage.setItem('userData', JSON.stringify({}));
        enterRoom(response.data, 'create');
      })
      .catch(() => {
        alert(`Erro ao criar a sala. Tente novamente mais tarde.`);
      });
    return;
  };

  const updateRoomCode = () => {
    const newRoom: string = inputRef.current.value.trim().toUpperCase();
    if (newRoom.length !== 0) {
      setRoomCode(newRoom);
      setInputErrorMsg({ msg: '', visibility: 'hidden' });
      return;
    }
  };

  const verifyRoom = (code) => {
    if (code.length === 4) {
      api
        .get(`/roomCode/${code}`)
        .then((response) => {
          console.log(response.data);
          window.localStorage.setItem('userData', JSON.stringify({}));
          enterRoom(code, 'join');
        })
        .catch(() => {
          setInputErrorMsg({
            msg: 'Sala inexistente! Tente novamente',
            visibility: 'visible',
          });
        });
    } else {
      setInputErrorMsg({
        msg: 'Código inválido! Tente novamente',
        visibility: 'visible',
      });
    }
  };

  const enterRoom = (roomCode: string, option: string) => {
    const nextURL = '/avatar';
    setUser({
      nickname: undefined,
      avatarSeed: undefined,
      isOwner: false,
      isCurrentTurn: false,
    });
    setRoom((previous) => ({
      ...previous,
      code: roomCode,
      URL: nextURL,
    }));
    navigate(nextURL, {
      state: { option: option },
    });
  };

  useEffect(() => {
    const socket = SocketConnection.getInstance();
    socket && socket.disconnect();
  }, []);

  ////Listener para remover foco do <input> quando o usuário aperta Enter/////////////////////////

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown);
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };
  }, [roomCode]);

  const detectKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(roomCode);
      verifyRoom(roomCode);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Background>
      <Header title="Vamos começar?" logo />
      <HomeDiv>
        <Content>
          <Text>Já possui uma sala?</Text>
          <InputAndButton>
            <Input
              ref={inputRef}
              onChange={updateRoomCode}
              placeholder="Digite o código da sala"
              onFocus={() => setCreateRoomDisabled(true)}
              onBlur={() => setCreateRoomDisabled(false)}
            />
            <JoinButton>
              <ArrowRight
                width="30px"
                height="30px"
                onClick={() => verifyRoom(roomCode)}
              />
            </JoinButton>
          </InputAndButton>
          <Warning
            style={{
              visibility:
                inputErrorMsg.visibility === 'visible' ? 'visible' : 'hidden',
            }}>
            <AlertTriangle width="20px" height="20px" color="red" />
            <WarningText>{inputErrorMsg.msg}</WarningText>
          </Warning>
        </Content>

        <Content style={createRoomDisabled ? { opacity: 0.2 } : { opacity: 1 }}>
          <Text>Se ainda não possui:</Text>
          <Button
            isDisabled={createRoomDisabled}
            width="100%"
            onClick={newRoom}>
            Criar Sala
          </Button>
        </Content>

        <Content>
          <Text>Já conhece nossos jogos?</Text>
          <ImageSlider
            content={games}
            show={() => setPopupVisibility(true)}
            setGameInfo={setGameInfo}
          />
        </Content>
      </HomeDiv>
      <Popup
        type="info"
        height={280}
        title={gameInfo.title}
        description={gameInfo.description}
        show={popupVisibility}
        exit={() => setPopupVisibility(false)}
      />
    </Background>
  );
}

export default Home;
