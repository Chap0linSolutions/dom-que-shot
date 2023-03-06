import Avatar from "../../../../../components/Avatar";
import ship from '../../../assets/ship.png';
import shipWithIceberg from '../../../assets/iceberg-on-ship.png';
import iceberg from '../../../assets/iceberg.png';
import { IcebergCard, Nickname, TitanicCard, Titanic, AvatarDiv, Ships, Icebergs, Icon, AvatarAndName, IcebergCount, DisconnectedText, GotNoOneText } from "./Card.style";

interface CardProps {
    avatarSeed: string,
    nickname: string,
    titanic: boolean,
    hits?: number,
    icebergsHaveAppeared?: boolean,
    disconnectedBeforePlaying?:boolean,
    gotNoOne?: boolean,
    someonePlayed?: boolean,
}

export default function Card({avatarSeed, nickname, titanic, hits, icebergsHaveAppeared, disconnectedBeforePlaying, someonePlayed, gotNoOne}:CardProps){

    const fallenText = (disconnectedBeforePlaying)
    ? <DisconnectedText>
        caiu antes<br/>de jogar
      </DisconnectedText>
    : null;

    const noOnePlayed = (!someonePlayed && !gotNoOne)
    ? <GotNoOneText>
        não restou<br/>ninguém
      </GotNoOneText>
    : null;

    const gotNoOneText = (gotNoOne && someonePlayed)
    ? <GotNoOneText>
        Não acertou<br/>ninguém (bebe)
      </GotNoOneText>
    : null;

    const icebergContent = (!gotNoOne && someonePlayed)
    ? <>
        <IcebergCount>
            {hits}
        </IcebergCount>
        <Icon key={Math.random()} src={iceberg}/>
      </>
    : null;

    const CardBackground = (titanic)
    ? TitanicCard
    : IcebergCard;

    const survivors = [];
    const sunken = [];

    for(let i=0; i < 3; i++){
        if(icebergsHaveAppeared && hits && i < hits){
            sunken.push(<Titanic key={i * Math.random()} src={shipWithIceberg}/>);
        } else if(!disconnectedBeforePlaying) {
            survivors.push(<Titanic key={i * Math.random()} src={ship}/>);
        }
    }

    const cardContent = (titanic)
    ? <>
        <Ships>
            {sunken}
            {survivors}
            {fallenText}
        </Ships>
    </> 
    : <>
        <Icebergs>
            {icebergContent}
            {gotNoOneText}
            {noOnePlayed}
        </Icebergs>
    </>;

    return ( 
        <CardBackground>
            <AvatarAndName>
                <AvatarDiv>
                    <Avatar seed={avatarSeed}/>
                </AvatarDiv>
                <Nickname>
                    {nickname}
                </Nickname>
            </AvatarAndName>
            {cardContent}
        </CardBackground>
    )
}