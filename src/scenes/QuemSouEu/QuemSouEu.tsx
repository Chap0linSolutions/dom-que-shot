import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from '../../components/Game/Cover';
import InfoPage from '../../components/Game/Info';
import coverImg from '../../assets/game-covers/quem-sou-eu.png';
import CategoryPage from './Category';
import GamePage from './Game';
import FinishPage from './Finish';
import './QuemSouEu.css';



export interface ListedPlayerProps {
    nickname: string;
    avatarSeed: string;
    id: number;
    whoYouAre: string;
}

type whoPlayer = {
  player: string,
  whoPlayerIs: string, 
}

enum Game {
  Cover,
  Info,
  Category,
  Game,
  Finish,
}

export default function OEscolhido() {
  const title = 'Quem Sou Eu?';

  const navigate = useNavigate();
  const ownerVisibility = useLocation().state.isOwner;
  const turnVisibility = useLocation().state.isYourTurn;
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const [playerList, updatePlayerList] = useState<ListedPlayerProps[]>([]);
  const [category, setCategory] = useState<string>(undefined);
  const [playersAndNames, setPlayersAndNames] = useState<whoPlayer[]>(undefined);
  const [winners, setWinners] = useState<string[]>([]);

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      A descrição ainda está por vir rs.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const startGame = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: Game.Game,
    });
  };

  const startCategorySelection = () => {
    socket.push('move-room-to', {
        roomCode: userData.roomCode,
        destination: Game.Category,
      });
  }

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  const backToRoulette = () => {
    socket.push('players-who-drank-are', {
      roomCode: userData.roomCode,
      players: JSON.stringify(
        playerList.filter(player => player.id === 0)
      ), //all players who didn't get their characters right will have the id field set to 0
    });

    socket.push('update-turn', userData.roomCode);
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/SelectNextGame',
    });
  };


  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.setLobbyUpdateListener(updatePlayerList);
    socket.push('lobby-update', userData.roomCode);

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        return navigate(destination);
      }
      setCurrentGameState(destination);
    });

    socket.addEventListener('players-and-names-are', (newNames) => {
      setPlayersAndNames(JSON.parse(newNames));
    });

    socket.addEventListener('winners-are', (players) => {
      setWinners(JSON.parse(players));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if(playersAndNames){
      const newPlayerList = playerList.map(player => {
        const i = playersAndNames.findIndex(p => p.player === player.nickname);
        return {...player, whoYouAre: (i > -1)
          ? playersAndNames[i].whoPlayerIs
          : player.whoYouAre
        } 
      });
      updatePlayerList(newPlayerList);
    } 
  }, [playersAndNames]);


  useEffect(() => {
    if(winners.length > 0){
      updatePlayerList(playerList.map(player => {
        return {...player, id: (winners.includes(player.nickname))
          ? 1000
          : 0
        }
      }));
      //backToRoulette();                     //if you wish to go back to roulette without showing the finish screen, uncomment this and comment the line below
      setCurrentGameState(Game.Finish);
    }
  }, [winners]);

  
  useEffect(() => {
    if(playerList){
      
      console.log(playerList.filter(player => player.id));

      const playersWhoWon = playerList.filter(player => player.id === 1000);
      if((playersWhoWon.length > 0)){
        if(winners.length === 0){
          console.log('enviando lista de vencedores ao jogo...');
          socket.pushMessage(
            userData.roomCode, 
            'winners-are',
            JSON.stringify(playersWhoWon.map(w => w.nickname))
          );
        }
      } else {
        const playersWithNoNames = playerList
          .filter(p => p.whoYouAre === undefined)
          .map(p => p.nickname);

        if(currentGameState === Game.Category){
          if(playersWithNoNames.length === 0){
            return startGame();
          }
        } 
        
        if(currentGameState === Game.Game){  
          if((playersWithNoNames.length > 0)&&(turnVisibility === true)){
            socket.pushMessage(
              userData.roomCode, 
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
      socket.pushMessage(userData.roomCode, 'game-category-is', 'Animais');
      if(turnVisibility === true){
        const playersWithNoNames = playerList
        .filter(p => p.whoYouAre === undefined)
        .map(p => p.nickname);
        console.log('Jogadores que ainda não têm nome definido:');
        console.log(playersWithNoNames);
        socket.pushMessage(userData.roomCode, 'send-names', JSON.stringify(playersWithNoNames));
      }
    } 
  }, [category]);


  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          type="round"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          infoPage={() => setCurrentGameState(Game.Info)}
          gamePage={startCategorySelection}       
        />
      );

    case Game.Info:
      return (
        <InfoPage
          title={title}
          description={description}
          coverImg={coverImg}
          coverPage={() => setCurrentGameState(Game.Cover)}
          gamePage={startCategorySelection}      
          turnVisibility={turnVisibility}
        />
      );

    case Game.Category:
      return (
        <CategoryPage
            setCategory={setCategory}
            turnVisibility={turnVisibility}
        />
      );

    case Game.Game:
        return (
          <GamePage
              currentPlayerNickname={userData.nickname}
              players={playerList}
              setWinners={updatePlayerList}   //the winners of the match will have the 'whoYouAre' field either set as 'winner' or undefined. That's how we'll filter it
              turnVisibility={turnVisibility}
          />
        );

    case Game.Finish:
      return (
        <FinishPage 
          logo={coverImg}
          players={playerList}
          turnVisibility={turnVisibility}
          roulettePage={backToRoulette}
        />
      );

    default:
      return (
        <Background>
          <div>Erro!</div>
        </Background>
      );
  }
}