import React from 'react';
import coverImg from '../../assets/game-covers/vrum.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function Vrum() {
  const title = 'Vrum';
  const description = (
    <>
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      Os jogadores devem se organizar em uma roda. Começando em sentido horário,
      cada participante vai ter que dizer uma dessas três opções quando chegar a
      sua vez:
      <br />
      <br />
      1 - Falar VRUM &#40;imitando o barulho de um motor de carro&#41;: O jogo
      segue normal, sendo a vez do próximo jogador.
      <br />
      <br />
      2 - Falar IHHH &#40;imitando o barulho de um freio de carro&#41;: O
      sentido da roda inverte, e o próximo jogador passa a ser o que acabou de
      jogar.
      <br />
      <br />
      3 - Falar PLOFT &#40;imitando o barulho de uma lombada&#41;: O sentido da
      roda se mantém, mas o jogador seguinte é pulado.
      <br />
      <br />O resultado acaba sendo muito engraçado. Quem errar a vez, ou errar
      a palavra, tem de virar uma dose.
    </>
  );
  const hint = (
    <>
      PREPARADOS??
      <br />
      <br />
      O jogador da vez inicia falando a primeira palavra (VRUM, IHHH ou PLOFT).
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
