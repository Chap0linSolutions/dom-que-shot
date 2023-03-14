import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const shine = keyframes`
  to {
    background-position-x: -300%;
  }
`;

export const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(110deg, #170c32 8%, #2d1864 18%, #170c32 33%);
  background-size: 300% 100%;
  animation: 2s ${shine} linear infinite;
`;

export const Text = styled.p`
  color: rgba(255, 255, 255, 0.54);
`;
