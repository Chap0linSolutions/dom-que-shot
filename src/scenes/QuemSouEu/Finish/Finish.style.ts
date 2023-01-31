import styled from "@emotion/styled";

export const FinishDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
`;

const PlayersDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  background: #403a55;
  margin: 0 30px 20px 30px;
`;

export const WinnersDiv = styled(PlayersDiv)`
  border: 2px solid #F9C95C;
`;

export const LosersDiv = styled(PlayersDiv)`
  border: 2px solid #8877df;
  margin: 0 30px;
`;

export const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-height: 740px){
    padding: 5px;
  }  
`;

export const IconDiv = styled.div`
  align-self: flex-end;
  border-radius: 10px 0 15px 0;
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

export const Title = styled.p`
  margin: 10px 40px;
  font-size: 22px;
  font-weight: 500;
  font-family: 'Roboto';
  display: flex;
  align-items: center;
  @media (max-height: 740px){
    font-size: 18px;
  }  
`;

export const PlayerOuterCard = styled.div` 
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 8px;
`;

export const AvatarDiv = styled.div`    
  background-color: #8877df;
  border-radius: 20px;
  padding: 10px;
  margin-right: 8px;
  width: 105px;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-height: 740px){
    width: 80px;
    height: 80px;
    padding: 7px;
  }  
`;

export const NameAndRole = styled.div`  
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: calc(100% - 158px);
  @media (max-height: 740px){
    max-width: calc(100% - 88px);
  }
`;

export const Name = styled.p`   
  font-family: Adumu;
  font-size: 24px;
  margin: 2px 4px;
  @media (max-height: 740px){
    font-size: 21px;
  }  
`;

export const Role = styled.p`
  font-size: 18px;
  margin: 2px 4px;
  @media (max-height: 740px){
    font-size: 16px;
  }  
`;

export const ButtonDiv = styled.div``;
