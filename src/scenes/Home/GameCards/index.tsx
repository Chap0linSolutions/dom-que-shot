import euNunca from '../../../assets/game-covers/eu-nunca.png';
import Bang from '../../../assets/game-covers/bang-bang.png';
import Vrum from '../../../assets/game-covers/vrum.png';
import OEscolhido from '../../../assets/game-covers/o-escolhido.png';
import Medusa from '../../../assets/game-covers/medusa.png';
import BichoBebe from '../../../assets/game-covers/bicho-bebe.png';
import Buzz from '../../../assets/game-covers/buzz.png';
import PensaRapido from '../../../assets/game-covers/pensa-rapido.png';
import CSComposto from '../../../assets/game-covers/cs-composto.png';

type GameCardsProps = {
  image: string;
  title: string;
  id: number;
  color: string;
  description: string | JSX.Element;
};

enum GameTypes {
  Simple = '#403A55',
  Dynamic = '#8877DF',
  Round = '#800080',
}

export const gameCards: GameCardsProps[] = [
  {
    image: euNunca,
    title: 'Eu nunca...',
    id: 1,
    color: GameTypes.Dynamic,
    description: `É o "Eu Nunca" de sempre. O jogador da vez fala uma frase
    começada por "Eu Nunca" e quem já tiver feito o que ele
    falar deve virar uma dose. Aparecem sugestões para os pouco criativos.`,
  },
  {
    image: Vrum,
    title: 'Vrum',
    id: 3,
    color: GameTypes.Simple,
    description: `Cada jogador na sua vez vai falar Vrum, IHHH ou ploft (é pra imitar um carro
    mesmo). 'Vrum' passa a vez para o próximo normalmente, 'IHHH' inverte o sentido
    da roda e 'Ploft' pula um jogador. Quem falar fora da vez deve virar uma dose.`,
  },
  {
    image: Bang,
    title: 'Bang!',
    id: 2,
    color: GameTypes.Round,
    description: `3, 2, 1, BANG! Ao final da contagem regressiva, todos os jogadores verão
    um botão aparecer na tela de seus celulares. O último a conseguir apertar
    deve virar uma dose.`,
  },
  {
    image: Medusa,
    title: 'Medusa',
    id: 4,
    color: GameTypes.Simple,
    description: `Todos abaixam a cabeça e assim ficam até o jogador da vez falar "Já". Aí todos
    erguem a cabeça e escolhem alguém da roda para encarar. Se dois jogadores se
    escolherem, aquele que falar "Medusa" por último tem de virar uma dose.`,
  },
  {
    image: OEscolhido,
    title: 'O Escolhido',
    id: 5,
    color: GameTypes.Round,
    description: `É um jogo de votação clássico. Vote em quem você acha que deve beber, e o mais
    votado vira uma dose. Se quiser votar em si mesmo está liberado.`,
  },
  {
    image: CSComposto,
    title: 'C, S, Composto',
    id: 4,
    color: GameTypes.Simple,
    description: `Começando pelo jogador da vez, cada um vai falando uma palavra. A palavra tem que
    ser relacionada com a anterior e NÃO pode começar com C, S ou ser composta (ter espaços ou hífens).
    O primeiro que quebrar alguma destas regras deve virar uma dose.`,
  },
  {
    image: Buzz,
    title: 'Buzz',
    id: 6,
    color: GameTypes.Simple,
    description: (
      <>
        É um jogo de contagem coletiva - o jogador da vez começa com '1' e cada
        um na sua vez vai dizendo o próximo número &#40;2, 3, 4...&#41;. <br />
        <br />
        Mas atenção! Se o número for múltiplo de 7 ou tiver 7 no meio - por
        exemplo, 14 ou 17 - o jogador deve falar 'BUZZ' no lugar. Quem falar
        errado deve virar uma dose.
      </>
    ),
  },
  {
    image: PensaRapido,
    title: 'Pensa Rápido',
    id: 7,
    color: GameTypes.Simple,
    description: `O jogador da vez escolhe alguém para responder uma pergunta. Essa pessoa então
    ouve a pergunta e começa a beber, só podendo parar quando souber a resposta. Se o autor da pergunta
    não souber a resposta, ele próprio tem de virar uma dose.`,
  },
  {
    image: BichoBebe,
    title: 'Bicho Bebe',
    id: 8,
    color: GameTypes.Simple,
    description: (
      <>
        Cada jogador vai pensar em um animal que o represente e falar em voz
        alta. O jogador da vez, então, vai escolher um animal - digamos,
        cachorro - e perguntar:
        <br />
        <br />
        -Cachorro bebe?
        <br />
        <br />O jogador que escolheu o cachorro responde:
        <br />
        <br />
        -Cachorro não bebe, quem bebe é o tatu!
        <br />
        <br />O jogador que escolher o tatu responde da mesma maneira,
        perguntando se outro animal bebe, e assim o jogo segue até alguém errar
        &#40;falando um animal que ninguém escolheu ou respondendo por outro
        bicho&#41;. Quem errar vira uma dose.{' '}
      </>
    ),
  },
];
