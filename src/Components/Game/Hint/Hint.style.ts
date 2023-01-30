import styled from "@emotion/styled";

export const HintPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;

export const HintPageDescription = styled.p`
  margin: 20px 0;
  padding: 0 40px;
  font-weight: 500;
  font-size: 20px;
  max-height: 600px;
  text-align: justify;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;