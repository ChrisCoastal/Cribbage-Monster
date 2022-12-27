import { GameState, Go, IsActive, PlayerPos, Status } from 'src/@types';

export const HAND_SIZE = 6;

export const NUM_SUITS = 4;

export const CARDS_IN_DECK = 52;

export const CARDS_PER_SUIT = 13;

export const PAIR_POINTS = [0, 2, 6, 12];

export const INITIAL_GAME_STATE: GameState = {
  gameId: '',
  dealer: PlayerPos.P_ONE,
  handNum: 0,
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
  isGo: {
    player1: Go.NO_GO,
    player2: Go.NO_GO
  },
  crib: {},
  deckCut: { status: Status.INVALID, card: null },
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
  tally: null,
  turnTotals: {
    cardsPlayed: {},
    cardTotal: 0
  }
};
