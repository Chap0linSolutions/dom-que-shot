import React, { useState, useEffect } from 'react';
import PlaceholderImage from '../../../components/Placeholder/Image';
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

  //Placeholder /////////////////////////////////////////////////////////////////////////////
  const [loaded, setLoaded] = useState<boolean>(false);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
  };

  const finishedLoading = () => {
    setLoaded(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const placeholderSize = innerHeight <= 720 ? 110 : 140;

  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="slider">
      {content.map((slide, i) => (
        <div
          key={`${i}`}
          className="card"
          onClick={() => updateInfoCard(slide.title, slide.description)}
          style={{ background: slide.color }}>
          <div className="HomeImageDiv">
            <img
              className="image"
              style={loaded === true ? {} : { display: 'none' }}
              src={slide.image}
              alt="game"
              onLoad={finishedLoading}
            />
            <PlaceholderImage
              width={placeholderSize}
              height={placeholderSize}
              loaded={loaded}
              borderRadius="10px"
            />
          </div>
          <p className="title">{slide.title}</p>
        </div>
      ))}
    </div>
  );
}
