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

export type CardsIndex = { [key: number]: CardType };

export type Cut = {
  status: Status;
  card: CardType | null;
};

export enum Status {
  INVALID = 'invalid',
  VALID = 'valid',
  COMPLETED = 'completed'
}

export enum Go {
  IS_GO = 'is go',
  NO_GO = 'no go'
}

export enum CardKey {
  ID = 'id',
  SUIT = 'suit',
  NAME = 'name',
  FACE = 'faceValue',
  PLAY = 'playValue'
}

export type TurnType = {
  cardsPlayed: CardsIndex;
  cardTotal: number;
};

export type ScoreType = {
  cur: number;
  prev: number;
};

export type Tally = {
  displayName: string;
  playerPos: PlayerPos;
  cards: CardsIndex;
  score: TallyPoints;
  pegged?: number;
};

export type TallyPoints = {
  fifteens: number;
  runs: number;
  pairs: number;
  flush: number;
  jack: number;
  totalPoints: number;
};

export type GameState = {
  gameId: GameId;
  dealer: PlayerPos;
  players: {
    player1: Player;
    player2: Player;
  };
  playerCards: {
    player1: {
      inHand: CardsIndex;
      played: CardsIndex;
      isGo: Go;
    };
    player2: {
      inHand: CardsIndex;
      played: CardsIndex;
      isGo: Go;
    };
  };
  crib: CardsIndex;
  deckCut: Cut;
  score: {
    player1: ScoreType;
    player2: ScoreType;
  };
  turnTotals: TurnType;
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
