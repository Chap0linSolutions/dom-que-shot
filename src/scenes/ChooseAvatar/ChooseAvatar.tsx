import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, AlertTriangle } from 'react-feather';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Avatar from '../../components/Avatar';
import './ChooseAvatar.css';
import api from '../../services/api';

function ChooseAvatar() {
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const buttonText = userData.option
    ? userData.option === 'join'
      ? 'Entrar'
      : 'Criar sala'
    : 'Atualizar';
  const roomCode = userData.roomCode;

  const [userName, setUserName] = useState('');
  const [inputErrorMsg, setInputErrorMsg] = useState({
    msg: '',
    visibility: 'hidden',
  });

  const updateUserName = (e) => {
    const newUserName = e.target.value.trim();
    if (newUserName.length !== 0) {
      setUserName(newUserName);
      setInputErrorMsg({ msg: '', visibility: 'hidden' });
      return;
    }
  };

  const [avatarSeed, changeAvatarSeed] = useState(
    Math.random().toString(36).substring(2, 6)
  );

  function changeIcon() {
    const newAvatarSeed = Math.random().toString(36).substring(2, 6);
    console.log('seed gerada: ' + newAvatarSeed);
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

  function saveOnLocalStorage() {
    if (userName.length > 16) {
      setInputErrorMsg({
        msg: 'O nome deve ter no máximo 16 caracteres.',
        visibility: 'visible',
      });
      return;
    }
    if (userName.length > 2) {
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

  return (
    <Background>
      <div className="WholeScreen">
        <Header goBackArrow logo />

        <div className="ChooseAvatarSection">
          <div className="NicknameDiv">
            <p className="NicknameTitle">Nome:</p>

            <input
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
            <Button>
              <div onClick={saveOnLocalStorage}>{buttonText}</div>
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default ChooseAvatar;
