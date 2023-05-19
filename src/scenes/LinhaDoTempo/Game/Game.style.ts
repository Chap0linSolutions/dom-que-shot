import styled from "@emotion/styled";

export const Game = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PhraseDiv = styled.div`
    width: 100%;
    background: #403a55;
    font-size: 20px;
    font-family: Roboto;
    color: rgba(255, 255, 255, 0.9);
    padding: 22px;
    border-radius: 20px 0 20px;
    text-align: center;
    border-left: 10px solid #800080;
    border-right: 10px solid #800080;
    @media(max-height: 740px){
        font-size: 18px;
        padding: 19px;
    }
`;

export const Options = styled.div`
    margin-top: 20px;
    width: 100%;    
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LeftSide = styled.div`
    flex-shrink: 0;
    height: 100%;
    width: 40px;
    border-right: 5px solid #8877df;
    border-radius: 20px;
`;

export const RightSide = styled(LeftSide)`
    border-left: 5px solid #8877df;
    border-right: none;
`;

const Option = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 20px 50px;
    margin: 10px 40px;
    border-radius: 15px;
    @media(max-height: 740px){
        padding: 16px 40px;
        font-size: 21px;
        margin: 8px 30px;
    }
`;

export const Unselected = styled(Option)`
    color: rgba(0, 0, 0, 0.6);
    background: rgba(255, 255, 255, 0.6); 
`;

export const Selected = styled(Option)`
    color: rgba(255, 255, 255, 0.6);
    background: #8877df; 
`;