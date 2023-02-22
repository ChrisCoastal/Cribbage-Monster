import { createContext, FC, ReactNode, useReducer } from 'react';
import { GameContextType } from 'src/@types';
import { INITIAL_GAME_STATE } from 'src/utils/constants';
import gameReducer from './gameReducer';

type GameProviderProps = {
  children?: ReactNode;
};

const GameContext = createContext({} as GameContextType);

const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [gameState, dispatchGame] = useReducer(gameReducer, INITIAL_GAME_STATE);

  return (
    <GameContext.Provider value={{ gameState, dispatchGame }}>{children}</GameContext.Provider>
  );
};

export { GameContext, GameProvider };
