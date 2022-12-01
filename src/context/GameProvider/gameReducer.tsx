import { GameReducerActions, GameReducerTypes, GameState } from 'src/@types';

const gameReducer = (state: GameState, action: GameReducerActions): GameState => {
  const { type, payload } = action;

  switch (type) {
    case GameReducerTypes.PLAY_CARD: {
      //TODO: placeholder only
      return { ...state };
    }

    default:
      return state;
  }
};

export default gameReducer;
