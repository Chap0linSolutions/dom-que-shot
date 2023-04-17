import { render, } from '@testing-library/react';
import Background from './index';
import '@testing-library/jest-dom/extend-expect';

const mockChildren = <div/>;

describe('Welcome page', () => {
  it('Renders the page correctly', () => {
    const { getByTestId } = render(<Background children={mockChildren} />);
    
    expect(getByTestId('background')).toBeInTheDocument();
  });

});

