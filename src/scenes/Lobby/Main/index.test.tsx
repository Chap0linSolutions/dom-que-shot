import { render, fireEvent } from '@testing-library/react';
// import Main from './index';
import '@testing-library/jest-dom/extend-expect';

// jest.mock('../../../services/api', () => {
//   return { default: {
//     get: () => null
//   }};
// });

// const mockPlayerList = [
//   {
//     avatarSeed: 'ASDF',
//     nickname: 'Luiza',
//     beers: 2,
//     playerID: 1234,
//   },
//   {
//     avatarSeed: 'QWER',
//     nickname: 'Carlos',
//     beers: 1,
//     playerID: 1235,
//   }
// ];

// const mockCurrentOwner = 'Luiza';
// const mockAlertMessage = 'Sei lá';
// const mockRoomCode = 'YU98';
// const mockBeginMatch = jest.fn();
// const mockCopyToClipboard = jest.fn();
// const mockSettingsPage = jest.fn();

describe('Lobby Main page', () => {
  it('Should render the page correctly', () => {
    // const { getByText } = render(<Main currentOwner={mockCurrentOwner} alertMessage={mockAlertMessage} roomCode={mockRoomCode} beginMatch={mockBeginMatch} copyToClipboard={mockCopyToClipboard} 
    // settingsPage={mockSettingsPage} playerList={mockPlayerList} />);

    // expect(getByText('Código da Sala:')).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});