import { User } from 'firebase/auth';
import { CardsIndex, CardType, GameId, GameState, UserId } from './index';

export type AppState = {
  users: {
    [key: UserId]: User;
  };
  // appStats: {
  //   ranking: {};
  // };
  userStats: {
    [key: UserId]: UserStats;
  };
  gamesList: {
    [key: GameId]: {
      players: string[]; // displayNames
    };
  };
  games: { [key: GameId]: GameState };
};

export type DailyGames = { date: string; played: number; won: number };

export type UserStats = {
  gamesPlayed: number;
  dailyGames: DailyGames[];
  gamesWon: number;
  bestHand: { date: string; hand: CardsIndex; cut: CardType } | null;
};
