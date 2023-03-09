import styled from '@emotion/styled';

export const RouletteDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RouletteDetail = styled.div`
  width: 147px;
  height: 16px;
  background-color: #f9c95c;
`;

export const UpperDetail = styled(RouletteDetail)`
  border-radius: 20px 20px 0 0;
`;

export const LowerDetail = styled(RouletteDetail)`
  border-radius: 0 0 20px 20px;
`;

export const Center = styled.div`
  width: 168px;
  height: 428px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
`;
