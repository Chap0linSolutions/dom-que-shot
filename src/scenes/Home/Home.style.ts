import styled from "@emotion/styled";

export const HomeDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 0 0 0;  
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
`;

export const Text = styled.p`
  margin: 0;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 18px;
  color: #AAAAAA;
`;

export const InputAndButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  color: black;
  background-color: white;
  border-radius: 10px 0 0 10px;
  font-weight: 400;
  border: none;
  width: 100%;
  height: 50px;
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  ::-webkit-input-placeholder {
    text-transform: none;
  }
  :-moz-placeholder {
    text-transform: none;
  }
  ::-moz-placeholder {
    text-transform: none;
  }
  :-ms-input-placeholder {
    text-transform: none;
  }
  ::placeholder {
    text-transform: none;
  }
`;

export const JoinButton = styled.button`
  background-color: #8877df;
  border-radius: 0 10px 10px 0;
  width: 62px;
  height: 52px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Warning = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
`;

export const WarningText = styled.p`
  margin: 0;
  margin-left: 5px;
  color: red;
  font-size: 16px;
  @media(max-height: 740px){
    font-size: 15px;
  }
`;