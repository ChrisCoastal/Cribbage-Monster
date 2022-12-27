import { Dispatch } from 'react';
import { CardType, GameState, TallyPoints } from './index';

export type GameContextType = {
  gameState: GameState;
  dispatchGame: Dispatch<GameReducerActions>;
};

export enum GameReducerTypes {
  CREATE_GAME = 'create',
  JOIN_PLAYER = 'join',
  DEAL = 'deal',
  PLAY_CARD = 'play card',
  UPDATE = 'update',
  HAND_TALLY = 'tally'
}

export type CreateGameAction = {
  type: GameReducerTypes.CREATE_GAME;
  payload: GameState;
};

export type JoinPlayerAction = {
  type: GameReducerTypes.JOIN_PLAYER;
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

export type UpdateGameAction = {
  type: GameReducerTypes.UPDATE;
  payload: GameState;
};

export type HandTallyAction = {
  type: GameReducerTypes.HAND_TALLY;
  payload: { player1: TallyPoints; player2: TallyPoints; crib: TallyPoints };
};

export type GameReducerActions =
  | CreateGameAction
  | JoinPlayerAction
  | DealCardAction
  | PlayCardAction
  | UpdateGameAction
  | HandTallyAction;
