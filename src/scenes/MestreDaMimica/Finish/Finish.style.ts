import styled from "@emotion/styled";

export const Mimic = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    overflow: hidden;
    @media(max-height: 740px){
        padding: 27px;
    }
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.p`
    width: 100%;
    text-align: center;
    font-size: 22px;
    font-family: Adumu;
    margin-bottom: 5px;
    @media(max-height: 740px){
        font-size: 21px;
    }
`;

export const Subtitle = styled.p`
    width: 100%;
    text-align: center;
    font-size: 18px;
    margin: 0;
    color: rgba(255, 255, 255, 0.5);
    @media(max-height: 740px){
        font-size: 16px;
    }
`;

export const NamesDiv = styled.div`
    margin: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
`;

export const Result = styled.div`
    width: 100%;
    height: 40px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 20px;
    display: flex;
    justify-content: center;
    @media(max-height: 740px){
        height: 36px;
        font-size: 18px;
    }
`;

const Name = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    width: 90%;
    height: 80px;
    padding: 0 20px;
    background: #403a55;
`;

export const CorrectName = styled(Name)`
    border: 2px solid #f9c95c;
`;

export const WrongName = styled(Name)`
    border: 2px solid #999999;
`;

export const Word = styled.p`
    margin: 0;
    font-size: 20px;
    color: white;
    font-weight: 600;
    @media(max-height: 740px){
        font-size: 18px;
    }
`;

export const WrongWord = styled(Word)`
    color: #999999;
`;

export const Category = styled.p`
    margin: 0;
    font-size: 15px;
    color: #999999;
    @media(max-height: 740px){
        font-size: 14px;
    }
`;

export const WordAndCategory = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
`;

export const SideMarker = styled.div`
    width: 40px;
    height: 100%;
    background: #f9c95c;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const WrongSideMarker = styled(SideMarker)`
    background: #999999;
`;