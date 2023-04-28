import { render } from '@testing-library/react';
import Avatar from './index';
import '@testing-library/jest-dom/extend-expect';

const mockSeed = 'ABCD';

describe('Welcome page', () => {
  it('Renders the avatar correctly', () => {
    const { getByAltText } = render(<Avatar seed={mockSeed} />);

    expect(getByAltText('avatar')).toBeInTheDocument();
  });
});
