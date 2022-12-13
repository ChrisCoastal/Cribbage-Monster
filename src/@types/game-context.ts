import { Dispatch } from 'react';
import { CardType, GameState } from './index';

export type GameContextType = {
  gameState: GameState;
  dispatchGame: Dispatch<GameReducerActions>;
};

export enum GameReducerTypes {
  CREATE_GAME = 'create',
  DEAL = 'deal',
  PLAY_CARD = 'play card'
}

export type CreateGameAction = {
  type: GameReducerTypes.CREATE_GAME;
  payload: GameState;
};

export type PlayCardAction = {
  type: GameReducerTypes.PLAY_CARD;
  payload: CardType;
};

export type DealCardAction = {
  type: GameReducerTypes.DEAL;
  payload: { player: CardType[]; opponent: CardType[] };
};

export type GameReducerActions = CreateGameAction | DealCardAction | PlayCardAction;
