import React, { useEffect, useState } from 'react';
import PlaceholderImage from '../../Placeholder/Image';
import './RouletteCard.css';

interface RouletteCardProps {
  text: string;
  src: string;
}

export default function RouletteCard({ text, src }: RouletteCardProps) {
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
    <div>
      <img
        style={loaded === true ? {} : { display: 'none' }}
        className="RouletteCardImage"
        src={src}
        alt={text}
        onLoad={finishedLoading}
      />

      <PlaceholderImage
        loaded={loaded}
        width={placeholderSize}
        height={placeholderSize}
      />
    </div>
  );
}
