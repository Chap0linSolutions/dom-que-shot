import { render, fireEvent } from '@testing-library/react';
import Start from './Start';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../services/api', () => {
  return { default: {
    get: () => null
  }};
});

jest.mock('../../contexts/GlobalContextProvider', () => {
  return { useGlobalContext: () => ({
    setUser: () => null,
    setRoom: () => null,
    room: { code: '123A' }
  })};
});

jest.mock('react-router-dom', () => {
  return { useNavigate: () => jest.fn }
});

describe('Start page', () => {
  it('Renders the Welcome page correctly', () => {
    const { getByText } = render(<Start />);
    
    expect(getByText('Entrar')).toBeInTheDocument();
  });

  it('Should render the page About Us when clicks on that button', () => {
    const { getByText, getByTestId, getByAltText } = render(<Start />);

    fireEvent.click(getByTestId('burguer-menu'));
    fireEvent.click(getByText('Sobre nós'));
    
    expect(getByAltText('logo-sobre-nos')).toBeInTheDocument();
  });

  it('Should render the page Privacy Policy when clicks on that button', () => {
    const { getByText, getByTestId } = render(<Start />);

    fireEvent.click(getByTestId('burguer-menu'));
    fireEvent.click(getByText('Política de Privacidade'));
    
    expect(getByText('Política de privacidade')).toBeInTheDocument();
  });

  it('Should render the page Contact when clicks on that button', () => {
    const { getByText, getByTestId } = render(<Start />);

    fireEvent.click(getByTestId('burguer-menu'));
    fireEvent.click(getByText('Contato'));
    
    expect(getByText('Entre em Contato')).toBeInTheDocument();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
