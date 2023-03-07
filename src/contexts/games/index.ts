import BangBang from '../../assets/game-covers/bang-bang.png';
import BichoBebe from '../../assets/game-covers/bicho-bebe.png';
import Buzz from '../../assets/game-covers/buzz.png';
import CSComposto from '../../assets/game-covers/cs-composto.png';
//import DireitaEsquerda from '../../assets/game-covers/direita-esquerda.png';  //removido temporariamente
import EuNunca from '../../assets/game-covers/eu-nunca.png';
import Medusa from '../../assets/game-covers/medusa.png';
import OEscolhido from '../../assets/game-covers/o-escolhido.png';
import PensaRapido from '../../assets/game-covers/pensa-rapido.png';
import Vrum from '../../assets/game-covers/vrum.png';
import Titanic from '../../assets/game-covers/titanic.png';

export type Game = {
  id: number;
  text: string;
  src: string;
  backgroundColor: string;
};

const games: Game[] = [
  //TODO incluir o jogo Direita-Esquerda (aqui e no backend) quando a mecânica dos dados tiver sido implementada
  {
    id: 0,
    text: 'Bang Bang',
    src: BangBang,
    backgroundColor: '#800080',
  },
  {
    id: 1,
    text: 'Bicho Bebe',
    src: BichoBebe,
    backgroundColor: '#403A55',
  },
  {
    id: 2,
    text: 'Buzz',
    src: Buzz,
    backgroundColor: '#403A55',
  },
  {
    id: 3,
    text: 'C, S, Composto',
    src: CSComposto,
    backgroundColor: '#403A55',
  },
  {
    id: 4,
    text: 'Eu Nunca',
    src: EuNunca,
    backgroundColor: '#8877DF',
  },
  {
    id: 5,
    text: 'Medusa',
    src: Medusa,
    backgroundColor: '#403A55',
  },
  {
    id: 6,
    text: 'O Escolhido',
    src: OEscolhido,
    backgroundColor: '#800080',
  },
  {
    id: 7,
    text: 'Pensa Rápido',
    src: PensaRapido,
    backgroundColor: '#403A55',
  },
  {
    id: 8,
    text: 'Vrum',
    src: Vrum,
    backgroundColor: '#403A55',
  },
  {
    id: 9,
    text: 'Titanic',
    src: Titanic,
    backgroundColor: '#800080',
  }
];

export default games;
