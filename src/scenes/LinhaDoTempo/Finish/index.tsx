import { useRef } from "react";
import { Results } from "../LinhaDoTempo";
import Background from "../../../components/Background";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import Item from "./Item";
import { Answer, AnswerDiv, AnswerText, AnswerTile, Content, Finish, GuidanceText } from "./Finish.style";

interface FinishProps {
    turnVisibility: boolean,
    results: Results,
    backToRoulette: () => void,
}

export default function FinishPage({turnVisibility, results, backToRoulette}: FinishProps){

    const winners = useRef(results.guesses.filter(p => p.guess === results.answer)).current;
    const losers = useRef(results.guesses.filter(p => (p.guess !== results.answer) && (typeof p.guess === 'string'))).current;
    const dnf = useRef(results.guesses.filter(p => typeof p.guess === 'number')).current;
    const answer = useRef(results.answer).current;

    let guidanceText = 'Quem errou (ou não jogou) bebe!';

    if(losers.length === 0 && dnf.length === 0){
        guidanceText = 'Nossa, ninguém errou? Top demais!' 
    }

    return (
        <Background>
            <Header participants={turnVisibility} exit/>
            <Finish>
                <Content>
                    <AnswerDiv>
                        <AnswerTile>
                            <AnswerText>
                                e a resposta era:
                            </AnswerText>
                            <Answer>
                                {answer}
                            </Answer>
                        </AnswerTile>
                    </AnswerDiv>
                    <GuidanceText>
                        {guidanceText}
                    </GuidanceText>
                    {winners.map(p => (
                        <Item
                            name={p.player}
                            guess={p.guess}
                            correct={true}
                        />
                    ))}
                    {losers.map(p => (
                        <Item
                            name={p.player}
                            guess={p.guess}
                            correct={false}
                        />
                    ))}
                    {dnf.map(p => (
                        <Item
                            name={p.player}
                            guess={p.guess}
                            correct={false}
                        />
                    ))}
                </Content>
                <Content>
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