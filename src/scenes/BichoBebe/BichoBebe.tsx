import React from 'react';
import coverImg from '../../assets/game-covers/bicho-bebe.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function BichoBebe() {
  const title = 'Bicho Bebe';
  const description = (
    <>
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      Cada jogador escolhe um bicho. Com as escolhas feitas, o primeiro faz a
      pergunta:
      <br />
      Ex.: Tartaruga bebe? &#40;a pessoa que escolheu a tartaruga responde&#41;
      <br />
      Tartaruga não bebe, quem bebe é o cachorro &#40;a pessoa que escolheu o
      cachorro segue com a resposta e pergunta&#41;
      <br />
      Cachorro não bebe, quem bebe é o pombo &#40;e assim por diante&#41;
      <br />
      Quem errar, seja chamando um bicho que não existe ou não percebendo que
      foi chamado, tem de virar uma dose.
    </>
  );
  const hint = (
    <>
      PREPARADOS??
      <br />
      <br />
      Após todos informarem os bichos que escolheram, o jogador da vez inicia perguntando.
      <br />
      <br />
      Finalizando a rodada com o primeiro que errar, clique no botão abaixo para informar quem bebeu.
    </>
  )

  return (
    <SimpleCardGame
      title={title}
      description={description}
      hint={hint}
      coverImg={coverImg}
    />
  );
}
