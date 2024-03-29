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

export type Presence = { id: UserId; presentAt: string };

export type Player = {
  id: UserId;
  displayName: string;
  avatar: string;
  activePlayer: IsActive;
  playAgain?: boolean;
};

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

export type PeggingType = {
  fifteen: number;
  run: number;
  pairs: number;
  go: number;
  totalPoints: number;
};

export type Tally = {
  displayName: string;
  avatar: string;
  playerPos: PlayerPos;
  cards: CardsIndex;
  points: TallyPoints;
};

export type TallyPoints = {
  fifteens: number;
  runs: number;
  pairs: number;
  flush: number;
  jack: number;
  totalPoints: number;
  pegging?: number;
};

export enum GameStatus {
  NEW = 'new',
  JOINED = 'joined',
  DEAL = 'deal',
  LAY_CRIB = 'crib',
  PONE_CUT = 'pone cut',
  IS_CUT = 'is cut',
  CARD_PLAY = 'play',
  TALLY = 'tally',
  WINNER = 'winner',
  COMPLETE = 'complete'
}

export type GameState = {
  gameId: GameId;
  status: GameStatus;
  dealer: PlayerPos;
  handNum: number;
  players: {
    player1: Player;
    player2: Player;
  };
  playerCards: {
    player1: {
      inHand: CardsIndex;
      played: CardsIndex;
    };
    player2: {
      inHand: CardsIndex;
      played: CardsIndex;
    };
  };
  isGo: {
    player1: Go;
    player2: Go;
  };
  crib: CardsIndex;
  deckCut: Cut;
  pegging: {
    player1: PeggingType[];
    player2: PeggingType[];
  };
  score: {
    player1: ScoreType;
    player2: ScoreType;
  };
  tally: null | {
    player1: TallyPoints;
    player2: TallyPoints;
    crib: TallyPoints;
  };
  turnTotals: TurnType;
};

export type PlayerBrief = {
  displayName: string;
  presence?: string;
  avatar: string;
};

export type GameBrief = {
  gameId: GameId;
  player1: PlayerBrief;
  player2: PlayerBrief;
  scoreToWin: 121;
};

// board
export enum BoardSectionType {
  START = 'start',
  STRAIGHT = 'straight',
  SKUNK = 'skunk',
  BEND_1 = 'bend 1',
  BEND_2 = 'bend 2'
}

// sort
export enum SortOrder {
  LOW_TO_HIGH = 'low high',
  HIGH_TO_LOW = 'high low'
}

export enum SortBy {
  FACE_VALUE = 'face',
  SUIT = 'suit'
}
