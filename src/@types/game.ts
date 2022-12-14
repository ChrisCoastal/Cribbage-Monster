import { CardType } from './index';

export type GameState = {
  gameId: string;
  activePlayer: boolean;
  hands: {
    player: HandType;
    opponent: HandType;
  };
  crib: CardType[];
  starterCard: CardType | null;
  score: {
    player: ScoreType;
    opponent: ScoreType;
  };
  turn: {
    cardsPlayed: CardType[];
    cardTotal: number;
  };
};

export type ScoreType = {
  cur: number;
  prev: number;
};

export type HandType = {
  inHand: CardType[];
  played: CardType[];
};
