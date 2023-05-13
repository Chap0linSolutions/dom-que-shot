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

export const Timer = styled.p`
align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    font-size: 22px;
    color: white;
    font-family: Adumu;
    border-radius: 10px 10px 0 0;
    margin: 0;
    background: rgba(255, 255, 255, 0.54);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const PhraseDiv = styled.div`
    width: 100%;
    background: #403a55;
    font-size: 20px;
    font-family: Roboto;
    color: rgba(255, 255, 255, 0.9);
    padding: 22px;
    border-radius: 20px 0 20px 20px;
    text-align: center;
`;