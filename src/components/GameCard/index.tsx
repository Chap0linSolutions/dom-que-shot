import { HelpCircle } from 'react-feather';
import {
  CardBackground,
  CardImage,
  CardTitle,
  InfoButton,
  InfoText
} from './GameCard.style';

interface GameCardProps {
  onClick?: () => void;
  onInfoClick?: () => void;
  id: string | number;
  title: string;
  image: string;
  backgroundColor: string;
}

export default function GameCard({
  onClick,
  onInfoClick,
  id,
  title,
  image,
  backgroundColor,
}: GameCardProps) {
  return (
    <CardBackground
      key={id}
      style={{ background: backgroundColor }}>
      <InfoButton onClick={onInfoClick}>
        <HelpCircle width='18px'color='#170c32'/>
      </InfoButton>
      <CardImage onClick={onClick} src={image} alt={title} />
      <CardTitle>{title}</CardTitle>
    </CardBackground>
  );
}
