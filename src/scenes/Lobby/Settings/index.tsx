import { useState } from 'react';
import Header from '../../../components/Header';
import Background from '../../../components/Background';
import GameCard from '../../../components/GameCard';
import { AlertTriangle } from 'react-feather';
import game, { Game } from '../../../contexts/games';
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
  previousGameSelection: Game[];
  mainPage: (value: Game[]) => void;
}

export default function Settings({
  previousGameSelection,
  mainPage,
}: SettingsProps) {

  const previousGameNames = previousGameSelection.map(p => p.text);
  const [gameCards, setGameCards] = useState<Game[]>(game.map(g => {
    return {
      ...g, 
      id: (previousGameNames.includes(g.text))
      ? g.id 
      : g.id + 1000,
    }
  }));


  const updateSelection = (id) => {
    const newID = id < 1000 ? id + 1000 : id - 1000;
    setGameCards(gameCards.map((game) =>
      game.id === id
      ? { ...game, id: newID }
      : { ...game }
    ));
  };

  const numberOfSelectedGames = gameCards.filter(
    (game) => game.id < 1000
  ).length;

  const defineSelectionMessage = () => {
    switch (numberOfSelectedGames) {
      case 0:
        return `Nenhum jogo selecionado.`;
      case 1:
        return `1 jogo selecionado.`;
      case game.length:
        return `Todos os jogos selecionados.`;
      default:
        return `${numberOfSelectedGames} jogos selecionados.`;
    }
  };

  const selectionMessage = defineSelectionMessage();

  return (
    <Background>
      <Header goBackArrow={() => mainPage(gameCards.filter((game) => game.id < 1000))} logo />
      <LobbySettings>
        <Title>Selecione os jogos da partida:</Title>

        <SelectionText>{selectionMessage}</SelectionText>
        <WarningDiv className="LobbySettingsWarning">
          <AlertTriangle width="20px" height="20px" color="red" />
          <WarningText>Selecione no mínimo 3 jogos.</WarningText>
        </WarningDiv>

        <Cards>
          {gameCards.map((card) => (
            <Card
              key={card.id}
              style={card.id >= 1000 ? { opacity: 0.2 } : { opacity: 1 }}>
              <GameCard
                onClick={() => updateSelection(card.id)}
                id={card.id}
                title={card.title}
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
