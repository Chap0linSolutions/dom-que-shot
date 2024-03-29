import React, { useState, useEffect } from 'react';
import PlaceholderImage from '../../../components/Placeholder/Image';
import { Game } from '../../../contexts/games';
import { Card, Image, Slider, Title } from './ImageSlider.style';

type GameInformation = {
  title: string;
  description: string | JSX.Element;
};
interface ImageSliderProps {
  content: Game[];
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
    <Slider>
      {content.map((slide) => (
        <Card
          key={`${slide.id}`}
          onClick={() => updateInfoCard(slide.title, slide.description)}
          style={{ background: slide.backgroundColor }}>
          <Image
            style={loaded === true ? {} : { display: 'none' }}
            src={slide.src}
            alt={`${slide.title}`}
            onLoad={finishedLoading}
          />
          <PlaceholderImage
            width={placeholderSize}
            height={placeholderSize}
            loaded={loaded}
            borderRadius="10px"
          />
          <Title>{slide.title}</Title>
        </Card>
      ))}
    </Slider>
  );
}
