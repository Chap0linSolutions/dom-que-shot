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

export const LeftSide = styled.div`
    flex: 1;
    height: 100%;
    left: 16px;
    top: 205px;
    background: #403A55;
    border-left: 5px solid #800080;
    border-radius: 0 0 0 15px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-size: 17px;
    font-weight: 500;
    color: white;
    padding-left: 10px;
`;

const RightSide = styled.div`
    height: 100%;
    font-size: 18px;
    font-weight: 600;
    color: white;
    border-radius: 0 30px 30px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #302b40;
    padding-left: 10px;
`;

export const CorrectGuess = styled(RightSide)`
    color: lime;
`;

export const WrongGuess = styled(RightSide)`
    color: red;
`;

export const DNFGuess = styled(RightSide)`
    color: #ad0909;
    background: #AAAAAA;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    margin: 0;
`;

const Icon = styled.img`
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 8px;
    margin: 0 5px 0 10px;
`;

export const CorrectIcon = styled(Icon)`
    background: #f9c95c;
`;

export const WrongIcon = styled(Icon)`
    background: #403a55;
`;

export const DNFIcon = styled(Icon)`
    background: black;
    margin: 0 5px 0 5px;
`;

