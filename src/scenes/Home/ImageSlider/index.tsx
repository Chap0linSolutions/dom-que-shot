import React, { useState } from 'react';
import './ImageSlider.css';
import { Game } from '../../../contexts/games';

type GameInformation = {
  title: string;
  description: string | JSX.Element;
}
interface ImageSliderProps {
  content: Game[];
  show: () => void;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInformation>>;
}

export default function ImageSlider({
  content,
  show,
  setGameInfo
}: ImageSliderProps) {
  const updateInfoCard = (title, description) => {
    setGameInfo({title: title, description: description});
    show();
  };

  return (
    <div className="slider">
      {content.map((slide) => (
        <div
          key={`${slide.id}`}
          className="card"
          onClick={() => updateInfoCard(slide.text, slide.description)}
          style={{ background: slide.backgroundColor }}>
          <img className="image" src={slide.src} alt="game" />
          <p className="title">{slide.text}</p>
        </div>
      ))}
    </div>
  );
}
