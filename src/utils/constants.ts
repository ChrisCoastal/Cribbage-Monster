import { GameState, IsActive, PlayerPos } from 'src/@types';

export const HAND_SIZE = 6;

export const NUM_SUITS = 4;

export const CARDS_IN_DECK = 52;

export const CARDS_PER_SUIT = 13;

export const INITIAL_GAME_STATE: GameState = {
  gameId: '',
  dealer: null,
  players: {
    player1: {
      id: '',
      displayName: '',
      activePlayer: IsActive.NOT_ACTIVE
    },
    player2: {
      id: '',
      displayName: '',
      activePlayer: IsActive.NOT_ACTIVE
    }
  },
  playerCards: {
    player1: {
      inHand: {},
      played: {}
    },
    player2: {
      inHand: {},
      played: {}
    }
  },
  crib: {},
  starterCard: null,
  score: {
    player1: {
      cur: 0,
      prev: 0
    },
    player2: {
      cur: 0,
      prev: 0
    }
  },
  turn: {
    cardsPlayed: {},
    cardTotal: 0
  }
};
