import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, AlertTriangle } from 'react-feather';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Avatar from '../../components/Avatar';
import api from '../../services/api';
import './ChooseAvatar.css';

function ChooseAvatar() {
  const { user, room, setUser, setRoom } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { option } = location.state;
  const buttonText =
    option === 'join'
      ? 'Entrar'
      : option === 'create'
      ? 'Criar sala'
      : 'Atualizar';

  const roomCode = room.code;
  const oldNickname = user.nickname;
  const [inputText, setInputText] = useState(oldNickname ? oldNickname : '');
  const [inputErrorMsg, setInputErrorMsg] = useState({
    msg: '',
    visibility: 'hidden',
  });

  const inputRef = useRef(null);
  const characterCount = inputRef.current
    ? inputRef.current.value.trim().length
    : oldNickname && oldNickname.length;

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.connect(room.code);
    socket.addEventListener('room-is-moving-to', (destination) => {
      if (destination === '/roleta') {
        return navigate(destination);
      }
    });

    return () => {
      if (socket.socket) {
        socket.removeAllListeners();
      }
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const updateUserName = () => {
    const input = inputRef.current.value;
    setInputText(input);
    const inputLength = input.trim().length;

    if (inputLength > 16) {
      setInputErrorMsg({
        msg: 'O nome deve ter no máximo 16 caracteres.',
        visibility: 'visible',
      });
      return;
    }
    if (inputLength !== 0) {
      setInputErrorMsg({ msg: '', visibility: 'hidden' });
    }
  };

  const [avatarSeed, changeAvatarSeed] = useState(
    user.avatarSeed
      ? user.avatarSeed
      : Math.random().toString(36).substring(2, 6)
  );

  function changeIcon() {
    const newAvatarSeed = Math.random().toString(36).substring(2, 6);
    changeAvatarSeed(newAvatarSeed);
  }

  const redirect = () => {
    api
      .get(`/check?room=${roomCode}`)
      .then(() => {
        proceedTo('/saguao');
      })
      .catch(() => {
        alert('Parece que a sala não existe mais. Por favor tente outra.');
        proceedTo('/home');
      });
  };

  function checkNameInput() {
    const userName = inputRef.current.value.trim();
    if (userName.length > 2 && userName.length <= 16) {
      api
        .get(`/nickname?room=${roomCode}&nickname=${userName}`)
        .then(() => {
          return storeInfo();
        })
        .catch(() => {
          if (oldNickname !== userName) {
            return setInputErrorMsg({
              msg: 'O nome inserido já está em uso.',
              visibility: 'visible',
            });
          }
          return storeInfo();
        });
      return;
    }
    if (userName.length < 3) {
      setInputErrorMsg({
        msg: 'O nome deve ter no mínimo 3 caracteres.',
        visibility: 'visible',
      });
      return;
    }
    if (userName.length === 0) {
      setInputErrorMsg({
        msg: 'Você deve inserir um nome primeiro!',
        visibility: 'visible',
      });
    }
  }

  const proceedTo = (nextURL) => {
    setRoom((previous) => ({
      ...previous,
      URL: nextURL,
    }));
    navigate(nextURL);
  };

  const storeInfo = () => {
    const userName = inputRef.current.value.trim();
    const newUserData = {
      roomCode: roomCode,
      nickname: userName,
      avatarSeed: avatarSeed,
    };
    window.localStorage.setItem('userData', JSON.stringify(newUserData));
    setUser((previous) => ({
      ...previous,
      nickname: userName,
      avatarSeed: avatarSeed,
    }));
    redirect();
  };

  ////Listener para remover foco do <input> quando o usuário aperta Enter/////////////////////////

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown);
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur();
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const leaveMatch = () => {
    const nextURL = '/home';
    setRoom((previous) => ({
      ...previous,
      code: undefined,
      URL: nextURL,
    }));
    navigate(nextURL);
  };

  return (
    <Background>
      <div className="WholeScreen">
        <Header goBackArrow={leaveMatch} logo />

        <div className="ChooseAvatarSection">
          <div className="NicknameDiv">
            <div className="NameAndCharacterCount">
              <p className="Title">Nome:</p>
              <p className={characterCount > 16 ? 'Title Red' : 'Title'}>
                {characterCount}
              </p>
            </div>
            <input
              value={inputText}
              ref={inputRef}
              id="nickname"
              className="NicknameInput"
              placeholder="Digite seu nome"
              onChange={updateUserName}
            />
          </div>

          <div
            className="UserNameWarningSpace"
            style={{
              visibility:
                inputErrorMsg.visibility === 'visible' ? 'visible' : 'hidden',
            }}>
            <AlertTriangle width="20px" height="20px" color="red" />
            <p className="UserNameWarning">{inputErrorMsg.msg}</p>
          </div>

          <div className="AvatarDiv">
            <p className="AvatarTitle">Escolha o seu Avatar:</p>

            <div className="AvatarIconSection">
              <div className="SideIconSpace" />

              <div className="AvatarIcon">
                <Avatar seed={avatarSeed} />
              </div>

              <div className="SideIconSpace">
                <RotateCcw onClick={changeIcon} width="100%" height="100%" />
              </div>
            </div>
          </div>

          <div className="ButtonDiv">
            <Button onClick={checkNameInput}>{buttonText}</Button>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default ChooseAvatar;
