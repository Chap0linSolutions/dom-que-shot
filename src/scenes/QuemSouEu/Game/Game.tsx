import { useEffect, useState } from 'react';
import { ListedPlayerProps } from '../QuemSouEu';
import { Eye, EyeOff } from 'react-feather';
import Avatar from '../../../components/Avatar';
import Background from '../../../components/Background';
import BottomButton from '../../../components/Button/BottomButton';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import Popup from '../../../components/Popup';
import { GameDiv, Card, CardContent, Detail, GuidanceText, HideNames, OthersName,  YourName, PlayerList, TextAndHide, WhoGotThisName, PlayerAvatar, PlayerNickname, CategoryAndPlayer, Category, Content } from './Game.style'

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
        if(turnVisibility === true){
            setWhoPlayers(whoPlayers.map(player => {
                if(player.nickname === nickname){
                    return {...player, selected: !player.selected}
                } return  {...player, selected: false}; 
            }));
        }
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
    
    const guidanceText = (turnVisibility === true)
    ? 'Selecione o primeiro que acertar:' 
    : 'Veja quem são seus amigos:';

    const cardStyle = (isSelected: boolean) => {
        return ({background: (isSelected === true)
            ? '#8877DF'
            : '#403A55'}
        )
    }

    const alert = <Alert message="Clique no jogador que acertar primeiro!"/>

    const button =
    <BottomButton onClick={endGame} isDisabled={
        (whoPlayers.filter(player => player.selected === true).length === 0)
        ? true 
        : false
    }>
        Finalizar
    </BottomButton>

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
            {(turnVisibility === true)? alert : null}
            <GameDiv>
                <Content>
                    <TextAndHide>
                        <GuidanceText>{guidanceText}</GuidanceText>
                        <HideNames onClick={() => setNamesVisibility(!areNamesVisible)}>
                            {(areNamesVisible === true)? <Eye /> : <EyeOff/>}
                        </HideNames>
                    </TextAndHide>
                    <PlayerList>
                        {whoPlayers.map((player => {
                            const playerName = (player.nickname === currentPlayerNickname)
                                ? <YourName>&#40;você&#41;</YourName> 
                                : <OthersName>{player.whoYouAre}</OthersName>; 
                            return (
                                <Card key={player.nickname}
                                    onClick={() => toggleSelection(player.nickname)}
                                    style={cardStyle(player.selected)}
                                >
                                    <Detail>&nbsp;</Detail>
                                    <CardContent>
                                        { 
                                        (areNamesVisible === true)
                                            ? playerName
                                            : <YourName>{secretText}</YourName> 
                                        }
                                        <CategoryAndPlayer>
                                            <Category>{category}</Category>
                                            <WhoGotThisName>
                                                <PlayerAvatar>
                                                    <Avatar seed={player.avatarSeed}/>
                                                </PlayerAvatar>
                                                <PlayerNickname>
                                                    {player.nickname}
                                                </PlayerNickname>
                                            </WhoGotThisName>
                                        </CategoryAndPlayer>
                                    </CardContent>
                                </Card>
                            ); 
                        }))}
                    </PlayerList>
                </Content>
                {(turnVisibility === true)? button : null}
            </GameDiv>
        </Background>
    );
}