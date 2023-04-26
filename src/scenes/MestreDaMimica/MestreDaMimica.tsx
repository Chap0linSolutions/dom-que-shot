import { useState, useEffect } from "react"; 
import { useGlobalContext } from "../../contexts/GlobalContextProvider"
import { useNavigate } from "react-router-dom";
import SocketConnection from "../../lib/socket";
import CoverPage from "../../components/Game/Cover";
import coverImg from "../../assets/game-covers/mestre-da-mimica.png";
import GamePage from "./Game";
import FinishPage from "./Finish";

enum Game {
    Cover,
    Game,
    Finish,
}

export type Suggestion = {
  category: string,
  word: string,
}

const title = 'Mestre da Mímica';

const description = <>
    Enfim um jogo cooperativo nesse troço!
    <br/><br/>
    O jogador da vez irá receber algumas opções de palavra e deve escolher quais delas quer
    fazer mímica. Ele terá então 30 segundos para fazer seu show, e os demais jogadores vão tentar adivinhar. 
    <br/><br/>
    A mímica pode ser por gesto e/ou som (mas não vale falar). A roda precisa acertar pelo menos DUAS
    opções para que ninguém beba. Abaixo disso, todo mundo bebe uma dose para cada palavra não adivinhada.
    <br/><br/>
    Boa sorte!
</>

export default function MimicaMaster(){
    const { room, user, setRoom, setUser } = useGlobalContext();
    const [ suggestions, setSuggestions ] = useState<Suggestion[]>([]);
    const [ mimicState, setMimicState ] = useState<number>(0);
    const [ namesSoFar, setNamesSoFar ] = useState<number>(0);
    const [ correct, setCorrect ] = useState<Suggestion[]>([]);
    const navigate = useNavigate();

    const sendMimicState = (ms: number) => {
      socket.pushMessage(room.code, 'mimic-state-is', ms);
    }    

    const sendNamesSoFar = (n: number) => {
      socket.pushMessage(room.code, 'names-so-far', n);
    }

    const getSuggestions = () => {
      socket.pushMessage(room.code, 'mimic-suggestions', Game.Game);
    };

    const backToLobby = () => {
        socket.push('move-room-to', {
          roomCode: room.code,
          destination: '/Lobby',
        });
    };

    const sendResults = (stringifiedResults: string) => {
      socket.pushMessage(room.code, 'game-results-are', stringifiedResults);
    }

    const setGlobalRoomPage = (newPage: Game) => {
      setRoom((previous) => ({ ...previous, page: newPage }));
    };
    
    const nextRound = () => {
      socket.push('update-turn', room.code);
      socket.push('move-room-to', {
        roomCode: room.code,
        destination: '/SelectNextGame',
      });
    };

//SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('room-owner-is', (ownerName) => {
      const isOwner = user.nickname === ownerName;
      setUser((previous) => ({
        ...previous,
        isOwner: isOwner,
      }));
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        setRoom((previous) => ({
          ...previous,
          URL: destination,
          page: undefined,
        }));
        return navigate(destination, {
          state: {
            coverImg: coverImg,
          },
        });
      }
      setGlobalRoomPage(destination);
    });

    socket.addEventListener('game-results-are', (stringifiedResults) => {
      setCorrect(JSON.parse(stringifiedResults));
      setGlobalRoomPage(Game.Finish);
    });

    socket.addEventListener('mimic-suggestions', (suggests) => {
      setSuggestions(JSON.parse(suggests));
    });

    !user.isCurrentTurn && socket.addEventListener('mimic-state-is', (ms) => {
      setMimicState(ms);
    });

    !user.isCurrentTurn && socket.addEventListener('names-so-far', (n) => {
      setNamesSoFar(n);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

//////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log(suggestions.map(s => s.word));
  }, [suggestions])

  switch(room.page){
      case Game.Game: return (
          <GamePage
            suggestions={suggestions}
            turnVisibility={user.isCurrentTurn}
            mimicState={mimicState}
            namesSoFar={namesSoFar}
            sendNamesSoFar={sendNamesSoFar}
            sendMimicState={sendMimicState}
            sendResults={sendResults}
          />
        )
      case Game.Finish: return (
          <FinishPage
            turnVisibility={user.isCurrentTurn}
            suggestions={suggestions}
            correctGuesses={correct}
            endGame={nextRound}
          />
        )
      default: return (
          <CoverPage
              type="dynamic"
              title={title}
              coverImg={coverImg}
              goBackPage={backToLobby}
              gamePage={getSuggestions}
              turnVisibility={user.isCurrentTurn}
              ownerVisibility={user.isOwner}
              description={description}
          />
      )
  }
}