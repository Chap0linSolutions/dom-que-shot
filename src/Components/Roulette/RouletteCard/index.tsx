import React, { useState } from 'react';
import PlaceholderImage from '../../Placeholder/Image';
import styled from '@emotion/styled';

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

  const imageStyle = {
    width: width ? `${width}px` : '140px',
    height: height ? `${height}px` : '140px',
    display: loaded === true ? undefined : 'none',
  };

  return (
    <div>
      <Image style={imageStyle} src={src} alt={text} onLoad={finishedLoading} />

      <PlaceholderImage
        loaded={loaded}
        width={width ? width : 140}
        height={height ? height : 140}
      />
    </div>
  );
}

const Image = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: scale-down;
`;
