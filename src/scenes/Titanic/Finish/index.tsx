import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';

interface CoverProps {
  turnVisibility: boolean;
  roulettePage: () => void;
}

export default function FinishPage({
  roulettePage,
  turnVisibility,
}: CoverProps) {
  
  const button = (turnVisibility)
  ? <Button onClick={roulettePage}>Continuar</Button>
  :<></>;

  return (
    <Background>
      <Header logo/>
      <div>Tela de Resultados!</div>
      {button}
    </Background>
  );  
}
