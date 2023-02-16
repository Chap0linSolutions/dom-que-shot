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
  //useStates removidos (ver comentário nas linhas 26 e 27, mais abaixo)
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
  // setUser: React.Dispatch<React.SetStateAction<User>>,   //TODO acredito que não é necessário trazer os useStates aqui pra dentro.
  // setRoom: React.Dispatch<React.SetStateAction<Room>>,   //Verificar se rola de deixar sem mesmo, e em caso afirmativo remover estas duas linhas comentadas
}

interface GlobalProviderProps {
  children: ReactNode;
}

//para abastecer os dados iniciais recorremos ao localStorage
//TODO: verificar a possibilidade de usar cookies no lugar)
const userData = JSON.parse(window.localStorage.getItem('userData'));   

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
};


const GlobalContext = createContext<GlobalContextValue>(initialValues);
const GlobalUserUpdater = createContext<(value: React.SetStateAction<User>) => void>(undefined);
const GlobalRoomUpdater = createContext<(value: React.SetStateAction<Room>) => void>(undefined); 


export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (typeof context !== 'undefined'){
    return context;
  } throw new Error(`useGlobalContext must be used within a GlobalContext`)
}

export function useGlobalUserUpdater(){
  return useContext(GlobalUserUpdater);  
}

export function useGlobalRoomUpdater(){
  return useContext(GlobalRoomUpdater);  
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
    user: user,
    room: room,
  }

  return (
    <GlobalContext.Provider value={value}> {/* nos permite ler os dados */}              
      <GlobalUserUpdater.Provider value={setUser}>   {/* nos permite alterar os dados de usuário */}
        <GlobalRoomUpdater.Provider value={setRoom}>   {/* nos permite alterar os dados da sala */}
          {children}
        </GlobalRoomUpdater.Provider>
      </GlobalUserUpdater.Provider>
    </GlobalContext.Provider>
  );
}