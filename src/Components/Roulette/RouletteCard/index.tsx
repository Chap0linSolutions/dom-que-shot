import React, { useEffect, useState } from 'react';
import PlaceholderImage from '../../Placeholder/Image';
import './RouletteCard.css';

interface RouletteCardProps {
  width?: number;
  height?: number;
  text: string;
  src: string;
}

export default function RouletteCard({
  width,
  height,
  text,
  src,
}: RouletteCardProps) {
  //Placeholder /////////////////////////////////////////////////////////////////////////////
  const [loaded, setLoaded] = useState<boolean>(false);

  const finishedLoading = () => {
    setLoaded(true);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  const cardWidth = width ? `${width}px` : '140px';
  const cardHeight = height ? `${height}px` : '140px';

  return (
    <div>
      <img
        style={loaded === true ? {} : { display: 'none' }}
        className="RouletteCardImage"
        width={cardWidth}
        height={cardHeight}
        src={src}
        alt={text}
        onLoad={finishedLoading}
      />

      <PlaceholderImage
        loaded={loaded}
        width={width ? width : 140}
        height={height ? height : 140}
      />
    </div>
  );
}
