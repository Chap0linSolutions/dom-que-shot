import styled from "@emotion/styled";

export const Results = styled.div`
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

export const ResultsTitle = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  font-family: Adumu;
`;

export const ResultsText = styled.p`
  font-weight: 500;
  font-size: 20px;
  margin: 10px 4px;
  height: 20px;
`;

export const ResultsOuterCard = styled.div`
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
`;

export const ResultsInnerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 148px;
  height: 211px;
  background: #8877df;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const ResultsAvatar = styled.div`
  width: 100px;
  height: 100px;
  object-fit: scale-down;
`;

export const ResultsButtons = styled.div`
  padding: 3em;
  display: flex;
  flex-direction: column;
`;

export const NoVotesOuterCard = styled(ResultsOuterCard)`
  background-color: #222222;
`;

export const NoVotesInner = styled(ResultsInnerCard)`
  background-color: #333333;
`;

export const NoVotesText = styled(ResultsText)`
  margin: 1.5em;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
`;

export const Tie = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const TieOuter = styled(ResultsOuterCard)`
  width: 160px;
  height: 304px;
`;

export const TieInner = styled(ResultsInnerCard)`
  width: 120px;
  height: 211px;
`;

export const TieAvatar = styled(ResultsAvatar)`
  width: 70px;
  height: 70px;
`;

export const TieText = styled(ResultsText)`
  font-size: 16px;
  margin: 4px;
`;

export const TieTitle = styled(ResultsText)`
  max-width: 260px;
  height: auto;
  font-size: 20px;
  text-align: center;
  margin-top: 26px;
  margin-bottom: 12px;
`;

export const TieSpacer = styled.div`
  padding: 8px;
`;

export const ResultsMultipleTies = styled.div`
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

export const MultipleTiesOuterCard = styled(ResultsOuterCard)`
  width: 80%;
  height: auto;
  margin-top: 0;
  margin-bottom: 8px;
  border-radius: 20px;
  padding: 8px;
`;

export const MultipleTiesInnerCard = styled(ResultsInnerCard)`
  border-radius: 20px;
  width: 120px;
  height: 120px;
  padding: 1em;
  margin-right: 8px;
`;

export const MultipleTiesText = styled.p`
  font-family: Adumu;
  font-size: 24px;
`;



// @media (max-height: 750px) {
//   .ResultsTitle {
//     margin: 0;
//     font-size: 22px;
//     font-weight: 500;
//     font-family: Adumu;
//   }

//   .SpaceDiv {
//     height: 0;
//   }

//   .OEscolhidoDiv {
//     margin-top: -5%;
//   }

//   .ResultsButtons {
//     padding: 0;
//     padding-top: 3em;
//     display: flex;
//     flex-direction: column;
//   }

//   .ResultsOuterCard {
//     height: 40%;
//   }

//   .ResultsAvatar {
//     margin-top: -10px;
//     width: 80px;
//     height: 80px;
//     object-fit: scale-down;
//   }
//   .NoVotesText {
//     margin: 1.2em;
//     font-size: 20px;
//     line-height: 28px;
//     text-align: center;
//   }
//   .Avatar img {
//     width: 80px;
//   }
// }