import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';

interface GameProps {
  finishPage: () => void;
  msTimeLeft: number;
}

export default function GamePage({
  finishPage,
  msTimeLeft,
}: GameProps) {

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
        <div>
          Tela do jogo em si!
        </div>
        <Button staysOnBottom onClick={finishPage}>
          Finalizar
        </Button>
    </Background>
  );
}
