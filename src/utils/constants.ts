import {
  GameState,
  Go,
  IsActive,
  PlayerPos,
  UserSettingsState,
  Status,
  GameStatus
} from 'src/@types';

// Dates
export const MILLISEC_PER_DAY = 86400000;

// Media Queries
export const MEDIA_SIZE = {
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)'
};

// Game
export const HAND_SIZE = 6;

export const NUM_SUITS = 4;

export const CARDS_IN_DECK = 52;

export const CARDS_PER_SUIT = 13;

export const PAIR_POINTS = [0, 2, 6, 12];

export const INITIAL_USER_SETTING: UserSettingsState = {
  uid: '',
  displayName: '',
  avatar: '',
  online: false,
  lastVisibleAt: ''
};

export const INITIAL_GAME_STATE: GameState = {
  gameId: '',
  status: GameStatus.NEW,
  dealer: PlayerPos.P_ONE,
  handNum: 0,
  players: {
    player1: {
      id: '',
      displayName: '',
      avatar: '',
      activePlayer: IsActive.NOT_ACTIVE
    },
    player2: {
      id: '',
      displayName: '',
      avatar: '',
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
  pegging: {
    player1: [],
    player2: []
  },
  score: {
    player1: {
      cur: 0,
      prev: -1
    },
    player2: {
      cur: 0,
      prev: -1
    }
  },
  tally: null,
  turnTotals: {
    cardsPlayed: {},
    cardTotal: 0
  }
};

export const INITIAL_USER_STATS = {
  gamesPlayed: 0,
  dailyGames: [{ date: '', played: 0, won: 0 }],
  gamesWon: 0,
  bestHand: null
};

export const AVATARS = [
  // list all the monster emojis
  '👹',
  '👻',
  '🧛‍♀️',
  '🧛‍♂️',
  '🧟‍♀️',
  '🧟‍♂️',
  '🧞‍♀️',
  '🧞‍♂️',
  '🧜‍♀️',
  '🧜‍♂️',
  '🧙‍♀️',
  '🧙‍♂️',
  '🧚‍♀️',
  '🦑'
];

export const EMOTES = ['😊', '🥳', '😎', '🤓', '😂', '🙃', '😴', '🙄', '😫', '🤬', '🤯', '💀'];
