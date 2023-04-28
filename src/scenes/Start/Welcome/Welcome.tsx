import { useState } from 'react';
import { Pages } from '../Start';
import { Menu } from 'react-feather';
import { Room } from '../../../contexts/GlobalContextProvider';
import logo from '../../../assets/logo-darker.png';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import {
  MainLogo,
  WelcomePage,
  Content,
  BurguerDiv,
  Options,
  Option,
} from './Welcome.style';

interface WelcomeProps {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  setRoom: React.Dispatch<React.SetStateAction<Room>>;
  navigate: (value: string) => void;
}

const colors = {
  unselected: '#CCCCCC',
  selected: '#8877DF',
};

export default function Welcome({ navigate, setRoom, setPage }: WelcomeProps) {
  const [burguerColor, setBurguerColor] = useState<string>(colors.unselected);
  const [options, setOptions] = useState<boolean>(() => false);

  const goHome = () => {
    const nextURL = '/Home';
    setRoom((previous) => ({
      ...previous,
      URL: nextURL,
    }));
    navigate(nextURL);
  };

  const toggleOptions = () => {
    setOptions((previous) => !previous);
    setBurguerColor((previous) =>
      previous === colors.unselected ? colors.selected : colors.unselected
    );
  };

  return (
    <Background>
      <WelcomePage>
        <BurguerDiv>
          <Menu
            data-testid="burguer-menu"
            width={30}
            height={30}
            onClick={toggleOptions}
            color={burguerColor}
          />
          {options && (
            <Options>
              <Option onClick={() => setPage(Pages.AboutUs)}>Sobre nós</Option>
              <Option onClick={() => setPage(Pages.Contact)}>Contato</Option>
              <Option onClick={() => setPage(Pages.PrivacyPolicy)}>
                Política de Privacidade
              </Option>
            </Options>
          )}
        </BurguerDiv>
        <Content>
          <MainLogo src={logo} alt="Logo" />
          <Button onClick={goHome}>Entrar</Button>
        </Content>
      </WelcomePage>
    </Background>
  );
}
