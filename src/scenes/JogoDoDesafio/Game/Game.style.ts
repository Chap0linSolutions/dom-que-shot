import styled from '@emotion/styled';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-height: 720px) {
    height: 80%;
  }
`;

export const Title = styled.div`
  width: 80%;
  font-size: 20px;
  font-weight: 700;
  margin: 20px;
`;

export const SuggestionsDiv = styled.div`
  background: #403a55;
  border: 3px solid #f9c95c;
  border-radius: 16px;
  width: 90%;
  height: auto;
  padding: 1em;

  @media (max-height: 720px) {
    width: 88%;
    height: 350px;
    padding-top: 0.65rem;
  }
`;

export const SuggestionItem = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  margin-bottom: 2em;
  align-items: flex-start;
  gap: 0.7rem;

  @media (max-height: 720px) {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 1.5em;
  }
`;

export const ExclamationIcon = styled.div`
  background: #f9c95c;
  margin: 0;
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SuggestionItemText = styled.div`
  margin: 0;
`;

export const AnotherSuggestion = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  margin-top: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const AwaitingDiv = styled.div`
  margin-top: 3em;
  padding: 0;
  width: 80%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #8877df;
  font-size: 20px;
  text-justify: justify;
  border-radius: 16px;
`;

export const VoteButton = styled.div`
  margin: 2em;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-height: 720px) {
    margin: 1.6em;
  }
`;
