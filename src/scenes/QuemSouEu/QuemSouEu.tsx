import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import coverImg from '../../assets/game-covers/quem-sou-eu.png';
import CategoryPage from './Category';
import GamePage from './Game';
import FinishPage from './Finish';

export interface ListedPlayerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
  whoYouAre: string;
}

type whoPlayer = {
  player: string;
  whoPlayerIs: string;
};

enum Game {
  Cover,
  Category,
  Game,
  Finish,
}

export default function OEscolhido() {
  const {user, room, setUser, setRoom} = useGlobalContext();
  const title = 'Quem Sou Eu?';

  const navigate = useNavigate();
  const [playerList, updatePlayerList] = useState<ListedPlayerProps[]>([]);
  const [category, setCategory] = useState<string>(undefined);
  const [playersAndNames, setPlayersAndNames] =
    useState<whoPlayer[]>(undefined);
  const [winners, setWinners] = useState<string[]>([]);

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Serão sorteados personagens para cada jogador a partir da categoria
      escolhida pelo jogador da vez. A partir daí cada um na sua vez vai fazendo
      perguntas de sim ou não para tentar adivinhar quem é o personagem
      sorteado. Ele pode ser um ator/atriz, cantor e etc.
      <br />
      <br />O primeiro a acertar é o único que não bebe. Boa sorte!
    </>
  );

  const startGame = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Game,
    });
  };

  const startCategorySelection = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Category,
    });
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  const backToRoulette = () => {
    socket.push('players-who-drank-are', {
      roomCode: room.code,
      players: JSON.stringify(playerList.filter((player) => player.id === 0)), //all players who didn't get their characters right will have the id field set to 0
    });

    socket.push('update-turn', room.code);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/SelectNextGame',
    });
  };

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom(previous => {return {...previous, page: newPage}})
  }

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('lobby-update', (reply) => { 
      const newPlayerList = JSON.parse(reply);    
      setRoom(previous => {
        return {
          ...previous,
          playerList: newPlayerList,
        }
      });
    });

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = (user.nickname === ownerName);
      setUser(previous => {
        return {
          ...previous,
          isOwner: isOwner,
        }
      });
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        setRoom(previous => {
          return {
            ...previous,
            URL: destination,
            page: undefined,
          }
        });
        return navigate(destination);
      }
      setGlobalRoomPage(destination);
    });

    socket.addEventListener('players-and-names-are', (newNames) => {
      setPlayersAndNames(JSON.parse(newNames));
    });

    socket.addEventListener('winners-are', (players) => {
      setWinners(JSON.parse(players));
    });

    socket.addEventListener('game-category-is', (category) => {
      if (user.isCurrentTurn === false) {
        setCategory(category);
      }
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    updatePlayerList(room.playerList.map((p, index) => {
      return {
        nickname: p.nickname,
        avatarSeed: p.avatarSeed,
        id: index,
        whoYouAre: undefined,
      }
    }));
  }, []);

  useEffect(() => {
    if (playersAndNames) {
      const newPlayerList = playerList.map((player) => {
        const i = playersAndNames.findIndex(
          (p) => p.player === player.nickname
        );
        return {
          ...player,
          whoYouAre: i > -1 ? playersAndNames[i].whoPlayerIs : player.whoYouAre,
        };
      });
      updatePlayerList(newPlayerList);
    }
  }, [playersAndNames]);

  useEffect(() => {
    if (winners.length > 0) {
      updatePlayerList(
        playerList.map((player) => {
          return {
            ...player,
            id: winners.includes(player.nickname) ? 1000 : 0,
          };
        })
      );
      setGlobalRoomPage(Game.Finish);
    }
  }, [winners]);

  useEffect(() => {
    if (playerList) {
      console.log(playerList.filter((player) => player.id));

      const playersWhoWon = playerList.filter((player) => player.id === 1000);
      if (playersWhoWon.length > 0) {
        if (winners.length === 0) {
          console.log('enviando lista de vencedores ao jogo...');
          socket.pushMessage(
            room.code,
            'winners-are',
            JSON.stringify(playersWhoWon.map((w) => w.nickname))
          );
        }
      } else {
        const playersWithNoNames = playerList
          .filter((p) => p.whoYouAre === undefined)
          .map((p) => p.nickname);

        if (room.page === Game.Category) {
          if (playersWithNoNames.length === 0) {
            return startGame();
          }
        }

        if (room.page === Game.Game) {
          if (playersWithNoNames.length > 0 && user.isCurrentTurn === true) {
            socket.pushMessage(
              room.code,
              'send-names',
              JSON.stringify(playersWithNoNames)
            );
          }
        }
      }
    }
  }, [playerList]);

  useEffect(() => {
    if (category) {
      console.log(`categoria selecionada: ${category}`);
      socket.pushMessage(room.code, 'game-category-is', category);
      if (user.isCurrentTurn === true) {
        const playersWithNoNames = playerList
          .filter((p) => p.whoYouAre === undefined)
          .map((p) => p.nickname);
        console.log('Jogadores que ainda não têm nome definido:');
        console.log(playersWithNoNames);
        socket.pushMessage(
          room.code,
          'send-names',
          JSON.stringify(playersWithNoNames)
        );
      }
    }
  }, [category]);

  switch (room.page) {
    case Game.Category:
      return (
        <CategoryPage
          title={title}
          description={description}
          setCategory={setCategory}
          turnVisibility={user.isCurrentTurn}
        />
      );

    case Game.Game:
      return (
        <GamePage
          title={title}
          description={description}
          category={category}
          currentPlayerNickname={user.nickname}
          players={playerList}
          setWinners={updatePlayerList} //the winners of the match will have the 'whoYouAre' field either set as 'winner' or undefined. That's how we'll filter it
          turnVisibility={user.isCurrentTurn}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          logo={coverImg}
          players={playerList}
          turnVisibility={user.isCurrentTurn}
          roulettePage={backToRoulette}
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
