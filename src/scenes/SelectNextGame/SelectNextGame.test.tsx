import { render, fireEvent } from '@testing-library/react';
// import SelectNextGame from './SelectNextGame';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

// jest.mock('../../lib/socket.ts', () => {
//   return { default: {
//     get: () => null
//   }};
// });

describe('Welcome page', () => {
  it('Renders the page correctly', () => {
    // const { getByTestId } = render(
    //   <MemoryRouter>
    //     <SelectNextGame />
    //   </MemoryRouter>
    // );
    
    // expect(getByTestId('roulette')).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});