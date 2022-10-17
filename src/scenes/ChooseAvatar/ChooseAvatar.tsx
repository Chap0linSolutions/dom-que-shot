import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { RotateCcw } from 'react-feather';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Avatar from '../../components/Avatar';
import './ChooseAvatar.css';

function ChooseAvatar() {
  const buttonText =
    useLocation().state.option === 'join' ? 'Entrar' : 'Criar sala';

  const [avatarSeed, changeAvatarSeed] = useState('dqxt');

  function changeIcon() {
    const newAvatarSeed = Math.random().toString(36).substring(2, 6);
    console.log('seed gerada: ' + newAvatarSeed);
    changeAvatarSeed(newAvatarSeed);
  }

  function saveOnLocalStorage() {
    window.localStorage.setItem('avatarSeed', avatarSeed);
    console.log('seed do avatar ' + avatarSeed + ' foi salva em LocalStorage');
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
        <Header goBackArrow />

        <div className="ChooseAvatarSection">
          <div className="NicknameDiv">
            <p className="NicknameTitle">Apelido:</p>

            <input
              ref={ref}
              id="nickname"
              className="NicknameInput"
              placeholder="Digite seu apelido"
            />
          </div>

          <div className="AvatarDiv">
            <p className="AvatarTitle">Escolha o seu Avatar:</p>

            <div className="AvatarIconSection">
              <div className="SideIconSpace" />

              <div className="AvatarIcon">
                <Avatar seed={avatarSeed}/>
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
