import { useRef, useState } from "react";
import Background from "../../../components/Background";
import Header from "../../../components/Header";
import { PhraseAndOptions } from "../LinhaDoTempo";
import Popup from "../../../components/Popup";
import { Content, Game, PhraseDiv, Timer } from "./Game.style";
import Button from "../../../components/Button";


interface GameProps {
    phraseAndOptions: PhraseAndOptions,
    gameDescription: string | JSX.Element,
    gameName: string,
}

export default function GamePage({phraseAndOptions, gameDescription, gameName}: GameProps){

    const phrase = useRef(phraseAndOptions.phrase).current;
    const options = useRef(phraseAndOptions.options).current;
    const [popupVisibility, setPopupVisibility] = useState<boolean>(false);

    return (
        <Background>
            <Popup
                type="info"
                title={gameName}
                description={gameDescription}
                show={popupVisibility}
                exit={() => setPopupVisibility(false)}
                comesFromTop
            />
            <Header exit infoPage={() => setPopupVisibility(true)}/>
            <Game>
                <Content>
                    <Timer>
                        00:00
                    </Timer>
                    <PhraseDiv>
                        {phrase}
                    </PhraseDiv>
                </Content>

                <Button staysOnBottom>
                    Votar
                </Button>
            </Game>
        </Background>
    )
}