import React, { useState } from 'react';
import './ImageSlider.css';

type Card = {
  image: string;
  title: string;
  id: number;
  color: string;
  description: string | JSX.Element;
};

type GameInformation = {
  title: string;
  description: string | JSX.Element;
};
interface ImageSliderProps {
  content: Card[];
  show: () => void;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInformation>>;
}

export default function ImageSlider({
  content,
  show,
  setGameInfo,
}: ImageSliderProps) {
  const updateInfoCard = (title, description) => {
    setGameInfo({ title: title, description: description });
    show();
  };

  return (
    <div className="slider">
      {content.map((slide, i) => (
        <div
          key={`${i}`}
          className="card"
          onClick={() => updateInfoCard(slide.title, slide.description)}
          style={{ background: slide.color }}>
          <img className="image" src={slide.image} alt="game" />
          <p className="title">{slide.title}</p>
        </div>
      ))}
    </div>
  );
}
