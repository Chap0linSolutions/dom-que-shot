import React from 'react';
import coverImg from '../../assets/game-covers/buzz.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function Buzz() {
  const title = 'Buzz';
  const description = (
    <>
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      Um jogador inicia a contagem com o número 1. O próximo na roda continua
      com o 2, o seguinte com o 3 e assim por diante. A contagem continua até
      que alguém cometa o erro fatal: Não dizer "Buzz" para determinados
      números.
      <br />
      Os números em questão são:
      <ul>
        <li style={{ color: 'black' }}>
          Os que contém um 7 &#40;7, 17, 27...&#41;
        </li>
        <li style={{ color: 'black' }}>
          Múltiplos de 7 &#40;7, 14, 21...&#41;
        </li>
        <li style={{ color: 'black' }}>
          Os que tiverem dígitos iguais &#40;11, 22, 33...&#41;
        </li>
      </ul>
      Quem errar o Buzz deve virar uma dose!
    </>
  );
  const hint = (
    <>
      PREPARADOS??
      <br />
      <br />
      O jogador da vez inicia a contagem.
      <br />
      <br />
      Finalizando a rodada com o primeiro que errar, clique no botão abaixo para informar quem bebeu.
    </>
  );

  return (
    <SimpleCardGame
      title={title}
      description={description}
      hint={hint}
      coverImg={coverImg}
    />
  );
}
