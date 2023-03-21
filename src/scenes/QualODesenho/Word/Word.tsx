import { useState } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import beer from '../../../assets/beer.png';
import AwaitingBanner from '../../../components/AwaitingBanner';
import Popup from '../../../components/Popup';
import Button from '../../../components/Button';
import drawingIcon from '../assets/drawing-icon.svg';
import {
  Words,
  Word,
  WordName,
  Title,
  Awaiting,
  Content,
  WordDiv,
  DrawingIconDiv,
  DrawingIcon,
} from './Word.style';


interface WordProps {
  title: string;
  suggestions: string[];
  description: string | JSX.Element;
  setWord: (value: string) => void;
  turnVisibility: boolean;
}

export default function WordPage({
  title,
  description,
  suggestions,
  setWord,
  turnVisibility,
}: WordProps) {
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string>(undefined);

  const selectWord = (name: string) => {
    if (name !== selectedWord) {
      return setSelectedWord(name);
    }
    setSelectedWord(undefined);
  };

  const setStyle = (name: string, color: string) => {
    return {
      background: color,
      border: name === selectedWord ? '5px solid #FF00B8' : undefined,
    };
  };

  const words: { name: string; color: string }[] = [
    { name: suggestions[0], color: '#3D1365' },
    { name: suggestions[1], color: '#3C1A7D' },
  ];

  if (turnVisibility === true) {
    return (
      <Background noImage>
        <Popup
          title={title}
          description={description}
          show={popupVisibility}
          exit={() => setPopupVisibility(false)}
          comesFromTop
        />
        <Header infoPage={() => setPopupVisibility(true)} />
        <WordDiv>
          <Content>
            <DrawingIconDiv><DrawingIcon src={drawingIcon} /></DrawingIconDiv>
            <Title>Escolha uma palavra para começar:</Title>
            <Words>
              {words.map((word) => {
                return (
                  <Word
                    onClick={() => selectWord(word.name)}
                    key={word.name}
                    style={setStyle(word.name, word.color)}>
                    <WordName>{word.name}</WordName>
                  </Word>
                );
              })}
            </Words>
          </Content>
          <Button
            staysOnBottom
            onClick={() => setWord(selectedWord)}
            isDisabled={selectedWord ? false : true}>
            Começar
          </Button>
        </WordDiv>
      </Background>
    );
  } else {

    return (
      <Background>
        <Popup
          title={title}
          description={description}
          show={popupVisibility}
          exit={() => setPopupVisibility(false)}
          comesFromTop
        />
        <Header
          infoPage={() => {
            setPopupVisibility(true);
          }}
        />
        <Awaiting>
          <AwaitingBanner
            icon={beer}
            firstText="Aguardando o jogador da vez escolher logo uma palavra pra desenhar..."
            secondText="são só 2 opções mano, tá demorando por que"
            background="#3D1365"
            border="4px solid #800080"
          />
        </Awaiting>
      </Background>
    );
  }
}
