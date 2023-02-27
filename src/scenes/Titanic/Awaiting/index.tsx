import Background from '../../../components/Background';
import Header from '../../../components/Header';

interface AwaitingProps {
  msTimeLeft: number;
}

export default function AwaitingResults({
  msTimeLeft,
}: AwaitingProps) {
  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
      <div>
        Aguardando resultados!
      </div>
    </Background>
  );
}
