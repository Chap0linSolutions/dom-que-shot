import styled from '@emotion/styled';


export const Finish = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.p`
  margin: 20px 0 10px 0;
  font-size: 24px;
  font-weight: 500;
  font-family: Adumu;
  @media (max-height: 740px) {
    font-size: 21px;
  }
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 0;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;