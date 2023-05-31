import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import coverImg from '../../assets/game-covers/quem-sou-eu.png';
import CategoryPage from './Category';
import GamePage from './Game';
import FinishPage from './Finish';

export type whoPlayer = {
  player: string;
  whoPlayerIs: string;
  winner: boolean;
};

enum Game {
  Cover,
  Category,
  Game,
  Finish,
}

export default function OEscolhido() {
  const { user, room, setUser, setRoom } = useGlobalContext();
  const title = 'Quem Sou Eu?';

  const navigate = useNavigate();
  const [originalPlayerIsDown, setOriginalPlayerIsDown] =
    useState<boolean>(false);
  const [weHaveResults, setWeHaveResults] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(undefined);
  const [playersAndNames, setPlayersAndNames] =
    useState<whoPlayer[]>(undefined);

  const description = (
    <>
      O jogador da vez escolhe a categoria, e a partir daí serão sorteados nomes
      dessa categoria para cada jogador. Então cada um na sua vez vai fazendo
      perguntas de sim ou não para tentar adivinhar quem é.
      <br />
      <br />
      Quem acertar a pergunta pode fazer novas perguntas em sequência. Quem
      errar perde a vez e passa para o próximo.
      <br />
      <br />O primeiro a acertar é o único que não bebe. Boa sorte!
    </>
  );

  const startCategorySelection = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Category,
    });
  };

  const startGame = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Game,
    });
  };

  const changeMyName = () => {
    socket.pushMessage(room.code, 'send-me-a-new-name');
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/saguao',
    });
  };

  const sendWinners = (winners: string[]) => {
    socket.pushMessage(room.code, 'winners-are', JSON.stringify(winners));
  };

  const backToRoulette = () => {
    socket.push('players-who-drank-are', {
      roomCode: room.code,
      players: JSON.stringify(playersAndNames.filter((p) => !p.winner)),
    });

    socket.push('update-turn', room.code);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/roleta',
    });
  };

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  const selectCategory = (category: string) => {
    console.log(`categoria selecionada: ${category}`);
    socket.pushMessage(room.code, 'game-category-is', category);
  };

  useEffect(() => {
    window.history.replaceState({}, 'Dom Que Shot', process.env.VITE_REACT_APP_ADRESS);
  }, []);

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList = JSON.parse(reply);
      setRoom((previous) => ({
        ...previous,
        playerList: newPlayerList,
      }));
    });

    socket.addEventListener('kick-player', (nickname) => {
      if (user.nickname === nickname) {
        window.localStorage.clear();
        navigate('/home');
      }
    });

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
      }));
    });

    socket.addEventListener('original-player-is-down', () => {
      setOriginalPlayerIsDown(true);
    });

    socket.addEventListener('player-turn-is', (turnName) => {
      setUser((previous) => ({
        ...previous,
        isCurrentTurn: user.nickname === turnName,
      }));
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        setRoom((previous) => ({
          ...previous,
          URL: destination,
          page: undefined,
        }));
        return navigate(destination);
      }
      setGlobalRoomPage(destination);
    });

    socket.addEventListener('players-and-names-are', (newNames) => {
      setPlayersAndNames(
        JSON.parse(newNames).map((p) => {
          return {
            player: p.player,
            whoPlayerIs: p.whoPlayerIs,
            winner: false,
          };
        })
      );
    });

    socket.addEventListener('winners-are', (players) => {
      const winners: string[] = JSON.parse(players);
      setPlayersAndNames((previous) =>
        previous.map((p) => {
          return {
            ...p,
            winner: winners.includes(p.player),
          };
        })
      );
      setWeHaveResults(true);
    });

    socket.addEventListener('game-category-is', (category) => {
      setCategory(category);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!category && room.page === Game.Game) {
      //só quem chegou com o jogo em andamento atende essa condição
      socket.pushMessage(room.code, 'update-me', 'please'); //nesse caso, o update é individual
    }
  }, []);

  useEffect(() => {
    if (
      category &&
      playersAndNames &&
      user.isCurrentTurn &&
      room.page === Game.Category
    ) {
      startGame();
    }
  }, [category, playersAndNames, room, user]);

  useEffect(() => {
    if (user.isCurrentTurn && weHaveResults)
      socket.push('move-room-to', {
        roomCode: room.code,
        destination: Game.Finish,
      });
  }, [user, weHaveResults]);

  const listOfPlayers = playersAndNames
    ? room.playerList.map((player) => {
        const i = playersAndNames.findIndex(
          (p) => p.player === player.nickname
        );
        return {
          nickname: player.nickname,
          avatarSeed: player.avatarSeed,
          whoPlayerIs:
            i > -1 ? playersAndNames[i].whoPlayerIs : 'carregando...',
        };
      })
    : [];

  switch (room.page) {
    case Game.Category:
      return (
        <CategoryPage
          title={title}
          description={description}
          setCategory={selectCategory}
          turnVisibility={user.isCurrentTurn}
          owner={user.isOwner}
          down={originalPlayerIsDown}
          undown={() => setOriginalPlayerIsDown(false)}
        />
      );

    case Game.Game:
      return (
        <GamePage
          title={title}
          description={description}
          category={category}
          currentPlayerNickname={user.nickname}
          players={listOfPlayers}
          setWinners={sendWinners}
          turnVisibility={user.isCurrentTurn}
          owner={user.isOwner}
          down={originalPlayerIsDown}
          undown={() => setOriginalPlayerIsDown(false)}
          changeMyName={changeMyName}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          logo={coverImg}
          players={playersAndNames}
          turnVisibility={user.isCurrentTurn}
          roulettePage={backToRoulette}
          owner={user.isOwner}
        />
      );

    default:
      return (
        <CoverPage
          type="round"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          turnVisibility={user.isCurrentTurn}
          ownerVisibility={user.isOwner}
          description={description}
          gamePage={startCategorySelection}
        />
      );
  }
}
