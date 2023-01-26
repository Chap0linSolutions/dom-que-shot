import styled from "@emotion/styled";

const smallScreen = (window.innerHeight < 740);
const normalTextSize = (smallScreen)? 18 : 20;      //applied on GuidanceText and PlayerNickname 
const largeTextSize = (smallScreen)? 20 : 22;       //applied on OtherName and YourName 
const hideIconSize = (smallScreen)? 40 : 50;
const cardHeight = (smallScreen)? 72 : 80;

export const GameDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`;

export const Content = styled.div`
    width: 100%;
`;

export const PlayerList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 0 20px 0;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const TextAndHide = styled.div`
    margin: 0 5% 8px 5%; 
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const GuidanceText = styled.p`
    font-size: ${normalTextSize}px;
    font-weight: 500;
    margin: 0;
`;

export const HideNames = styled.div`
    background: #403A55;
    width: ${hideIconSize}px;
    height: ${hideIconSize}px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const Card = styled.div`
    width: 90%;
    height: ${cardHeight}px;
    background-color: #403A55;
    border-radius: 10px;
    margin: 4px;
    display: flex;
    align-items: center;
`;

export const Detail = styled.div`
    width: 8px;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: #8877DF;
    font-size: 2px;
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 16px 0 0 8px;
`;

export const OthersName = styled.p`
    font-family: 'Roboto';
    font-size: ${largeTextSize}px;
    font-weight: 500;
    color: white;
    margin: 0;
`;

export const YourName = styled.p`
    font-family: 'Roboto';
    font-size: ${largeTextSize}px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
`;

export const WhoGotThisName = styled.div`
    align-self: flex-end;
    display: flex;
    align-items: center;
    height: 30px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px 0 10px 0;
    padding: 0 10px;
    min-width: 120px;
`;

export const CategoryAndPlayer = styled.div`
    height: 38px;
    display: flex;
    justify-content: space-between;
`;

export const PlayerNickname = styled.p` 
    font-family: 'Roboto';
    font-weight: 500;
    font-size: ${normalTextSize}px;
    color: rgba(0, 0, 0, 0.54);
    margin: 0 8px;
`;

export const PlayerAvatar = styled.div`
    width: 24px;
    height: 24px;
`;

export const Category = styled.p`
    margin: 0;
    font-size: 12px;
    max-width: 50%;
    line-height: 14px;
    color: rgba(255, 255, 255, 0.54)
`;

