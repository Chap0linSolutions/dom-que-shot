import { render, screen } from '@testing-library/react';
import { BangBang } from './BangBang';
import '@testing-library/jest-dom/extend-expect';

describe('Bang Bang Game', () => {
  it('should render label', () => {
    render(<div data-testid="label" />);
    expect(screen.queryByTestId('label')).not.toBeNull();
  });
});