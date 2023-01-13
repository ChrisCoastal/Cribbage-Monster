import {
  GameState,
  Go,
  IsActive,
  PlayerPos,
  UserSettingsState,
  Status,
  GameStage
} from 'src/@types';

export const MILLISEC_PER_DAY = 86400000;

export const HAND_SIZE = 6;

export const NUM_SUITS = 4;

export const CARDS_IN_DECK = 52;

export const CARDS_PER_SUIT = 13;

export const PAIR_POINTS = [0, 2, 6, 12];

export const INITIAL_USER_SETTING: UserSettingsState = {
  uid: '',
  displayName: '',
  email: '',
  avatar: '',
  online: false,
  lastVisibleAt: ''
};

export const INITIAL_GAME_STATE: GameState = {
  gameId: '',
  stage: GameStage.NEW,
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
  '👩🏽‍🦱',
  '👩🏻‍🦱',
  '👩🏿‍🦱',
  '👩🏼‍🦱',
  '👧🏾',
  '👧🏻',
  '👧🏿',
  '👧🏼',
  '👦🏾',
  '👦🏻',
  '👦🏿',
  '👦🏼',
  '👩‍🎤',
  '👨‍🎤',
  '🧙‍♀️',
  '🧙‍♂️',
  '🐶',
  '🐱',
  '🦊',
  '🐻',
  '🦁',
  '🐼',
  '🐵',
  '🐷',
  '🐔',
  '🐮',
  '🦑',
  '🐬',
  '🦄',
  '🐠',
  '🐧',
  '🐝',
  '🌈',
  '🌺',
  '🍄',
  '👤'
];

export const EMOTES = ['😊', '🥳', '😎', '🤓', '😂', '🙃', '😴', '🙄', '😫', '🤬', '🤯', '💀'];
