import React, { useEffect, useRef } from "react";
import { Suggestion } from "../MestreDaMimica";
import Background from "../../../components/Background";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import gsap from 'gsap';
import { Category, Content, CorrectName, Mimic, NamesDiv, Result, SideMarker, Subtitle, Title, Word, WordAndCategory, WrongName, WrongSideMarker, WrongWord } from "./Finish.style";
import { CheckCircle, X } from "react-feather";

interface FinishProps {
    turnVisibility: boolean,
    suggestions: Suggestion[],
    correctGuesses: Suggestion[],
    endGame: () => void,
}

const title = (names) => {
    switch(names.length){
        case 1: return 'Vocês acertaram 1 nome!';
        case 2: return 'Vocês conseguiram 2 nomes!';
        case 3: return 'BOAA! Acertaram os 3 nomes';
        default: return 'IHHH... ninguém acertou nada!';
    }
}

const subtitle = (names) => {
    switch(names.length){
        case 1: return 'bom, melhor do que nada';
        case 2: return 'nada além da obrigação';
        case 3: return 'que tal beber pra comemorar? rs';
        default: return 'certeza que a culpa foi do mímico?';
    }
}

const result = (names) => {
    switch(names.length){
        case 0: return 'Todo mundo bebe 2 doses';
        case 1: return 'Todo mundo bebe 1 dose';
        default: return 'Só bebe quem quiser';
    }
} 

const FINAL_SIZE = (innerHeight <= 740)? 330 : 360;

export default function FinishPage({turnVisibility, suggestions, correctGuesses, endGame}: FinishProps){

    const buttonRef = useRef(null);
    const namesRef = useRef(null);
    const resultsRef = useRef(null);
    
    useEffect(() => {
        gsap.timeline().to(buttonRef.current, {
            y: 200,
            duration: 0,
        }).to(resultsRef.current, {
            opacity: 0,
            duration: 0,
        }).to('.names', {
            opacity: 0,
            duration: 0,
        }).to(namesRef.current, {
            width: 0,
            height: 0,
            duration: 0,
        }).to(namesRef.current, {
            width: 420,
            height: 320,
            duration: 1,
            ease: 'power3',
        }).to(namesRef.current, {
            width: FINAL_SIZE,
            height: FINAL_SIZE,
            duration: 1,
            ease: 'back',
        }).to('.names', {
            opacity: 1,
            duration: 1,
            ease: 'power2',
        }).to(resultsRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2',
        }).to(buttonRef.current, {
            y: 0,
            duration: 1,
            ease: 'back',
        });
    }, []);

    return (
        <Background>
            <Header exit/>
            <Mimic>
                <Content>
                    <Title>
                        {title(correctGuesses)}
                    </Title>
                    <Subtitle>
                        {subtitle(correctGuesses)}
                    </Subtitle>

                    <NamesDiv ref={namesRef}>
                        {suggestions.map(n => {
                            if(correctGuesses.find(c => c.word === n.word)){
                                return (
                                    <CorrectName>
                                        <WordAndCategory className='names'>
                                            <Word>
                                                {n.word}
                                            </Word>
                                            <Category>
                                                {n.category}
                                            </Category>
                                        </WordAndCategory>
                                        <SideMarker>
                                            <CheckCircle width={30} color="#403a55"/>
                                        </SideMarker>
                                    </CorrectName>
                                )
                            }
                            return (
                                <WrongName>
                                    <WordAndCategory className='names'>
                                        <WrongWord>
                                            {n.word}
                                        </WrongWord>
                                        <Category>
                                            {n.category}
                                        </Category>
                                    </WordAndCategory>
                                    <WrongSideMarker>
                                        <X width={30} color="#403a55"/>
                                    </WrongSideMarker>
                                </WrongName>
                            )
                        })}
                        <Result ref={resultsRef}>
                            {result(correctGuesses)}
                        </Result>
                    </NamesDiv>
                </Content> 
                {turnVisibility && 
                    <Content ref={buttonRef}>
                        <Button staysOnBottom onClick={endGame}>
                            Próxima rodada
                        </Button>
                    </Content>
                }
            </Mimic>
        </Background>
    )
}