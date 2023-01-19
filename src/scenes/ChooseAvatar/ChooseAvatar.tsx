import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, AlertTriangle } from 'react-feather';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Avatar from '../../components/Avatar';
import PingTracker from '../../components/Debug/PingTracker';
import api from '../../services/api';
import './ChooseAvatar.css';

function ChooseAvatar() {
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const location = useLocation();
  const { option, roomCode } = location.state;
  const oldNickname = userData.nickname;
  const buttonText =
    option === 'join'
      ? 'Entrar'
      : option === 'create'
      ? 'Criar sala'
      : 'Atualizar';

  const [inputText, setInputText] = useState(oldNickname ? oldNickname : '');
  const [userName, setUserName] = useState('');
  const [inputErrorMsg, setInputErrorMsg] = useState({
    msg: '',
    visibility: 'hidden',
  });

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance(true);

  useEffect(() => {
    socket.connect();
    console.log(socket);
    socket.addEventListener('room-is-moving-to', (destination) => {
      if (destination === '/SelectNextGame') {
        console.log(`Movendo a sala para ${destination}.`);
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

  useEffect(() => {
    if (userData.nickname) {
      setUserName(userData.nickname);
    }
  }, []);

  const updateUserName = (e) => {
    const input = e.target.value;
    setInputText(input);
    if (input.trim().length !== 0) {
      setUserName(input);
      setInputErrorMsg({ msg: '', visibility: 'hidden' });
      return;
    }
  };

  const [avatarSeed, changeAvatarSeed] = useState(
    userData.avatarSeed
      ? userData.avatarSeed
      : Math.random().toString(36).substring(2, 6)
  );

  function changeIcon() {
    const newAvatarSeed = Math.random().toString(36).substring(2, 6);
    changeAvatarSeed(newAvatarSeed);
  }

  const redirect = () => {
    api
      .get(`/roomCode/${roomCode}`)
      .then(() => {
        navigate('/Lobby');
      })
      .catch(() => {
        // TODO: add error message handling to inform user room doesn't exist (anymore)
        navigate('/Home');
        return;
      });
  };

  function checkNameInput() {
    if (userName.length > 2 && userName.length < 16) {
      api
        .get(`/nicknameCheck/${roomCode}/${userName}`)
        .then(() => {
          return saveOnLocalStorage();
        })
        .catch(() => {
          if (oldNickname !== userName) {
            return setInputErrorMsg({
              msg: 'O nome inserido já está em uso.',
              visibility: 'visible',
            });
          }
          return saveOnLocalStorage();
        });
      return;
    }
    if (userName.length > 16) {
      setInputErrorMsg({
        msg: 'O nome deve ter no máximo 16 caracteres.',
        visibility: 'visible',
      });
      return;
    }
    if (userName.length > 0) {
      setInputErrorMsg({
        msg: 'O nome deve ter no mínimo 3 caracteres.',
        visibility: 'visible',
      });
      return;
    }
    setInputErrorMsg({
      msg: 'Você deve inserir um nome primeiro!',
      visibility: 'visible',
    });
  }

  const saveOnLocalStorage = () => {
    const newUserData = {
      roomCode: roomCode,
      nickname: userName,
      avatarSeed: avatarSeed,
    };
    window.localStorage.setItem('userData', JSON.stringify(newUserData));
    console.log(
      'Dados salvos em LocalStorage: código da sala (' +
        roomCode +
        '), nome (' +
        userName +
        ') e seed do avatar (' +
        avatarSeed +
        ').'
    );
    redirect();
  };

  ////Listener para remover foco do <input> quando o usuário aperta Enter/////////////////////////

  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown);
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === 'Enter') {
      ref.current.blur();
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const leaveMatch = () => {
    socket && socket.disconnect();
    navigate('/Home');
  };

  return (
    <Background>
      <div className="WholeScreen">
        <Header goBackArrow={leaveMatch} logo />

        <div className="ChooseAvatarSection">
          <div className="NicknameDiv">
            <p className="NicknameTitle">Nome:</p>

            <input
              value={inputText}
              ref={ref}
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
      <PingTracker />
    </Background>
  );
}

export default ChooseAvatar;
