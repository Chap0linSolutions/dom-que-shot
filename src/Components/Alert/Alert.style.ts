import styled from '@emotion/styled';

export const Background = styled.div`
  opacity: 0;
  width: 100vw;
  min-height: 100vh;
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
`;
