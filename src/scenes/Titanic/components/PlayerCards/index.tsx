import Card from './Card';
import { Results } from '../../Finish';
import { CardSection, TitanicPlayers } from './PlayerCards.style';

interface PlayerCardsProps {
  titanicPlayers: Results[] | undefined;
  icebergPlayer: Results | undefined;
}

export default function PlayerCards({
  titanicPlayers,
  icebergPlayer,
}: PlayerCardsProps) {
  const hasIcebergs = icebergPlayer && icebergPlayer.hasAppeared;
  const whoFell = titanicPlayers.filter((p) => p.shipPlacement[0] === -1);
  const whoPlayed = titanicPlayers.filter((p) => p.shipPlacement.length > 1);
  const survivors = whoPlayed.filter((p) => p.hits === 0);

  let icebergStatus = icebergPlayer ? icebergPlayer.shipPlacement[0] : 0;
  if (whoFell.length === titanicPlayers.length) {
    icebergStatus = -200;
  } else if (
    survivors.length > 0 &&
    survivors.length === whoPlayed.length &&
    icebergStatus !== -100
  ) {
    icebergStatus = -300; //-300 = o jogador da vez errou todo mundo
  }

  const icebergPlayerCard = hasIcebergs ? (
    <Card
      nickname={icebergPlayer.nickname}
      avatarSeed={icebergPlayer.avatarSeed}
      titanic={false}
      hits={icebergPlayer.hits}
      status={icebergStatus}
    />
  ) : null;

  const titanicPlayerCards = titanicPlayers
    .filter((p) => p.hasAppeared)
    .reverse();

  return (
    <CardSection>
      <TitanicPlayers>
        {icebergPlayerCard}
        {titanicPlayerCards.map((player) => (
          <Card
            nickname={player.nickname}
            avatarSeed={player.avatarSeed}
            titanic={true}
            hits={player.hits}
            status={player.shipPlacement[0]}
            icebergsHaveAppeared={hasIcebergs}
          />
        ))}
      </TitanicPlayers>
    </CardSection>
  );
}
