import styled from "@emotion/styled";

export const Finish = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
`;

export const Content = styled(Finish)`
    flex: 0;
    justify-content: flex-start;
`;

export const AnswerDiv = styled.div`
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    position: relative;
    border: 4px solid #800080;
    background: #403a55;
    border-radius: 50%;
    margin-bottom: 10px;
`;

export const AnswerTile = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: #800080;
    border-radius: 15px;
    border-left: 5px solid #403a55;
    border-right: 5px solid #403a55;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 30px;
`;

export const AnswerText = styled.p`
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    white-space: nowrap;
    width: 100%;
    padding-top: 5px;
    @media(max-height: 740px){
        font-size: 15px;
    }
`;

export const Answer = styled.p`
    margin: 0;
    font-family: Roboto;
    color: white;
    font-size: 24px;
    font-weight: 700;
    padding: 5px;
    @media(max-height: 740px){
        font-size: 21px;
        padding-top: 2px;
    }
`;

export const GuidanceText = styled.p`
    color: rgba(255, 255, 255, 0.7); 
    margin: 0;
    font-size: 18px;
    margin: 10px;
    text-align: center;
    @media(max-height: 740px){
        font-size: 16px;
    }
`;