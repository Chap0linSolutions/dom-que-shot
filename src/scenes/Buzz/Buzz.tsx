import React from 'react';
import coverImg from '../../assets/game-covers/buzz.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function Buzz() {
  const title = 'Buzz';
  const description = (
    <>
      O jogador da vez inicia a contagem com o número 1. O próximo na roda fala 2
      e assim por diante. A contagem segue em sentido horário até alguém
      cometer o erro fatal: não dizer "Fizz" ou "Buzz" para determinados números.
      Esses números são:
      <ul>
        <li style={{ color: 'black' }}>
          Os múltiplos de 3. Neste caso, o jogador deve dizer "FIZZ" em vez do número;
        </li>
        <li style={{ color: 'black' }}>
          Os múltiplos de 5. Neste caso, o jogador deve dizer "BUZZ" em vez do número;
        </li>
      </ul>
      E claro, se o número for múltipo de 3 e 5 ao mesmo tempo, o jogador deve falar "FIZZ BUZZ".
      O primeiro a errar deve virar uma dose!
    </>
  );
  const hint = (
    <>
      PREPARADOS??
      <br />
      <br />
      O jogador da vez pode iniciar a contagem, e o resto continua em sentido horário.
      <br />
      <br />
      Finalizando a rodada com o primeiro que errar, clique no botão abaixo para
      informar quem bebeu.
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
