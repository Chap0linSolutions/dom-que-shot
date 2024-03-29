import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Game } from './games';
import gsap from 'gsap';

export type Player = {
  avatarSeed: string;
  nickname: string;
  beers: number;
  playerID: number;
};

export type User = {
  nickname: string | undefined;
  avatarSeed: string | undefined;
  isOwner: boolean;
  isCurrentTurn: boolean;
};

export enum Visibility {
  Invisible,
  Visible,
}

export type Room = {
  code: string | undefined;
  gameList: Game[];
  playerList: Player[];
  URL: string | undefined;
  page: number | undefined;
};

interface GlobalContextValue {
  user: User;
  room: Room;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setRoom: React.Dispatch<React.SetStateAction<Room>>;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const initialValues: GlobalContextValue = {
  user: {
    nickname: undefined,
    avatarSeed: undefined,
    isOwner: false,
    isCurrentTurn: false,
  },
  room: {
    code: undefined,
    gameList: [],
    playerList: [],
    URL: '/',
    page: undefined,
  },
  setUser: () => null,
  setRoom: () => null,
};

const GlobalContext = createContext<GlobalContextValue>(initialValues);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (typeof context !== 'undefined') {
    return context;
  } else {
    console.log('Global Context cannot be accessed from here.');
  }
}

export default function GlobalProvider(props: GlobalProviderProps) {
  const [user, setUser] = useState<User>(initialValues.user);
  const [room, setRoom] = useState<Room>(initialValues.room);

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
  }, []);

  const { children } = props;

  const value: GlobalContextValue = {
    user,
    room,
    setUser,
    setRoom,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
