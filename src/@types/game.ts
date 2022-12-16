import { CardType } from './index';

// export type UserState = {
//   id: UserId;
//   game: GameId | null;
// };

export type UserId = string;
export type GameId = string;

export enum PlayerTitle {
  P_ONE = 'player1',
  P_TWO = 'player2'
}

export type Player = { id: UserId; activePlayer: boolean };

export type GameState = {
  gameId: GameId;
  dealer: PlayerTitle | null;
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

export type AppState = {
  // users: {
  //   [key: UserId]: UserState;
  // };
  games: { [key: GameId]: GameState };
};
