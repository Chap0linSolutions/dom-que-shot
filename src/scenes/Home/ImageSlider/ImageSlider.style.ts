import styled from "@emotion/styled";

export const Slider = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1em;
  border-radius: 10px;
  padding: 1em 10px;
`;

export const Image = styled.img`
  height: 140px;
  object-fit: scale-down;
  @media(max-height: 740px){
    height: 126px;
  }
`;

export const Title = styled.p`
  margin: 0;
  margin-top: 5px;
  font-family: Adumu;
  font-size: 18px;
  color: white;
  text-align: center;
  @media(max-height: 740px){
    font-size: 16px;
  }
`;
