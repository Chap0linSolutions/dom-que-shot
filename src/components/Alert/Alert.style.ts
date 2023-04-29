import styled from '@emotion/styled';

export const Background = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 6;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  @media (min-width: 500px) {
    width: 408px;
    border-radius: 20px;
  }
`;

export const AlertDiv = styled.div`
  scale: 0;
  padding: 10px;
  display: flex;
  max-width: 250px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 4px solid rgba(136, 119, 223, 0.5);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  z-index: 6;
  @media (max-height: 740px) {
    max-width: 220px;
  }
`;

export const Image = styled.img`
  width: 40px;
  object-fit: scale-down;
`;

export const Message = styled.p`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  z-index: 6;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const Button = styled.button`
  width: 84px;
  height: 22px;
  background: #8877df;
  border-radius: 10px;
  font-family: 'Roboto';
  font-size: 18px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const YesOrNo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Yes = styled.button`
  width: 70px;
  height: 40px;
  margin: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #07bf0f;
  color: white;
  font-size: 18px;
`;

export const No = styled(Yes)`
  background: #ad0000;
`;