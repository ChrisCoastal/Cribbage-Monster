import { Dispatch } from 'react';
import { CardType, GameState } from './index';

export type GameContextType = {
  gameState: GameState;
  dispatchGame: Dispatch<GameReducerActions>;
};

export enum GameReducerTypes {
  DEAL = 'deal',
  PLAY_CARD = 'play card'
}

export type PlayCardAction = {
  type: GameReducerTypes.PLAY_CARD;
  payload: { card: CardType };
};

export type DealCardAction = {
  type: GameReducerTypes.DEAL;
  payload: { player: CardType[]; opponent: CardType[] };
};

export type GameReducerActions = DealCardAction | PlayCardAction;
