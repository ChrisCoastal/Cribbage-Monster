import { User } from 'firebase/auth';
import { GameId, GameState, UserId } from './index';

export type AppState = {
  users: {
    [key: UserId]: User;
  };
  // userStats: {
  //   [key: UserId]: Stats;
  // };
  gamesList: {
    [key: GameId]: {
      players: string[]; // displayNames
    };
  };
  games: { [key: GameId]: GameState };
};
