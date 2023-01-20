import React from 'react';
import coverImg from '../../assets/game-covers/direita-esquerda.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';
import D1 from './Dice/1.png';
import D2 from './Dice/2.png';
import D3 from './Dice/3.png';
import D4 from './Dice/4.png';
import D5 from './Dice/5.png';
import D6 from './Dice/6.png';
import './DireitaEsquerda.css';

export default function DireitaEsquerda() {
  const title = 'Direita-Esquerda';
  const description = (
    <>
      Este jogo deve ser jogado com dados. O número que cair corresponde a um
      comando, conforme a seguir:
      <br />
      <br />
      <div className="DireitaEsquerdaDiceRules">
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D1} />
          Pessoa &agrave; sua esquerda bebe
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D2} />
          Pessoa &agrave; sua direita bebe
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D3} />
          Você bebe
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D4} />
          Você aponta quem deve beber
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D5} />
          Todos bebem
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D6} />
          Você bebe duas vezes
        </div>
      </div>
    </>
  );

  return (
    <SimpleCardGame
      title={title}
      description={description}
      coverImg={coverImg} hint={''}    />
  );
}
