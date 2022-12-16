import { CardType, UserId } from './index';

export type GameId = string;

export enum PlayerNum {
  P_ONE = 'player1',
  P_TWO = 'player2'
}

export enum PlayerRole {
  DEALER = 'player1',
  PONE = 'player2'
}

export type Player = { id: UserId; activePlayer: boolean; role: PlayerRole };

export type GameState = {
  gameId: GameId;
  players: {
    player1: Player;
    player2: Player;
  };
  playerCards: {
    player1: {
      inHand: CardType[];
      played: CardType[];
    };
    player2: {
      inHand: CardType[];
      played: CardType[];
    };
  };
  crib: CardType[];
  starterCard: CardType | null;
  score: {
    player1: {
      cur: number;
      prev: number;
    };
    player2: {
      cur: number;
      prev: number;
    };
  };
  turn: {
    cardsPlayed: CardType[];
    cardTotal: number;
  };
};

export enum SortOrder {
  LOW_TO_HIGH = 'low high',
  HIGH_TO_LOW = 'high low'
}

export enum SortBy {
  FACE_VALUE = 'face',
  SUIT = 'suit'
}
