import { render } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../services/api', () => {
  return {
    default: {
      get: () => null,
    },
  };
});

jest.mock('../../contexts/GlobalContextProvider', () => {
  return {
    useGlobalContext: () => ({
      setUser: () => null,
      setRoom: () => null,
      room: { code: '123A', playerList: [] },
    }),
  };
});

jest.mock('react-router-dom', () => {
  return { useNavigate: () => jest.fn };
});

describe('Home page', () => {
  it('Should render text "Já possui uma sala?" in the page', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Já possui uma sala?')).toBeInTheDocument();
  });

  it('Should render placeholder text', () => {
    const { getByPlaceholderText } = render(<Home />);

    expect(getByPlaceholderText('Digite o código da sala')).toBeInTheDocument();
  });

  it('Should render the button', () => {
    const { getAllByRole } = render(<Home />);

    expect(getAllByRole('button')).toHaveLength(2);
  });

  it('Should render the button "Criar Sala" ', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Criar Sala')).toBeInTheDocument();
  });

  it('Should render text "Já conhece nossos jogos?" in the page', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Já conhece nossos jogos?')).toBeInTheDocument();
  });
});
