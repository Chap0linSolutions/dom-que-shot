import { useEffect, useState } from 'react';
import { ListedPlayerProps } from '../QuemSouEu';
import { Eye, EyeOff } from 'react-feather';
import Avatar from '../../../components/Avatar';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import './Game.css'
import Popup from '../../../components/Popup';


interface WhoPlayersProps extends ListedPlayerProps {
    selected: boolean;
    isNameVisible: boolean;
} 

interface GameProps {
    title: string;
    description: string | JSX.Element;
    currentPlayerNickname: string;
    players: ListedPlayerProps[];
    setWinners: React.Dispatch<React.SetStateAction<ListedPlayerProps[]>>;
    turnVisibility: boolean;
    category: string;
}

export default function GamePage({title, description, currentPlayerNickname, category, turnVisibility, players, setWinners} : GameProps){

    const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
    const [whoPlayers, setWhoPlayers] = useState<WhoPlayersProps[]>(
        players.map(player => {
            return {...player, selected: false, isNameVisible: false}
        })
    );

    const [areNamesVisible, setNamesVisibility] = useState<boolean>(true);

    const toggleSelection = (nickname) => {
        setWhoPlayers(whoPlayers.map(player => {
            if(player.nickname === nickname){
                return {...player, selected: !player.selected}
            } return  {...player, selected: false}; 
        }));
    }

    const endGame = () => {                             //here's where we set the id field of each player to either 1000 (winner) or 0 (loser). 
        const winners = players.map(player => {
            const p = whoPlayers.filter(pl => pl.nickname === player.nickname);
            if(p[0].selected === true){
                return {...player, id: 1000};
            } return {...player, id: 0};
        })
        setWinners(winners);
    }

    useEffect(() => {
        setWhoPlayers(players.map(p => {
            const i = whoPlayers.findIndex(wp => wp.nickname === p.nickname);
            return {
                ...p,
                selected: (i > -1)
                ? whoPlayers[i].selected
                : false,
                isNameVisible: (i > -1)
                ? whoPlayers[i].isNameVisible
                : false,
            }
        }));
    }, [players]);

    const secretText = <>&nbsp;&nbsp;?</>;

    if(turnVisibility === true){
        return (
            <Background noImage>
                <Popup
                    title={title}
                    description={description}
                    show={popupVisibility}
                    exit={() => setPopupVisibility(false)}
                    comesFromTop
                />
                <Header infoPage={() => setPopupVisibility(true)} />
                <Alert message="Clique no jogador que acertar primeiro!"/>
                <div className="PlayerWhoGameTitleAndHide">
                    <p className="PlayerWhoGameTitle">
                        Selecione o primeiro que acertar:
                    </p>
                    <div className="PlayerWhoHide" onClick={() => setNamesVisibility(!areNamesVisible)}>
                        {(areNamesVisible === true)? <Eye /> : <EyeOff/>}
                    </div>
                </div>
                <div className="PlayerWhoDiv">
                    {whoPlayers.map((player => {
                        const playerName = (player.nickname === currentPlayerNickname)
                            ? <p className="PlayerYourName">&#40;você&#41;</p> 
                            : <p className="PlayerWhoName">{player.whoYouAre}</p>; 
                        return (
                            <div key={player.nickname} className="PlayerWhoCard"
                                onClick={() => toggleSelection(player.nickname)}
                                style={player.selected === true
                                ? {background: '#8877DF'}
                                : {background: '#403A55'}
                            }>
                            <div className="PlayerWhoFrame">
                                    &nbsp;
                            </div>
                            <div className="PlayerWhoFrameAndName">
                                { 
                                (areNamesVisible === true)
                                    ? playerName
                                    : <p className="PlayerYourName">{secretText}</p> 
                                }
                                <div className="PlayerWhoCategoryAndPlayer">
                                    <p className="PlayerWhoCategory">{category}</p>
                                    <div className="PlayerWho">
                                        <div className="PlayerWhoAvatar">
                                            <Avatar seed={player.avatarSeed}/>
                                        </div>
                                        <p className="PlayerWhoNickname">
                                            {player.nickname}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ); 
                    }))}
                </div>
                <div className="PlayerWhoButton">
                    <Button onClick={endGame} isDisabled={
                        (whoPlayers.filter(player => player.selected === true).length === 0)
                        ? true 
                        : false
                    }>
                        Finalizar
                    </Button>
                </div>
            </Background>
        );
    }

    return (
        <Background noImage>
            <Popup
                title={title}
                description={description}
                show={popupVisibility}
                exit={() => setPopupVisibility(false)}
                comesFromTop
            />
            <Header infoPage={() => setPopupVisibility(true)} />
            <div className="PlayerWhoGameTitleAndHide">
                <p className="PlayerWhoGameTitle">
                    Veja quem são seus amigos:
                </p>
                <div className="PlayerWhoHide" onClick={() => setNamesVisibility(!areNamesVisible)}>
                    {(areNamesVisible === true)? <Eye /> : <EyeOff/>}
                </div>
            </div>
            
            <div className="PlayerWhoDiv">
                {whoPlayers.map((player => {
                    const playerName = (player.nickname === currentPlayerNickname)
                        ? <p className="PlayerYourName">&#40;você&#41;</p> 
                        : <p className="PlayerWhoName">{player.whoYouAre}</p>; 
                    return (
                        <div key={player.nickname} className="PlayerWhoCard">
                            <div className="PlayerWhoFrame">
                                    &nbsp;
                            </div>
                            <div className="PlayerWhoFrameAndName">
                                { 
                                (areNamesVisible === true)
                                    ? playerName
                                    : <p className="PlayerYourName">{secretText}</p> 
                                }
                                <div className="PlayerWhoCategoryAndPlayer">
                                    <p className="PlayerWhoCategory">{category}</p>
                                    <div className="PlayerWho">
                                        <div className="PlayerWhoAvatar">
                                            <Avatar seed={player.avatarSeed}/>
                                        </div>
                                        <p className="PlayerWhoNickname">
                                            {player.nickname}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ); 
                }))}               
            </div>
        </Background>
    );
}