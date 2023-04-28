import { useEffect, useRef, useState } from "react";
import Background from "../../../components/Background";
import Header from "../../../components/Header";
import glassIcon from '../../../assets/glass-icon-yellow-background.png';
import Button from "../../../components/Button";
import beer from "../../../assets/beer.png";
import sandWatch from "./assets/sand-watch.png";
import gsap from 'gsap';
import { CheckCircle, Circle } from "react-feather";
import { CategoryAndWord, Content, Emphasis, Icon, Item, ItemContent, Mimic, Subtitle, SuggestionsDiv, Title, Word, CheckIcon, Timer, StillTimer, TimerAndProgressBar, ProgressBarDiv, ProgressBar, Progress, ProgressTitle, MilestoneDiv, Milestone, MilestoneIcon, SandWatch, SandWatchDiv, Glass, Sand, GuessTimer, GuessGuidance, GuessProgressDiv, GuessProgressTitle, ButtonDiv } from "./Game.style";

interface GameProps {
    turnVisibility: boolean,
    suggestions: string[],
    mimicState: number,
    namesSoFar: number,
    sendNamesSoFar: (value: number) => void,
    sendMimicState: (value: number) => void,
    sendResults: (value: string) => void;
}

enum GameState {
    Idle,
    Started,
    GuessedTwo,
}

const IDLE_SAND_LEVEL = 10;
const GAME_DURATION = 30000;
const DELTA_TIME = 1000;
const SAND_LEVEL = 55;
const DELTA_SAND_LEVEL = (((IDLE_SAND_LEVEL/2) + SAND_LEVEL) * DELTA_TIME) / (GAME_DURATION);
const GLASSWATCH_PACE = 0.5;

export default function GamePage({turnVisibility, suggestions, mimicState, namesSoFar, sendNamesSoFar, sendMimicState, sendResults}: GameProps){
    const [ correct, setCorrect ] = useState<number[]>([]);
    const [ state, setState ] = useState<GameState>();
    const [ guidanceText, setGuidanceText ] = useState<JSX.Element | null>();
    const [ buttonText, setButtonText ] = useState<string>();
    const [ buttonEnabled, setButtonEnabled ] = useState<boolean>(true);
    const [ sandLevel, setSandLevel ] = useState<number>();
    const hudRef = useRef(null);
    const buttonRef = useRef(null);
    const guidanceRef = useRef(null);
    const progressRef = useRef(null);
    const sandRef = useRef(null);
    const glassRef = useRef(null);
    const guessProgressRef = useRef(null);

    const decideWhatToDo = () => {
        if(state === GameState.Idle) return begin();
        return finish();
    }

    const hideButton = () => {
        gsap.to(buttonRef.current, {
            y: 200,
            duration: 0.75,
            ease: 'back',
        })
    }

    const showButton = () => {
        gsap.to(buttonRef.current, {
            y: 0,
            duration: 1,
            ease: 'back',
        })
    }

    const begin = () => {
        setButtonText('Aguarde...');
        setButtonEnabled(false);
        setState(GameState.Started);
    }

    const finish = () => {
        const names = correct.map(c => (suggestions[c]));
        sendResults(JSON.stringify(names));
    }

    const pushCorrect = (i: number) => {
        if(state !== GameState.Started) return;
        if(correct.includes(i)){
            const minusOne = correct.filter(c => c !== i);
            setCorrect(minusOne);
        } else {
            setCorrect(previous => [...previous, i]);
        }
    }

//TIMER//////////////////////////////////////////////////////////////////////////////////////

  const [msTimer, setMsTimer] = useState(() => GAME_DURATION);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, DELTA_TIME));
  };

  const run = () => {
    setMsTimer(previous => ((previous > 0)
      ? previous - DELTA_TIME
      : previous
    ));
  };

  useEffect(() => {
    if(msTimer === 0){
        console.log('acabou o tempo.')
        clearInterval(timer);
        turnVisibility && finish();
    }
  }, [msTimer]);

