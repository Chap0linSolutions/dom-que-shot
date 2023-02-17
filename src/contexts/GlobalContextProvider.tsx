import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { Game } from './games';

export type Player = {
  avatarSeed: string;
  nickname: string;
  beers: number;
  playerID: number;
};

export type User = {
  nickname: string | undefined; 
  avatarSeed: string | undefined;
}

export type Room = {
  code: string | undefined;
  gameList: Game[];
  playerList: Player[];
  currentScreen: string | undefined;
}

interface GlobalContextValue {
  user: User,
  room: Room,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  setRoom: React.Dispatch<React.SetStateAction<Room>>,
}

interface GlobalProviderProps {
  children: ReactNode;
}  

const initialValues: GlobalContextValue = {
  user: {
    nickname: undefined,
    avatarSeed: undefined,
  },
  room: {
    code: undefined,
    gameList: [],
    playerList: [],
    currentScreen: undefined,
  },
  setUser: () => null,
  setRoom: () => null,
};


const GlobalContext = createContext<GlobalContextValue>(initialValues);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (typeof context !== 'undefined'){
    return context;
  } throw new Error(`useGlobalContext must be used within a GlobalContext`)
}

export default function GlobalProvider(props: GlobalProviderProps) {
  const [user, setUser] = useState<User>(initialValues.user);
  const [room, setRoom] = useState<Room>(initialValues.room);

  useEffect(() => {
    console.log('Dados globais do usuário alterados.');
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log('Dados globais da sala alterados.');
    console.log(room);
  }, [room]);

  const { children } = props;

  const value:GlobalContextValue = {
    user,
    room,
    setUser,
    setRoom,
  }

  return (
    <GlobalContext.Provider value={value}> {/* nos permite ler os dados */}              
          {children}
    </GlobalContext.Provider>
  );
}