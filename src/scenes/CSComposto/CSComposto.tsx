import React from 'react';
import coverImg from '../../assets/game-covers/cs-composto.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function CSComposto() {
  const title = 'C, S, Composto';
  const description = (
    <>
      A regra geral do jogo é que estão proibidas palavras que comecem em C, S
      ou que sejam compostas &#40;que levem espaço ou hífen&#41;.
      <br />
      O jogador da vez inicia a partida falando qualquer palavra &#40;desde que
      não infrinja as regras iniciais&#41;, e em seguida, o próximo da roda
      continua o jogo dizendo uma palavra relacionada &agrave; anterior.
      <br />O primeiro que demorar a falar uma palavra ou infringir as regras
      acima deve virar uma dose!
    </>
  );
  const hint = (
    <>
      PREPARADOS??
      <br />
      <br />
      O jogador da vez inicia falando a primeira palavra.
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
