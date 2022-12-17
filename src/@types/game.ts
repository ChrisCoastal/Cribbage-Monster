import { CardType, UserId } from './index';

export type GameId = string;

export enum PlayerPos {
  P_ONE = 'player1',
  P_TWO = 'player2'
}

// export enum PlayerRole {
//   DEALER = 'dealer',
//   PONE = 'pone'
// }

export enum IsActive {
  ACTIVE = 'active',
  NOT_ACTIVE = 'not active'
}

export type Player = { id: UserId; displayName: string; activePlayer: IsActive };

export type Cards = { [key: number]: CardType };

export type GameState = {
  gameId: GameId;
  dealer: PlayerPos | null;
  players: {
    player1: Player;
    player2: Player;
  };
  playerCards: {
    player1: {
      inHand: Cards;
      played: Cards;
    };
    player2: {
      inHand: Cards;
      played: Cards;
    };
  };
  crib: Cards;
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
    cardsPlayed: Cards;
    cardTotal: number;
  };
};

export type GameBrief = {
  gameId: GameId;
  player1: string; // display name
  player2: string; // display name
  scoreToWin: 121;
};

export enum SortOrder {
  LOW_TO_HIGH = 'low high',
  HIGH_TO_LOW = 'high low'
}

export enum SortBy {
  FACE_VALUE = 'face',
  SUIT = 'suit'
}
