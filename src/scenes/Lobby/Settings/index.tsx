import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Background from '../../../components/Background';
import GameCard from '../../../components/GameCard';
import { AlertTriangle } from 'react-feather';
import { Game } from '../../../contexts/games';
import {
  Card,
  Cards,
  LobbySettings,
  SelectionText,
  Title,
  WarningDiv,
  WarningText,
} from './Settings.style';

interface SettingsProps {
  gameList: Game[];
  mainPage: () => void;
  updateGameList: React.Dispatch<React.SetStateAction<Game[]>>;
}

export default function Settings({
  gameList,
  mainPage,
  updateGameList,
}: SettingsProps) {
  const updateSelection = (id) => {
    console.log(id);
    const newID = id < 1000 ? id + 1000 : id - 1000;

    updateGameList(
      gameList.map((game) =>
        game.id === id ? { ...game, id: newID } : { ...game }
      )
    );
  };

  const numberOfSelectedGames = gameList.filter(
    (game) => game.id < 1000
  ).length;

  const defineSelectionMessage = () => {
    switch (numberOfSelectedGames) {
      case 0:
        return `Nenhum jogo selecionado.`;
      case 1:
        return `1 jogo selecionado.`;
      case gameList.length:
        return `Todos os jogos selecionados.`;
      default:
        return `${numberOfSelectedGames} jogos selecionados.`;
    }
  };

  //ajuste com o tamanho da tela/////////////////////////////////////////////////////////////

  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////

  const selectionMessage = defineSelectionMessage();

  return (
    <Background>
      <Header goBackArrow={mainPage} logo />
      <LobbySettings>
        <Title>Selecione os jogos da partida:</Title>

        <SelectionText>{selectionMessage}</SelectionText>
        <WarningDiv className="LobbySettingsWarning">
          <AlertTriangle width="20px" height="20px" color="red" />
          <WarningText>Selecione no mínimo 3 jogos.</WarningText>
        </WarningDiv>

        <Cards>
          {gameList.map((card) => (
            <Card
              key={card.id}
              style={card.id >= 1000 ? { opacity: 0.2 } : { opacity: 1 }}>
              <GameCard
                onClick={() => updateSelection(card.id)}
                id={card.id}
                title={card.text}
                image={card.src}
                backgroundColor={card.backgroundColor}
              />
            </Card>
          ))}
        </Cards>
      </LobbySettings>
    </Background>
  );
}
