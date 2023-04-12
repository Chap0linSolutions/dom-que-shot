import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import GamePage from './Game';
import FinishPage from './Finish';
import AwaitingResults from './Awaiting';
import coverImg from '../../assets/game-covers/o-escolhido.png';
import { Player, useGlobalContext } from '../../contexts/GlobalContextProvider';
import './OEscolhido.css';

export type MostVoted = {
  nickname: string;
  avatarSeed: string;
};

type VoteResults = {
  players: MostVoted[];
  numberOfVotes: number;
};

enum Game {
  Cover,
  Game,
  AwaitingResults,
  Finish,
}

export default function OEscolhido() {
  const { user, room, setUser, setRoom } = useGlobalContext();
  const title = 'O Escolhido';

  //TIMER//////////////////////////////////////////////////////////////////////////////////////

  const gameTime = 10000;

  const [msTimer, setMsTimer] = useState(gameTime);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, 100));
  };

  let updatedMs = msTimer;
  const run = () => {
    if (updatedMs > 0) {
      updatedMs -= 100;
      if (updatedMs === 0) {
        setMsTimer(0);
      }
      setMsTimer(updatedMs);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
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
    setRoom((previous) => ({ ...previous, page: newPage }));
  };

  const startGame = () => {
    socket.pushMessage(room.code, 'move-to', Game.Game);
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
    socket.addEventListener('lobby-update', (reply) => {
      const newPlayerList = JSON.parse(reply);
      setRoom((previous) => ({
        ...previous,
        playerList: newPlayerList,
      }));
    });

    socket.addEventListener('kick-player', (nickname) => {
      if(user.nickname === nickname){
        window.localStorage.clear();
        navigate('/Home');
      }
    });

    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
      }));
    });

    socket.addEventListener('vote-results', (mostVoted) => {
      const results = JSON.parse(mostVoted);
      console.log('Mais votados:');
      console.log(results);
      const amount = results.at(0).votesReceived;
      setVoteResults({
        players: results,
        numberOfVotes: amount,
      });
      setGlobalRoomPage(Game.Finish);
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

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (msTimer === 0 && !userVote) {
      console.log('Acabou o tempo.');
      socket.pushMessage(room.code, 'times-up', user.nickname);
    }
  }, [msTimer]);

  useEffect(() => {
    if (userVote) {
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
          owner={user.isOwner}
        />
      );

    case Game.AwaitingResults:
      return (
        <AwaitingResults
          votedPlayer={userVote}
          msTimeLeft={msTimer}
          gamePage={() => setGlobalRoomPage(Game.Game)}
          finishPage={() => setGlobalRoomPage(Game.Finish)}
          owner={user.isOwner}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          numberOfVotes={voteResults.numberOfVotes}
          votedPlayer={voteResults.players}
          turnVisibility={user.isCurrentTurn}
          roulettePage={() => nextRound()}
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
          gamePage={startGame}
        />
      );
  }
}