///////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {        
        if(turnVisibility){
            setButtonText('Começar!');
            setState(GameState.Idle);
            setButtonEnabled(true);
            setGuidanceText(<>
                Você tem <Emphasis>30 segundos</Emphasis> para fazer as mímicas,
                <br/>e a roda deve acertar <Emphasis>2 opções</Emphasis> para vencer.
                <br/>Não se esqueça de marcar os nomes<br/>que forem sendo <Emphasis>adivinhados</Emphasis>.
            </>)
            return () => {
                timer && clearInterval(timer);
            }
        } else {
            setSandLevel(IDLE_SAND_LEVEL);
            setGuidanceText(<>
                <Emphasis>Vai começar em breve!</Emphasis><br/>
                Lembrando, vocês precisam acertar <br/>
                pelo menos <Emphasis>2 nomes</Emphasis> para vencer.
            </>);
            gsap.to(guessProgressRef.current, {
                y: 200,
                duration: 0,
            });
        }
    }, []);

    useEffect(() => {
        !turnVisibility && setState(mimicState);
    }, [mimicState]);

    useEffect(() => {
        !turnVisibility && setCorrect([...Array(namesSoFar)].map((x, i) => i));
    }, [namesSoFar])

    useEffect(() => {
        gsap.to(sandRef.current, {
            height: `${10 + sandLevel}%`,
            ease: 'back',
            duration: 0.5,
        });
    }, [sandLevel]);

    useEffect(() => {
        turnVisibility && sendNamesSoFar(correct.length);
        gsap.to(progressRef.current, {
            width: (correct.length > 1)
            ? '100%'
            : `${(correct.length * 50) + 10}%`,
            duration: 1,
            ease: 'back', 
        })
        if(state === GameState.Started){
            if(correct.length > 1){
                setButtonEnabled(true);
                showButton();
            } else {
                setButtonEnabled(false);
                hideButton();
            }
        }
    }, [correct]);

    useEffect(() => {
        if(state === GameState.Started){
            if(msTimer === GAME_DURATION){
                startTimer();
                setGuidanceText(<>Valendo!</>);
            }
            if(turnVisibility) {
                setButtonText('Finalizar (opcional)');
            }
        }
    }, [state, msTimer]);

    useEffect(() => {
        if(turnVisibility){
            sendMimicState(state);
            if(state === GameState.Started){
                hideButton();
            }
        } else {
            if(state === GameState.Started){
                gsap.to(guessProgressRef.current, {
                    y: 0,
                    duration: 1,
                    delay: 0.5,
                    ease: 'back',
                });
                gsap.timeline().to(sandRef.current, {
                    height: `${IDLE_SAND_LEVEL + SAND_LEVEL}%`,
                    ease: 'back',
                    duration: 1,
                }).call(() => {
                    setSandLevel(SAND_LEVEL);
                }).call(() => {
                    gsap.timeline().to(glassRef.current, {
                        rotate: 30,
                        duration: GLASSWATCH_PACE,
                        ease: 'power2',
                    }).to(glassRef.current, {
                        rotate: 0,
                        duration: GLASSWATCH_PACE,
                        ease: 'power2',
                    }).call(() => { 
                        setSandLevel(previous => previous - DELTA_SAND_LEVEL);
                    }).to(glassRef.current, {
                        rotate: -30,
                        duration: GLASSWATCH_PACE,
                        ease: 'power2',
                    }).to(glassRef.current, {
                        rotate: 0,
                        duration: GLASSWATCH_PACE,
                        ease: 'power2',
                    }).call(() => { 
                        setSandLevel(previous => previous - DELTA_SAND_LEVEL);
                    }).repeat(-1);
                })
            }
        }
    }, [state]);

    const RunningTimer = (turnVisibility)? Timer : GuessTimer;

    const timeStamp = (state === GameState.Idle)
    ? <StillTimer>00:{(GAME_DURATION / 1000)}</StillTimer>
    : <RunningTimer>00:{(msTimer >= 10000)? (msTimer / 1000) : `0${msTimer / 1000}`}</RunningTimer>;

    const ProgressText = () => {
        switch(correct.length){
            case 0: return <>Todos ainda vão beber 2 doses</>
            case 1: return <>Ainda vão beber 1 dose</>
            case 2: return <>Yey! Todos venceram, 0 doses</>
            default: return <>Acertaram todas! Vem monstro!</>
        }
    }

    if(turnVisibility) return (
        <Background noImage>
            <Header exit participants={turnVisibility}/>
            <Mimic>
                <Content>
                    <Title>
                        Suas opções são as seguintes:
                    </Title>
                    <SuggestionsDiv>
                        {suggestions.map((s, i) => (
                            <Item 
                                key={i}
                                onClick={() => pushCorrect(i)}
                            >
                                <ItemContent>
                                    <Icon src={glassIcon}/>
                                    <CategoryAndWord>
                                        <Word>
                                            {s}
                                        </Word>
                                    </CategoryAndWord>
                                </ItemContent>
                                <CheckIcon className='check'>
                                    {(state === GameState.Started && correct.includes(i))
                                    ? <CheckCircle color="lime"/>
                                    : <Circle color='#AAAAAA'/>}
                                </CheckIcon>
                            </Item>
                        ))}
                    </SuggestionsDiv>
                    <TimerAndProgressBar ref={hudRef}>
                        {timeStamp}
                        <ProgressBarDiv>
                            <ProgressTitle>
                                <ProgressText />
                            </ProgressTitle>
                            <ProgressBar>
                                <Progress ref={progressRef}/>
                            </ProgressBar>
                            <MilestoneDiv>
                                <Milestone>
                                    2
                                    <MilestoneIcon src={beer} />
                                    <MilestoneIcon src={beer} />
                                </Milestone>
                                <Milestone>
                                    1 <MilestoneIcon src={beer} />
                                </Milestone>
                                <Milestone>
                                    0
                                </Milestone>
                            </MilestoneDiv>
                        </ProgressBarDiv>
                    </TimerAndProgressBar>
                    <Subtitle ref={guidanceRef}>
                        {guidanceText}
                    </Subtitle>
                </Content>
                <ButtonDiv ref={buttonRef}>
                    <Button
                        onClick={decideWhatToDo}
                        staysOnBottom
                        isDisabled={!buttonEnabled}
                    >
                        {buttonText}
                    </Button>
                </ButtonDiv>
            </Mimic>
        </Background>
    );

    return (
        <Background noImage>
            <Header exit participants={turnVisibility}/>
            <Mimic>
                <Content>
                    <SandWatchDiv>
                        <Glass>
                            <Sand ref={sandRef}>
                                &nbsp;
                            </Sand>
                        </Glass>
                        <SandWatch src={sandWatch} ref={glassRef}/>
                    </SandWatchDiv>
                    <GuessGuidance>
                        {timeStamp}
                        <Subtitle>
                            {guidanceText}
                        </Subtitle>
                    </GuessGuidance>
                </Content>

                <Content ref={guessProgressRef}>
                    <GuessProgressTitle>
                        PROGRESSO DO TIME:
                    </GuessProgressTitle>
                    <GuessProgressDiv>
                        <ProgressTitle>
                            <ProgressText />
                        </ProgressTitle>
                        <ProgressBar>
                            <Progress ref={progressRef}/>
                        </ProgressBar>
                        <MilestoneDiv>
                            <Milestone>
                                2
                                <MilestoneIcon src={beer} />
                                <MilestoneIcon src={beer} />
                            </Milestone>
                            <Milestone>
                                1 <MilestoneIcon src={beer} />
                            </Milestone>
                            <Milestone>
                                0
                            </Milestone>
                        </MilestoneDiv>
                    </GuessProgressDiv>
                </Content>
            </Mimic>
        </Background>
    )
}
