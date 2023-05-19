import { useLayoutEffect } from "react";
import { CorrectGuess, CorrectIcon, WrongIcon, DNFIcon, ItemBackground, LeftSide, WrongGuess, DNFGuess } from "./Item.style";
import crown from '../../../../assets/crown.png';
import beer from '../../../../assets/beer.png';
import dnf from '../../../../assets/no-votes.png';
import gsap from 'gsap';

interface ItemProps {
    name: string,
    guess: string | number,
    correct: boolean,
}

export default function Item({name, guess, correct}: ItemProps){

    useLayoutEffect(() => {
        const animation = gsap.to(".icon", {
            rotate: 360,
            duration: 5,
            repeat: -1,
            ease: 'linear',
        });

        return () => {
            animation.revert();
        }
    }, []);

    
    if(correct){
        return (
            <ItemBackground>
                <LeftSide>
                    {name}
                </LeftSide>
                <CorrectGuess>
                    {guess}
                    <CorrectIcon src={crown} className="icon"/>
                </CorrectGuess>
            </ItemBackground>
        );
    }
    if(typeof guess === 'string'){
        return (
            <ItemBackground>
                <LeftSide>
                    {name}
                </LeftSide>
                <WrongGuess>
                    {guess}
                    <WrongIcon src={beer} className="icon"/>
                </WrongGuess>
            </ItemBackground>
        );
    }

    const dnfMessage = (guess === -1)
    ? <>caiu antes<br/>de jogar</>
    : <>não jogou<br/>a tempo</>

    return (
        <ItemBackground>
            <LeftSide>
                {name}
            </LeftSide>
            <DNFGuess>
                {dnfMessage}
                <DNFIcon src={dnf} className="icon"/>
            </DNFGuess>
        </ItemBackground>
    );
}