import { GameState } from 'src/@types';

export const HAND_SIZE = 6;

export const NUM_SUITS = 4;

export const CARDS_IN_DECK = 52;

export const CARDS_PER_SUIT = 13;

export const INITIAL_GAME_STATE: GameState = {
  gameId: '',
  activePlayer: false,
  hands: {
    player: {
      inHand: [],
      played: []
    },
    opponent: {
      inHand: [],
      played: []
    }
  },
  starter: null,
  crib: [],
  score: {
    player: {
      cur: 0,
      prev: 0
    },
    opponent: {
      cur: 0,
      prev: 0
    }
  },
  turn: {
    cardsPlayed: [],
    cardTotal: 0
  }
};
