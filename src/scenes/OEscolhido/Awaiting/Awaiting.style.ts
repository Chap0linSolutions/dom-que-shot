import styled from "@emotion/styled";


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  @media(max-height: 740px){
    font-size: 21px;
  }
`;

export const Text = styled.p`
  font-weight: 500;
  margin: 1em;
  font-size: 22px;
  text-align: center;
  @media(max-height: 740px){
    margin: 0.8em;
    font-size: 20px;
  }
`;

export const Check = styled.div`
  margin: 1em;
  width: 35px;
  height: 35px;
  z-index: 0;
  @media(max-height: 740px){
    margin: 0.8em;
    width: 32px;
    height: 32px;
  }
`;

export const OuterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 210px;
  height: 304px;
  background: #403a55;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 1;
  margin-bottom: 3em;
  @media(max-height){
    margin-bottom: 2.7em;
    width: 189px;
    height: 274px;
  }
`;

export const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 148px;
  height: 211px;
  background: #8877df;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media(max-height: 740px){
    width: 134px;
    height: 191px;
  }
`;

export const AvatarDiv = styled.div`
  width: 100px;
  height: 100px;
  @media(max-height: 740px){
    width: 90px;
    height: 90px;
  }
`;
