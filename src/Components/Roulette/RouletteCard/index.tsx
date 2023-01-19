import React from 'react';
import './RouletteCard.css';

interface RouletteCardProps {
  text: string;
  src: string;
}

export default function RouletteCard({ text, src }: RouletteCardProps) {
  return (
    <div>
      <img className="RouletteCardImage" src={src} alt={text} />
    </div>
  );
}
