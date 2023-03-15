import Avatar from '../../../../../components/Avatar';
import ship from '../../../assets/ship.png';
import shipWithIceberg from '../../../assets/iceberg-on-ship.png';
import iceberg from '../../../assets/iceberg.png';
import {
  IcebergCard,
  Nickname,
  TitanicCard,
  Titanic,
  AvatarDiv,
  Ships,
  Icebergs,
  Icon,
  AvatarAndName,
  IcebergCount,
  TitanicText,
  IcebergText,
} from './Card.style';

interface CardProps {
  avatarSeed: string;
  nickname: string;
  titanic: boolean;
  hits?: number;
  icebergsHaveAppeared?: boolean;
  status: number;
}

export default function Card({
  avatarSeed,
  nickname,
  titanic,
  hits,
  icebergsHaveAppeared,
  status,
}: CardProps) {
  const CardBackground = titanic ? TitanicCard : IcebergCard;

  let content;

  if (titanic) {
    switch (status) {
      case -100:
        content = (
          <TitanicText>
            Não jogou a
            <br />
            tempo (bebe)
          </TitanicText>
        );
        break;
      case -1:
        content = (
          <TitanicText>
            Caiu antes
            <br />
            de jogar
          </TitanicText>
        );
        break;
      default:
        content = null;
    }
  } else {
    switch (status) {
      case -300:
        content = (
          <IcebergText>
            Não acertou
            <br />
            ninguém (bebe)
          </IcebergText>
        );
        break;
      case -200:
        content = (
          <IcebergText>
            não restou
            <br />
            ninguém
          </IcebergText>
        );
        break;
      case -100:
        content = (
          <IcebergText>
            Não jogou a
            <br />
            tempo (bebe)
          </IcebergText>
        );
        break;
      default:
        content = (
          <>
            <IcebergCount>{hits}</IcebergCount>
            <Icon key={Math.random()} src={iceberg} />
          </>
        );
    }
  }

  const survivors = [];
  const sunken = [];

  for (let i = 0; i < 3; i++) {
    if (icebergsHaveAppeared && hits && i < hits) {
      sunken.push(<Titanic key={i * Math.random()} src={shipWithIceberg} />);
    } else if (status >= 0) {
      survivors.push(<Titanic key={i * Math.random()} src={ship} />);
    }
  }

  const cardContent = titanic ? (
    <>
      <Ships>
        {sunken}
        {survivors}
        {content}
      </Ships>
    </>
  ) : (
    <>
      <Icebergs>{content}</Icebergs>
    </>
  );

  return (
    <CardBackground>
      <AvatarAndName>
        <AvatarDiv>
          <Avatar seed={avatarSeed} />
        </AvatarDiv>
        <Nickname>{nickname}</Nickname>
      </AvatarAndName>
      {cardContent}
    </CardBackground>
  );
}
