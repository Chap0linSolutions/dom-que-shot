import styled from "@emotion/styled";

export const ItemBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 5px 0;
    height: 54px;
    @media(max-height: 740px){
        height: 48px;
    }
`;

export const SubtitleBackground = styled(ItemBackground)`
    height: 30px;
    @media(max-height: 740px){
        height: 30px;
    }
`;

export const LeftSide = styled.div`
    flex: 1;
    height: 100%;
    background: #403a55;
    border-left: 5px solid #800080;
    border-radius: 0 0 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
`;

export const SubtitleLeft = styled(LeftSide)`
    border: none;
    background: none;
    justify-content: flex-end;
`;

export const Name = styled.p`
    font-size: 17px;
    font-weight: 500;
    color: white;
`;

export const LeftText = styled(Name)`
    background: #302b40;
    min-width: 60px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px 0 0 20px;
    color: #AAAAAA;
    font-size: 15px;
    padding: 0 4px 0 8px;
`;

export const RightText = styled(Name)`
    background: #403a55;
    min-width: 50px;
    height: 30px;
    border-radius: 0 20px 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #AAAAAA;
    font-size: 15px;
    padding: 0 8px 0 4px;
`;

export const RightSide = styled.div`
    height: 100%;
    min-width: 110px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    border-radius: 0 30px 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #302b40;
    padding-right: 5px;
`;

export const SubtitleRight = styled(RightSide)`
    background: none;
`;

export const DNFGuess = styled(RightSide)`
    color: #ad0909;
    background: #AAAAAA;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    margin: 0;
    padding-left: 10px;
`;

const Icon = styled.img`
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 5px;
    margin: 0 5px 0 10px;
`;

export const CorrectIcon = styled(Icon)`
    transform: rotate(30deg);
`;

export const WrongIcon = styled(Icon)`
    padding: 6px;
`;

export const DNFIcon = styled(Icon)`
    background: black;
    margin: 0 5px 0 5px;
`;

