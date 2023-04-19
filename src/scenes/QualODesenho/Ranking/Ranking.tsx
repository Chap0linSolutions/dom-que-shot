import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import RankingItem from './RankingItem';
import Background from '../../../components/Background';
import thumbDown from '../../../assets/thumbs-down.png';
import crown from '../../../assets/crown.png';
import noOneGuessed from '../../../assets/no-votes.png';
import { GuessingPlayer } from '../QualODesenho';
import {
  Content,
  RankingDiv,
  Header,
  OnlyWinner,
  Winner,
  Loser,
  AvatarBackground,
  Body,
  Ranking,
  Crown,
  NoOneGuessed,
  ThumbsDown,
  Text,
  Subtitle,
  Word,
  Guidance,
} from './Ranking.style';

interface RankingProps {
  data: GuessingPlayer[];
  roulettePage: () => void;
  turnVisibility: boolean;
  word: string;
  finalResults: boolean;
}

export function RankingPage({
  data,
  roulettePage,
  turnVisibility,
  word,
  finalResults,
}: RankingProps) {
  
  const whoGuessed = data.filter(d => d.guessTime > -1);
  const whoDidnt = data.filter(d => d.guessTime < 0);

  whoGuessed.length > 0 && whoGuessed.sort((a, b) => (a.guessTime - b.guessTime));
  whoDidnt.length > 0 && whoDidnt.sort((a, b) => (b.guessTime - a.guessTime));
  //PAREI AQUI

  const winner: GuessingPlayer =
    whoGuessed.length > 0
      ? whoGuessed[0]
      : {
          id: '',
          nickname: 'carregando...',
          avatarSeed: 'a winner avatar has no seed',
          guessTime: -1,
        };

  const loser: GuessingPlayer =
    data.length > 1
      ? data[data.length - 1]
      : {
          id: '',
          nickname: 'carregando...',
          avatarSeed: 'a loser avatar has no seed',
          guessTime: -1,
        };

  let guidanceText = [];

  if(!finalResults){
    guidanceText = ['Aguardando os demais jogadores...']
  } else if(whoDidnt.length > 0){
    const noobs = whoDidnt.filter(p => p.guessTime === -1);
    const disconnected = whoDidnt.filter(p => p.guessTime === -100);
    if(noobs.length === data.length){
      guidanceText = ['Todo mundo bebe! (menos quem desenhou)'];
    } else if(disconnected.length === data.length){
      guidanceText = ['Todo mundo caiu. Ninguém bebe.'];
    } else if(noobs.length > 0) {
      guidanceText = ['Quem não acertou bebe!'];
    } else {
      guidanceText = [
        'Todos os que conseguiram jogar acertaram!',
        'Nesse caso, ninguém bebe.',
      ];
    } 
  } else if(whoGuessed.length === 1) {
    guidanceText = [
      'Mas só tinha um pra tentar adivinhar? Aff',
    ];
  } else {
    guidanceText = [
      'Todo mundo acertou!',
      'Nesse caso, ninguém bebe.',
    ]
  }


  const button =
    turnVisibility === true ? (
      <Button staysOnBottom onClick={roulettePage}>
        Próximo jogo
      </Button>
    ) : null;

  return (
    <Background>
      <Content>
        <RankingDiv>
          <Subtitle>E a palavra era:</Subtitle>
          <Word>{word}</Word>
          <Header>
            {whoGuessed.length > 1 ? (
              <>
                <Winner>
                  <AvatarBackground>
                    <Crown src={crown} />
                    <Avatar seed={winner.avatarSeed} />
                  </AvatarBackground>
                  <Text>{winner.nickname}</Text>
                  <Text>{winner.guessTime}s</Text>
                </Winner>
                <Loser>
                  <AvatarBackground>
                    <Avatar seed={loser.avatarSeed} />
                    <ThumbsDown src={thumbDown} />
                  </AvatarBackground>
                  <Text>{loser.nickname}</Text>
                  <Text>{loser.guessTime}s</Text>
                </Loser>
             </>
            ) : (
              <OnlyWinner>
                <AvatarBackground>
                  {whoDidnt.length < data.length ? (
                    <>
                      <Crown src={crown} />
                      <Avatar seed={winner.avatarSeed} />
                    </>
                  ) : (
                    <NoOneGuessed src={noOneGuessed}/>
                  )}
                </AvatarBackground>
                {whoDidnt.length < data.length ? (
                  <>
                    <Text>{winner.nickname}</Text>
                    <Text>{winner.guessTime}s</Text>
                  </>
                ) : (
                  <>
                    <Text>Tragédia</Text>
                    <Text>total!</Text>
                  </>
                )}
              </OnlyWinner>
            )}
          </Header>

          <Body>
            <Ranking>
              {whoGuessed.map((player, i) => (
                <RankingItem
                  key={i}
                  name={player.nickname}
                  time={player.guessTime}
                  position={i}
                />
              ))}
              {whoDidnt.map((player, i) => (
                <RankingItem
                  key={i}
                  name={player.nickname}
                  time={player.guessTime}
                  position={i}
                />
              ))}
            </Ranking>
            {guidanceText.map((text, i) => (
              <Guidance key={i}>
                {text}
              </Guidance>
            ))}
          </Body>
        </RankingDiv>
        {button}
      </Content>
    </Background>
  );
}
