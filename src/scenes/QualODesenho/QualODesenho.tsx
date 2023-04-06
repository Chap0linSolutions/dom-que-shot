import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContextProvider';
import SocketConnection from '../../lib/socket';
import CoverPage from '../../components/Game/Cover';
import coverImg from '../../assets/game-covers/qual-o-desenho.png';
import GamePage from './Game';
//import FinishPage from './Ranking';
import WordPage from './Word';

interface drawingPlayer {
    //Lista de pontos
    //nome
    //id
}

interface guessingPlayer {
    player: string;
    guessList: string[];
    guessedCorrectly: boolean;
}

enum Game {
    Cover,
    Game,
    Awaiting,
    Finish,
}

export default function QualODesenho() {
    const { user, room, setUser, setRoom } = useGlobalContext();
    const title = 'Qual é o desenho?';

    const navigate = useNavigate();
    const [drawingPaths, setDrawingPaths] = useState<string>();
    const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
    const [word, setWord] = useState<string>(undefined);
    const [playersAndGuesses, setPlayersAndGuesses] =
        useState<guessingPlayer[]>(undefined);

    const description = (
        <>
            Neste jogo, cada participante vai jogar com o seu aparelho. O jogador da vez vai escolher uma palavra para desenhar
            (pode ser um animal, um objeto, dentre outros) e terá 1 minuto para finalizar o desenho.
            <br />
            <br />
            - Os que não acertarem dentro do tempo BEBEM;
            - Se ninguém acertar, o jogador da vez BEBE.
            <br />
            <br />
            Boa sorte!
        </>
    );

    //TIMER//////////////////////////////////////////////////////////////////////////////////

    const gameTime = 60000;        

    const [msTimer, setMsTimer] = useState(gameTime);
    const [timer, setTimer] = useState<NodeJS.Timer>();

    const startTimer = () => {
        setTimer(setInterval(run, 1000));
    };

    let updatedMs = msTimer;

    const run = () => {
        if (updatedMs > 0) {
        updatedMs -= 1000;
        if (updatedMs === 0) {
            console.log('Acabou o tempo.');
            socket.pushMessage(room.code, 'times-up', null);
            clearInterval(timer);
            setTimer(null);
        }
        setMsTimer(updatedMs);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////

    const startWordSelection = () => {
        socket.pushMessage(room.code, 'que-desenho-suggestions');
        socket.push('move-room-to', {
            roomCode: room.code,
            destination: Game.Awaiting,
        });
    };

    const startGame = () => {
        socket.pushMessage(room.code, 'start-game');
    };

    const finishGame = () => {
        socket.push('move-room-to', {
            roomCode: room.code,
            destination: Game.Finish,
        });
    };

    const backToLobby = () => {
        console.log('O usuário desejou voltar ao lobby');
        socket.push('move-room-to', {
            roomCode: room.code,
            destination: '/Lobby',
        });
    };

    const sendWinners = (winners: string[]) => {
        socket.pushMessage(room.code, 'winners-are', JSON.stringify(winners));
    };

    const backToRoulette = () => {
        socket.push('players-who-drank-are', {
            roomCode: room.code,
            players: JSON.stringify(playersAndGuesses.filter((p) => !p.guessedCorrectly)),
        });

        socket.push('update-turn', room.code);
        socket.push('move-room-to', {
            roomCode: room.code,
            destination: '/SelectNextGame',
        });
    };

    const setGlobalRoomPage = (newPage: Game) => {
        setRoom((previous) => ({ ...previous, page: newPage }));
    };

    const selectWord = (word: string) => {
        console.log(`palavra selecionada: ${word}`);
        setWord(word);
        socket.pushMessage(room.code, 'game-word-is', word);
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
                return navigate(destination);
            }
            setGlobalRoomPage(destination);
        });

        socket.addEventListener('start-game', () => {
            startTimer();
        });

        if(!user.isCurrentTurn){
            socket.addEventListener('drawing-points', (DPs) => {
                setDrawingPaths(DPs);
            })
        }

        socket.addEventListener('new-guess', (newGuess) => {
            //TODO: CORRIGIR A LÓGICA DE ADICIONAR UM PALPITE A UM JOGADOR
            setPlayersAndGuesses(
                JSON.parse(newGuess).map((p) => {
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
            setPlayersAndGuesses((previous) =>
                previous.map((p) => {
                    return {
                        ...p,
                        winner: winners.includes(p.player),
                    };
                })
            );
            finishGame();
        });

        socket.addEventListener('que-desenho-suggestions', (suggestions) => {
            setWordSuggestions(suggestions);
        });

        socket.addEventListener('game-word-is', (word) => {
            setWord(word);
            setGlobalRoomPage(Game.Game);
        });

        return () => {
            socket.removeAllListeners();
        };
    }, []);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const sendDrawingUpdate = (stringifiedArray: string) => {
        socket.pushMessage(room.code, 'drawing-points', stringifiedArray);
    }

    switch (room.page) {
        case Game.Awaiting:
            return (
                <WordPage
                    title={title}
                    description={description}
                    suggestions={wordSuggestions}
                    setWord={selectWord}
                    turnVisibility={user.isCurrentTurn}
                />
            );

        case Game.Game:
            return (
                <GamePage
                    title={title}
                    description={description}
                    category={word}
                    turnVisibility={user.isCurrentTurn}
                    msTimeLeft={msTimer}
                    startGame={startGame}
                    updateDrawingPaths={sendDrawingUpdate}
                    drawingPaths={drawingPaths}
                />
            );

        // case Game.Finish:
        //     return (
        //         <RankingPage
        //             turnVisibility={turnVisibility}
        //             roulettePage={() => nextRound()}
        //         />
        //     );

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
                    gamePage={startWordSelection}
                />
            );
    }
}
