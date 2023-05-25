import { useState, useMemo, useEffect } from 'react';
import { Politica } from '../../../scenes/Start/PrivacyPolicy';
import { useGlobalContext } from '../../../contexts/GlobalContextProvider';
import Popup from '../index';
import {
  Button,
  ButtonTwo,
  ButtonThree,
  Buttons,
  Text,
  Content,
} from './Cookie.style';

const maxAgeInSeconds = 60 * 60 * 24 * 30;

export default function Cookies() {
  const { room } = useGlobalContext();
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [content, setContent] = useState<boolean>(true);

  const agree = () => {
    setPopupVisibility(false);
    saveCookieConsent();
    window.localStorage.setItem('cookies', 'doNotShowAnymore');
  };

  const refuse = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const showPrivacyPolicy = () => {
    setContent(false);
  };

  const saveCookieConsent = () => {
    document.cookie = `DomQueShotCookies=true; path=/; max-age=${maxAgeInSeconds}`;
    if (document.cookie) {
      console.log('Configuração de cookies bem-sucedida.');

      return checkCookieConsent();
    }
    console.log('Erro na configuração do cookie.');
    return;
  };

  const checkCookieConsent = () => {
    const doNotShow = window.localStorage.getItem('cookies');
    if (typeof doNotShow !== 'string') {
      const checkCookie = document.cookie.indexOf('DomQueShotCookies=true');
      if (checkCookie > -1) return;
      console.log('O usuário ainda não permitiu o uso de cookies.');
      setPopupVisibility(true);
    }
  };

  useEffect(() => {
    if (room.URL !== '/') checkCookieConsent();
  }, [room]);

  useEffect(() => {
    if (!popupVisibility) {
      setContent(true);
    }
  }, [popupVisibility]);

  const description = useMemo(() => {
    if (content) {
      return (
        <Content>
          <Text>Nós usamos cookies para prover nosso jogo. Tudo bem?</Text>
          <Buttons>
            <Button onClick={agree}>Sim!</Button>
            <ButtonTwo onClick={showPrivacyPolicy}>
              Política de privacidade
            </ButtonTwo>
          </Buttons>
        </Content>
      );
    }
    return (
      <Content>
        <Politica />
        <ButtonThree onClick={agree}>Concordar e fechar</ButtonThree>
        <ButtonThree onClick={refuse}>Recusar e sair do jogo</ButtonThree>
      </Content>
    );
  }, [content]);

  return (
    <Popup type="cookies" description={description} show={popupVisibility} />
  );
}
