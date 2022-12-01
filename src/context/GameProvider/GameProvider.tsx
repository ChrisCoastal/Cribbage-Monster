import { createContext, FC, ReactNode, useReducer } from 'react';
import { GameContextType, GameState } from 'src/@types';
import gameReducer from './gameReducer';

type GameProviderProps = {
  children?: ReactNode;
};

const initialState: GameState = {
  activePlayer: false,
  hands: {
    player: {
      inHand: [],
      played: []
    },
    opponent: {
      inHand: [],
      played: []
    }
  },
  starter: null,
  crib: [],
  score: {
    player: {
      cur: 0,
      prev: 0
    },
    opponent: {
      cur: 0,
      prev: 0
    }
  },
  turn: {
    cardsPlayed: [],
    cardTotal: 0
  }
};

const GameContext = createContext({} as GameContextType);

const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [gameState, dispatchGame] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ gameState, dispatchGame }}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
