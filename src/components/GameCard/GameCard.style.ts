import styled from '@emotion/styled';

export const CardBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
`;

export const CardImage = styled.img`
  width: 90%;
  object-fit: scale-down;
`;

export const CardTitle = styled.p`
  font-family: 'Adumu';
  font-size: 18px;
  margin: 10px 0;
  color: white;
  text-align: center;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const InfoButton = styled.div`
  border-radius: 0 10px 0 10px;
  padding: 2px 10px;
  background: #f9c95c;
  cursor: pointer;
  margin: 0;
  margin-bottom: 10px;
  align-self: flex-end;
  display: flex;
  align-items: center;
`;

export const InfoText = styled.p`
  margin: 0;
  margin-left: 5px;
  font-size: 16px;
  color: #170c32;
`;