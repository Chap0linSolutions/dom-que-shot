import styled from "@emotion/styled";

export const Finish = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SpaceDiv = styled.div`
  height: 120px;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  font-family: Adumu;
  @media (max-height: 740px){
   font-size: 21px;
  }
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: 20px;
  margin: 10px 4px;
  @media (max-height: 740px){
    font-size: 18px;
  }
`;

export const OuterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-top: 2em;
  width: 230px;
  height: 304px;
  background: #403a55;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media (max-height: 740px){
    width: 207px;
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
  @media (max-height: 740px){
    width: 133px;
    height: 190px;
  }
`;

export const AvatarDiv = styled.div`
  height: 100px;
  width: 100px;
  @media (max-height: 740px){
    width: 90px;
    height: 90px;
  }
`;

export const ResultsButtons = styled.div`
  padding: 3em;
  display: flex;
  flex-direction: column;
`;

export const NoVotesImg = styled.img`
  height: 100px;
  object-fit: scale-down;
  @media (max-height: 740px){
    height: 85px;
  }
`;

export const NoVotesOuter = styled(OuterCard)`
  background-color: #222222;
  @media (max-height: 740px){
    margin-top: 0.5em;
  }
`;

export const NoVotesInner = styled(InnerCard)`
  background-color: #333333;
`;

export const NoVotesText = styled(Text)`
  margin: 1.5em;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  @media (max-height: 740px){
    margin: 1em;
    font-size: 18px;
  }
`;

export const Tie = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TieOuter = styled(OuterCard)`
  width: 170px;
  height: 284px;
  margin-right: 12px;
  margin-left: 12px;
  @media(max-height: 740px){
    width: 153px;
    height: 256px;
    margin-left: 6px;
    margin-right: 6px;
  }
`;

export const TieInner = styled(InnerCard)`
  width: 120px;
  height: 190px;
  @media (max-height: 740px){
    width: 108px;
    height: 171px;
  }
`;

export const TieAvatar = styled(AvatarDiv)`
  width: 90px;
  height: 90px;
  @media (max-height: 740px){
    width: 81px;
    height: 81px;
  }
`;

export const TieText = styled(Text)`
  font-size: 18px;
  margin: 4px;
`;

export const MultipleTiesTitle = styled(Title)`
  margin-top: 60px;
  @media (max-height: 740px){
    margin-top: 40px;
  }
`;

export const TieTitle = styled(Text)`
  font-size: 20px;
  text-align: center;
  margin-top: 26px;
  margin-bottom: 12px;
  @media (max-height: 740px){
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 18px;
  }
`;

export const MultipleTies = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MultipleTiesOuter = styled(OuterCard)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  height: auto;
  margin-top: 0;
  margin-bottom: 12px;
  border-radius: 20px;
  padding: 12px;
  @media (max-height: 740px){
    padding: 10px;
    margin-bottom: 8px;
    width: 80%;
    height: auto;
  }
`;

export const MultipleTiesInner = styled(InnerCard)`
  border-radius: 20px;
  width: 120px;
  height: 120px;
  margin-right: 8px;
  @media (max-height: 740px){
    width: 100px;
    height: 100px;
  }
`;

export const MultipleTiesAvatar = styled.div`
  padding: 1em;
  width: 100%;
  height: 100%;
  @media (max-height: 740px){
    padding: 0.8em;
  }
`;

export const MultipleTiesTextDiv = styled.div``;

export const MultipleTiesText = styled.p`
  font-family: Adumu;
  font-size: 24px;
  margin: 4px;
  @media (max-height: 740px){
    font-size: 21px;
  }
`;
