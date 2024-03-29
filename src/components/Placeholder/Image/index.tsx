import { Image, Text } from './Image.style';

interface ImageProps {
  width?: number;
  height?: number;
  borderRadius?: string;
  loaded: boolean;
}

export default function PlaceholderImage({
  width,
  height,
  borderRadius,
  loaded,
}: ImageProps) {
  const divStyle = {
    display: loaded === true ? 'none' : undefined,
    width: width ? width : undefined,
    height: height ? height : undefined,
    borderRadius: borderRadius ? borderRadius : undefined,
  };

  const textStyle = {
    fontSize: width && width > 110 ? '16px' : '14px',
  };

  return (
    <Image style={divStyle}>
      <Text style={textStyle}>carregando...</Text>
    </Image>
  );
}
