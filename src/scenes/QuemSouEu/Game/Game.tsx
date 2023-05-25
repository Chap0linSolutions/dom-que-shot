import { useEffect, useState } from 'react';
import { Eye, EyeOff, RotateCw } from 'react-feather';
import Avatar from '../../../components/Avatar';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import Popup from '../../../components/Popup';
import {
  GameDiv,
  Card,
  CardContent,
  Detail,
  GuidanceText,
  HideNames,
  OthersName,
  YourName,
  HiddenName,
  PlayerList,
  TextAndHide,
  WhoGotThisName,
  PlayerAvatar,
  PlayerNickname,
  CategoryAndPlayer,
  Category,
  Content,
  Reload,
  ReloadsLeft,
} from './Game.style';

interface WhoPlayersProps {
  nickname: string;
  avatarSeed: string;
  whoPlayerIs: string;
}

interface WhoPlayersSelectable extends WhoPlayersProps {
  selected: boolean;
  isNameVisible: boolean;
}

interface GameProps {
  title: string;
  description: string | JSX.Element;
  currentPlayerNickname: string;
  players: WhoPlayersProps[];
  setWinners: (value: string[]) => void;
  turnVisibility: boolean;
  category: string;
  owner: boolean;
  down: boolean;
  undown: () => void;
  changeMyName: () => void;
}

export default function GamePage({
  title,
  description,
  currentPlayerNickname,
  category,
  turnVisibility,
  players,
  setWinners,
  owner,
  down,
  undown,
  changeMyName,
}: GameProps) {
  const [reloadsLeft, setReloadsLeft] = useState<number>(2);
  const [reloaded, setReloaded] = useState<boolean>(false);
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [whoPlayers, setWhoPlayers] = useState<WhoPlayersSelectable[]>(
    players.map((player) => {
      return { ...player, selected: false, isNameVisible: false };
    })
  );

  const [areNamesVisible, setNamesVisibility] = useState<boolean>(true);

  const toggleSelection = (nickname) => {
    if (turnVisibility === true) {
      setWhoPlayers(
        whoPlayers.map((player) => {
          if (player.nickname === nickname) {
            return { ...player, selected: !player.selected };
          }
          return { ...player, selected: false };
        })
      );
    }
  };

  const change = () => {
    if (reloadsLeft > 0) {
      setReloadsLeft((previous) => previous - 1);
      changeMyName();
      setReloaded(true);
      setTimeout(() => setReloaded(false), 3000);
    }
  };

  const endGame = () => {
    const winners = whoPlayers.filter((p) => p.selected).map((p) => p.nickname);
    setWinners(winners);
  };

  useEffect(() => {
    setWhoPlayers(
      players.map((p) => {
        const i = whoPlayers.findIndex((wp) => wp.nickname === p.nickname);
        return {
          ...p,
          selected: i > -1 ? whoPlayers[i].selected : false,
          isNameVisible: i > -1 ? whoPlayers[i].isNameVisible : false,
        };
      })
    );
  }, [players]);

  const secretText = <>?</>;

  const guidanceText =
    turnVisibility === true
      ? 'Selecione o primeiro que acertar:'
      : 'Veja quem são seus amigos:';

  const cardStyle = (isSelected: boolean) => {
    return { background: isSelected === true ? '#8877DF' : '#403A55' };
  };

  const alert = (
    <Alert
      onButtonClick={undown}
      message={
        down
          ? 'Parece que o jogador da vez caiu, então passou pra você! Clique em quem acertar primeiro!'
          : 'Clique no jogador que acertar primeiro!'
      }
    />
  );

  const button = (
    <Button
      staysOnBottom
      onClick={endGame}
      isDisabled={
        whoPlayers.filter((player) => player.selected === true).length === 0
          ? true
          : false
      }>
      Finalizar
    </Button>
  );

  const reloadStyle = reloadsLeft === 0 ? { opacity: 0.2 } : null;

  return (
    <Background noImage>
      <Popup
        type="warning"
        warningType="success"
        description={
          reloadsLeft > 0 ? (
            <>
              Nome trocado!
              <br />
              Restantes: {reloadsLeft} vez(es).
            </>
          ) : (
            <>
              Nome trocado!
              <br />
              Agora não pode trocar mais.
            </>
          )
        }
        show={reloaded}
      />

      <Popup
        type="info"
        title={title}
        description={description}
        show={popupVisibility}
        exit={() => setPopupVisibility(false)}
        comesFromTop
      />
      <Header
        participants={owner}
        exit
        roomCode
        infoPage={() => setPopupVisibility(true)}
      />
      {turnVisibility === true ? alert : null}
      <GameDiv>
        <Content>
          <TextAndHide>
            <GuidanceText>{guidanceText}</GuidanceText>
            <HideNames onClick={() => setNamesVisibility(!areNamesVisible)}>
              {areNamesVisible === true ? <Eye /> : <EyeOff />}
            </HideNames>
          </TextAndHide>
          <PlayerList>
            {whoPlayers.map((player) => {
              const playerName =
                player.nickname === currentPlayerNickname ? (
                  <>
                    <YourName onClick={() => toggleSelection(player.nickname)}>
                      {`(você)`}
                    </YourName>
                    <Reload onClick={change} style={reloadStyle}>
                      <ReloadsLeft>trocar</ReloadsLeft>
                      <RotateCw width={15} color="white" />
                    </Reload>
                  </>
                ) : (
                  <OthersName onClick={() => toggleSelection(player.nickname)}>
                    {player.whoPlayerIs}
                  </OthersName>
                );
              return (
                <Card key={player.nickname} style={cardStyle(player.selected)}>
                  <Detail>&nbsp;</Detail>
                  <CardContent>
                    {areNamesVisible === true ? (
                      playerName
                    ) : (
                      <HiddenName
                        onClick={() => toggleSelection(player.nickname)}>
                        {secretText}
                      </HiddenName>
                    )}
                    <CategoryAndPlayer>
                      <Category>{category}</Category>
                      <WhoGotThisName>
                        <PlayerAvatar>
                          <Avatar seed={player.avatarSeed} />
                        </PlayerAvatar>
                        <PlayerNickname>{player.nickname}</PlayerNickname>
                      </WhoGotThisName>
                    </CategoryAndPlayer>
                  </CardContent>
                </Card>
              );
            })}
          </PlayerList>
        </Content>
        {turnVisibility === true ? button : null}
      </GameDiv>
    </Background>
  );
}
