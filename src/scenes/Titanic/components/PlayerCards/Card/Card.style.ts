import styled from "@emotion/styled";

const Card = styled.div`
    margin: 5px 0;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
`;

export const TitanicCard = styled(Card)`
    background: #4c4c4c;
    border-left: 5px solid #ef4f59;
`;

export const IcebergCard = styled(Card)`
    background: #177797;
    border-left: 5px solid #358fb0;
`;

export const Nickname = styled.p`
    max-width: 132px;
    font-size: 16px;
    color: white;
    font-weight: 500;
    margin: 0;
    margin-left: 5px;
    text-overflow: ellipsis; 
    white-space: nowrap;
    overflow: hidden;
    @media(max-height: 740px){
        font-size: 14px;
        max-width: 120px;
    }
`;

export const IcebergNickname = styled(Nickname)``;

export const AvatarDiv = styled.div`
    width: 35px;
    height: 35px;
    margin-left: 3px;
`;

export const Icon = styled.img`
    width: 25px;
    height: 25px;
    object-fit: cover;
    @media(max-height: 740px){
        width: 22px;
        height: 22px;
    }
`;

export const AvatarAndName = styled.div`
    display: flex;
    align-items: center;  
`;

export const Ships = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6ecd7;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border-left: 5px solid #ef4f59;
    border-right: 5px solid #ef4f59;
    height: 50px;
`;

export const Icebergs = styled(Ships)`
    background: #358fb0;
    border-left: none;
    border-right: 5px solid #358fb0;
    padding: 0 10px;
`;

export const IcebergCount = styled.p`
    margin: 0 5px;
    font-size: 16px;
    color: #white;
    font-weight: 700;
    @media(max-height: 740px){
        font-size: 14px;
    }
`;

export const Titanic = styled(Icon)`
    width: 30px;
    height: 20px;
    transform: rotate(-60deg);
    @media(max-height: 740px){
        width: 24px;
        height: 18px;
        transform: rotate(-90deg);
    }
`;

export const DisconnectedText = styled.p`
    color: red;
    font-size: 14px;
    line-height: 14px;
    margin: 0 10px;
    font-weight: 500;
    text-align: center;
    @media(max-height: 740px){
        font-size: 12px;
    }
`;

export const GotNoOneText = styled(DisconnectedText)`
    margin: 0;
    color: white;
`;