import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Background from '../../../components/Background';
import GameCard from '../../../components/GameCard';
import { AlertTriangle } from 'react-feather';
import { Game } from '../../../contexts/games';
import './Settings.css';

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

  const selectionMessage = defineSelectionMessage();

  return (
    <Background>
      <Header goBackArrow={mainPage} />
      <div className="LobbySettingsDiv">
        <p className="LobbySettingsTitle">Selecione os jogos da partida:</p>

        <div className="LobbySettingsGameCardsDiv">
          {gameList.map((card) => (
            <div
              key={card.id}
              className="LobbySettingsGameCard"
              style={card.id >= 1000 ? { opacity: 0.2 } : { opacity: 1 }}>
              <GameCard
                onClick={() => updateSelection(card.id)}
                id={card.id}
                title={card.title}
                image={card.src}
                backgroundColor={card.backgroundColor}
              />
            </div>
          ))}
        </div>
        <div className="LobbySettingsSelectedText">{selectionMessage}</div>
        <div className="LobbySettingsWarning">
          <AlertTriangle width="20px" height="20px" color="red" />
          <p className="LobbyWarningText">Mínimo de 3 jogos!</p>
        </div>
      </div>
    </Background>
  );
}
