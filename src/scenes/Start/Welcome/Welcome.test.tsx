import { render, fireEvent } from '@testing-library/react';
import Welcome from './Welcome';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../services/api', () => {
  return {
    default: {
      get: () => null,
    },
  };
});

const mockNavigate = jest.fn();
const mockSetRoom = jest.fn();
const mockSetPage = jest.fn();

describe('Welcome page', () => {
  it('Renders the page correctly', () => {
    const { getByText } = render(
      <Welcome
        navigate={mockNavigate}
        setRoom={mockSetRoom}
        setPage={mockSetPage}
      />
    );

    expect(getByText('Entrar')).toBeInTheDocument();
  });

  it('Should navigate to /Home when click on "Entrar" ', () => {
    const { getByText } = render(
      <Welcome
        navigate={mockNavigate}
        setRoom={mockSetRoom}
        setPage={mockSetPage}
      />
    );

    fireEvent.click(getByText('Entrar'));

    expect(mockNavigate).toBeCalledWith('/Home');
  });

  it('Should not show options from Menu without click on it', () => {
    const { queryByText } = render(
      <Welcome
        navigate={mockNavigate}
        setRoom={mockSetRoom}
        setPage={mockSetPage}
      />
    );

    expect(queryByText('Sobre nós')).toBeFalsy();
    expect(queryByText('Contato')).toBeFalsy();
    expect(queryByText('Política de Privacidade')).toBeFalsy();
  });

  it('Should show options from Menu when click on it', () => {
    const { getByText, getByTestId } = render(
      <Welcome
        navigate={mockNavigate}
        setRoom={mockSetRoom}
        setPage={mockSetPage}
      />
    );

    fireEvent.click(getByTestId('burguer-menu'));

    expect(getByText('Sobre nós')).toBeInTheDocument();
    expect(getByText('Contato')).toBeInTheDocument();
    expect(getByText('Política de Privacidade')).toBeInTheDocument();
  });

  it('Should render the logo image', () => {
    const { getByAltText } = render(
      <Welcome
        navigate={mockNavigate}
        setRoom={mockSetRoom}
        setPage={mockSetPage}
      />
    );

    expect(getByAltText('Logo')).toBeInTheDocument();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
