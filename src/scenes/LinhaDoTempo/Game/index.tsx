import { useRef, useState } from "react";
import { PhraseAndOptions } from "../LinhaDoTempo";
import { Content, Game, Selected, Unselected, Options, PhraseDiv, LeftSide, RightSide } from "./Game.style";
import Background from "../../../components/Background";
import Header from "../../../components/Header";
import Button from "../../../components/Button";

interface GameProps {
    phraseAndOptions: PhraseAndOptions,
    timeLeft: number,
    turnVisibility: boolean,
    sendGuess: (value) => void,
}

export default function GamePage({phraseAndOptions, timeLeft, turnVisibility, sendGuess}: GameProps){

    const phrase = useRef(phraseAndOptions.phrase).current;
    const options = useRef(phraseAndOptions.options).current;
    const [guess, setGuess] = useState<string | number | undefined>(undefined);

    return (
        <Background>
            <Header
                participants={turnVisibility}
                timer={timeLeft}
            />
            <Game>
                <Content>
                    <PhraseDiv>
                        {phrase}
                    </PhraseDiv>
                    <Options>
                        <LeftSide/>
                        <Content>
                        {options.map((option) => {
                            if(guess === option){
                                return (
                                    <Selected onClick={() => setGuess(undefined)}>
                                        {option}
                                    </Selected>
                                )
                            } else {
                                return (
                                    <Unselected onClick={() => setGuess(option)}>
                                        {option}
                                    </Unselected>
                                )
                            }
                        })}
                        </Content>
                        <RightSide/>
                    </Options>
                </Content>

                <Button isDisabled={!guess} staysOnBottom onClick={() => sendGuess(guess)}>
                    Confirmar
                </Button>
            </Game>
        </Background>
    )
}