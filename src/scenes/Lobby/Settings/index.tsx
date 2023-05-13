import { useState } from 'react';
import Header from '../../../components/Header';
import Background from '../../../components/Background';
import GameCard from '../../../components/GameCard';
import { AlertTriangle } from 'react-feather';
import games, { Game } from '../../../contexts/games';
import {
  Card,
  Cards,
  LobbySettings,
  SelectionText,
  Title,
  WarningDiv,
  WarningText,
} from './Settings.style';
import Popup from '../../../components/Popup';

type GameInfo = {
  name: string;
  description: string | JSX.Element;
}

interface SettingsProps {
  previousGameSelection: Game[];
  mainPage: (value: Game[]) => void;
}

export default function Settings({
  previousGameSelection,
  mainPage,
}: SettingsProps) {
  const [gameInfo, setGameInfo] = useState<GameInfo | undefined>(undefined);
  const previousGameNames = previousGameSelection.map((p) => p.title);
  const [gameCards, setGameCards] = useState<Game[]>(
    games.map((g) => {
      return {
        ...g,
        id: previousGameNames.includes(g.title) ? g.id : g.id + 1000,
      };
    })
  );

  const updateSelection = (id) => {
    const newID = id < 1000 ? id + 1000 : id - 1000;
    setGameCards(
      gameCards.map((game) =>
        game.id === id ? { ...game, id: newID } : { ...game }
      )
    );
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
      case games.length:
        return `Todos os jogos selecionados.`;
      default:
        return `${numberOfSelectedGames} jogos selecionados.`;
    }
  };

  const selectionMessage = defineSelectionMessage();

  return (
    <Background>
      {gameInfo && <Popup 
        type='info'
        title={gameInfo.name}
        description={gameInfo.description}
        show={!!gameInfo}
        exit={() => setGameInfo(undefined)}
      />}

      <Header
        goBackArrow={() => mainPage(gameCards.filter((game) => game.id < 1000))}
        logo
      />
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
                onInfoClick={() => setGameInfo({name: card.title, description: card.description})}
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
