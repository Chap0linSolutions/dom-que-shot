import styled from "@emotion/styled";

export const WelcomePage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Content = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainLogo = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 40px;
`;

export const BurguerDiv = styled.div`
  position: absolute;
  top: 2em;
  left: 2em;
  z-index: 2;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  background: #C2C2C2;
  border-radius: 5px;
  padding: 4px;
  @media (max-height: 740px) {
    top: 70px;
  }
`;

export const Option = styled.button`
  font-family: Roboto;
  font-size: 14px;
  color: black;  
  margin: 1px;
  background: #F2F2F2;
  border-radius: 5px;
  padding: 10px;
  text-align: left;
  outline: none;
  border: none;
  :active {
    background-color: #800080;
    color: white;
    outline: none;
    border: none;
  }
  :focus {
    outline: none;
    border: none;
  }
`;
