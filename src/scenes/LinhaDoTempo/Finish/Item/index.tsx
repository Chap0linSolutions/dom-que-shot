import { useLayoutEffect } from "react";
import { Status } from "../../LinhaDoTempo";
import crown from '../../../../assets/crown.png';
import beer from '../../../../assets/beer.png';
import dnf from '../../../../assets/no-votes.png';
import gsap from 'gsap';
import { CorrectIcon, WrongIcon, DNFIcon, ItemBackground, LeftSide, DNFGuess, LeftText, Name, RightText, RightSide, SubtitleBackground, SubtitleLeft, SubtitleRight } from "./Item.style";

interface ItemProps {
    subtitle?: boolean,
    name?: string,
    guess?: number,
    diff?: number,
    bestAnswer?: boolean,
}

export default function Item({subtitle, name, guess, bestAnswer, diff}: ItemProps){

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
    
    if(subtitle){
        return (
            <SubtitleBackground>
                <SubtitleLeft>
                    <LeftText>resposta</LeftText>
                </SubtitleLeft>
                <SubtitleRight>
                    <RightText>diferença</RightText>
                </SubtitleRight>
            </SubtitleBackground>
        );
    }

    if(bestAnswer){
        return (
            <ItemBackground>
                <LeftSide>
                    <Name>{name}</Name>
                    <LeftText>{guess}</LeftText>
                </LeftSide>
                <RightSide>
                    <RightText style={{color: 'lime'}}>
                        {(diff === 0)? 'wow!' : diff}
                    </RightText>
                    <CorrectIcon src={crown}/>
                </RightSide>
            </ItemBackground>
        );
    }
    if(guess !== Status.DISCONNECTED && guess !== Status.TIMESUP){
        return (
            <ItemBackground>
                <LeftSide>
                    <Name>{name}</Name>
                    <LeftText>{guess}</LeftText>
                </LeftSide>
                <RightSide>
                    <RightText>
                        {diff}
                    </RightText>
                    <WrongIcon src={beer} className="icon"/>
                </RightSide>
            </ItemBackground>
        );
    }

    return (
        <ItemBackground>
            <LeftSide>
                {name}
            </LeftSide>
            <DNFGuess>
                {(guess === Status.DISCONNECTED)
                    ? <>caiu antes<br/>de jogar</>
                    : <>não jogou<br/>a tempo</>
                }
                <DNFIcon src={dnf} className="icon"/>
            </DNFGuess>
        </ItemBackground>
    );
}