import { CardBackground, CardImage, CardTitle } from './GameCard';

interface GameCardProps {
  onClick?: () => void;
  id: string | number;
  title: string;
  image: string;
  backgroundColor: string;
}

export default function GameCard({
  onClick,
  id,
  title,
  image,
  backgroundColor,
}: GameCardProps) {
  return (
    <CardBackground
      onClick={onClick}
      key={id}
      style={{ background: backgroundColor }}>
      <CardImage src={image} alt={title} />
      <CardTitle>{title}</CardTitle>
    </CardBackground>
  );
}
