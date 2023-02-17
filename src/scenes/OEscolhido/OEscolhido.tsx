import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import FinishPage from './Finish';
import AwaitingResults from './Awaiting';
import coverImg from '../../assets/game-covers/o-escolhido.png';
import { Player, useGlobalContext } from '../../contexts/GlobalContextProvider';
import './OEscolhido.css';

type VoteResults = {
  players: Player[],
  numberOfVotes: number,
}

enum Game {
  Cover,
  Game,
  AwaitingResults,
  Finish,
}

export default function OEscolhido() {

  const {room, setRoom} = useGlobalContext();
  const title = 'O Escolhido';

  //TIMER//////////////////////////////////////////////////////////////////////////////////////

  const gameTime = 10000;

  const [msTimer, setMsTimer] = useState(gameTime);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  let updatedMs = msTimer;
  const run = () => {
    if (updatedMs > 0) {
      updatedMs -= 10;
      if (updatedMs === 0) {
        console.log('Acabou o tempo.');
        socket.pushMessage(room.code, 'vote-results', null);
      }
      setMsTimer(updatedMs);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const ownerVisibility = useLocation().state.isOwner;
  const turnVisibility = useLocation().state.isYourTurn;
  const [userVote, setUserVote] = useState<Player>(undefined);
  const [voteResults, setVoteResults] = useState<VoteResults>(undefined);

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Aparecerá uma lista com todos os participantes da sala e cada um votará em
      uma pessoa da lista para virar uma dose.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const setGlobalRoomPage = (newPage: Game) => {
    setRoom(previous => {return {...previous, page: newPage}})
  }

  const startGame = () => {
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: Game.Game,
    });
  };

  const nextRound = () => {
    socket.push('update-turn', room.code);
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/SelectNextGame',
    });
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: room.code,
      destination: '/Lobby',
    });
  };

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('vote-results', (mostVoted) => {
      const results = JSON.parse(mostVoted);
      const amount = results.at(0).votesReceived;
      const votedNames = results.map(p => p.nickname);
      const votedPlayers = room.playerList.filter(p => votedNames.includes(p.nickname));
      setVoteResults({
        players: votedPlayers,
        numberOfVotes: amount,
      });
      setGlobalRoomPage(Game.Finish);
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

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if(userVote){
      setGlobalRoomPage(Game.AwaitingResults);
      socket.pushMessage(room.code, 'voted-player', {
          roomCode: room.code,
          player: JSON.stringify(userVote),
        });
      } 
  }, [userVote]);

  useEffect(() => {
    if (room.page === Game.Game) {
      startTimer();
    } else if (room.page === Game.Finish) {
      clearInterval(timer);
      setMsTimer(gameTime);
    }
  }, [room.page]);

  switch (room.page) {
    case Game.Game:
      return (
        <GamePage
          msTimeLeft={msTimer}
          playerList={room.playerList}
          vote={setUserVote}
        />
      );

    case Game.AwaitingResults:
      return (
        <AwaitingResults
          votedPlayer={userVote}
          msTimeLeft={msTimer}
          gamePage={() => setGlobalRoomPage(Game.Game)}
          finishPage={() => setGlobalRoomPage(Game.Finish)}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          numberOfVotes={voteResults.numberOfVotes}
          votedPlayer={voteResults.players}
          turnVisibility={turnVisibility}
          roulettePage={() => nextRound()}
        />
      );
    
    default:
      return (
        <CoverPage
          type="round"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          description={description}
          gamePage={startGame}
        />
      );
  }
}
