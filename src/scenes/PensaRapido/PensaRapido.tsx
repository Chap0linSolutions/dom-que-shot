import React from 'react';
import coverImg from '../../assets/game-covers/pensa-rapido.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function PensaRapido() {
  const title = 'Pensa Rápido';
  const description = (
    <>
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      O jogador da vez escolhe alguém para responder uma pergunta de
      conhecimentos gerais ou de algum tema que o grupo decidir. O escolhido
      então começa a beber, ouve a pergunta e só pode parar quando souber a
      resposta &#40;ou acabar o copo&#41;.
      <br />
      <br />
      Caso o interrogado erre ou não saiba a resposta, o jogador da vez deve
      responder quando o escolhido terminar de beber. Se nem ele souber a
      resposta, também deve virar uma dose.
    </>
  );
  const hint = (
    <>
      PREPARADOS??
      <br />
      <br />
      O jogador da vez inicia indicando uma pessoa e fazendo uma pergunta.
      <br />
      <br />
      Finalizando a rodada, clique no botão abaixo para informar quem bebeu.
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
