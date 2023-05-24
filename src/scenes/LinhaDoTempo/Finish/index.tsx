import { useRef, useEffect } from "react";
import { Results } from "../LinhaDoTempo";
import Background from "../../../components/Background";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import Item from "./Item";
import gsap from 'gsap';
import { Status } from "../LinhaDoTempo";
import { Answer, AnswerDiv, AnswerText, AnswerTile, Content, Finish, GuidanceText } from "./Finish.style";

interface FinishProps {
    turnVisibility: boolean,
    results: Results,
    backToRoulette: () => void,
}

const getOrganizedResults = (results: Results) => {
    const validGuesses = results.guesses.filter(g => g.guess !== Status.TIMESUP && g.guess !== Status.DISCONNECTED);
    const organizedGuesses = validGuesses.map(vg => ({
        ...vg,
        diff: Math.abs(vg.guess - results.answer),
    }))

    return organizedGuesses.sort((a, b) => a.diff - b.diff);
}

const getGuidanceText = (players: {diff: number; player: string; guess: number;}[], answer: number) => {
    if(players.length === 0) return (
        <>Tragédia total! Todo mundo bebe.</>
    )

    const top = players.filter(p => p.guess === players[0].guess);
    const bullseye = (players[0].guess === answer);

    if(top.length === players.length){
        return (bullseye)
        ?<>Todo mundo acertou em cheio!<br/>Neste caso, ninguém bebe. Nerds.</>
        :<>Todo mundo empatou!<br/>Neste caso, ninguém bebe.</>;
    }

    if(top.length > 1){
        return (bullseye)
        ?<>{top.length} jogadores acertaram em cheio!<br/>Neste caso, quem não empatou bebe 2x.</>
        :<>Um empate! que coisa mais linda.<br/>Neste caso, quem não empatou bebe.</>;
    } 
    return (bullseye)
    ?<>{top[0].player} acertou em cheio!<br/>Neste caso, os demais bebem 2x.</>
    :<>{top[0].player} foi quem chegou mais perto!<br/>Neste caso, todos os demais bebem.</>;
}

export default function FinishPage({turnVisibility, results, backToRoulette}: FinishProps){
    const answer = useRef(results.answer).current;
    const dnf = useRef(results.guesses.filter(p => p.guess === Status.TIMESUP)).current;
    const disc = useRef(results.guesses.filter(p => p.guess === Status.DISCONNECTED)).current;
    const whoGuessed = useRef(getOrganizedResults(results)).current;

    const buttonRef = useRef(null);
    const answerDivRef = useRef(null);
    const tileRef = useRef(null);
    const playersRef = useRef(null);
    const textRef = useRef(null);

    const guidanceText = getGuidanceText(whoGuessed, answer);

    useEffect(() => {
        gsap.timeline().to(answerDivRef.current, {
           scale: 0,
           duration: 0, 
        }).to(answerDivRef.current, {
           scale: 1,
           duration: 1,
           ease: 'back',
        });

        gsap.timeline().to(tileRef.current, {
            opacity: 0,
            scale: 0,
            duration: 0,
            rotate: 45,
       }).to(tileRef.current, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            delay: 0.25,
            ease: 'back',
       });

       gsap.timeline().to(playersRef.current, {
            opacity: 0,
            duration: 0,
       }).to(textRef.current, {
            opacity: 0,
            duration: 0,
       }).to(playersRef.current, {
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: 'linear',
       }).to(textRef.current, {
            opacity: 1,
            duration: 1,
       });

       gsap.timeline().to(buttonRef.current, {
            opacity: 0,
            y: 200,
            duration: 0,
        }).to(buttonRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 2,
            ease: 'back',
       });
       
    }, []);

    return (
        <Background>
            <Header participants={turnVisibility} exit/>
            <Finish>
                <Content>
                    <AnswerDiv ref={answerDivRef}>
                        <AnswerTile ref={tileRef}>
                            <AnswerText>
                                e a resposta era:
                            </AnswerText>
                            <Answer>
                                {answer}
                            </Answer>
                        </AnswerTile>
                    </AnswerDiv>

                    <Content ref={playersRef}>
                        <Item subtitle/>
                        {whoGuessed.map((p, i) => (
                            <Item
                                key={i}
                                name={p.player}
                                guess={p.guess}
                                diff={p.diff}
                                bestAnswer={p.diff === whoGuessed[0].diff}
                            />
                        ))}
                        {dnf.map((p, i) => (
                            <Item
                                key={i}
                                name={p.player}
                                guess={p.guess}
                                bestAnswer={false}
                            />
                        ))}
                        {disc.map((p, i) => (
                            <Item
                                key={i}
                                name={p.player}
                                guess={p.guess}
                                bestAnswer={false}
                            />
                        ))}
                    </Content>
                    <GuidanceText ref={textRef}>
                        {guidanceText}
                    </GuidanceText>
                </Content>
                <Content ref={buttonRef}>
                    {turnVisibility && 
                        <Button staysOnBottom onClick={backToRoulette}>
                            Continuar
                        </Button>
                    }
                </Content>
            </Finish>
        </Background>
    )
}