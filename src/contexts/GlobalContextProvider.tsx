import { createContext, ReactNode, useContext, useState } from 'react';
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
const GlobalContextUpdater = createContext<(value: React.SetStateAction<GlobalContextValue>) => void>(undefined); 


export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (typeof context !== 'undefined'){
    return context;
  } throw new Error(`useGlobalContext must be used within a GlobalContext`)
}

export function useGlobalContextUpdater(){
  return useContext(GlobalContextUpdater);  
}


export default function GlobalProvider(props: GlobalProviderProps) {
  const { children } = props;
  const [globalData, setGlobalData] = useState<GlobalContextValue>(initialValues);

  return (
    <GlobalContext.Provider value={globalData}> {/* nos permite ler os dados */}              
      <GlobalContextUpdater.Provider value={setGlobalData}>   {/* nos permite alterar os dados */}
        {children}
      </GlobalContextUpdater.Provider>
    </GlobalContext.Provider>
  );
}