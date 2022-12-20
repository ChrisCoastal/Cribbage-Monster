import {
  CardKey,
  CardName,
  CardsIndex,
  CardType,
  GameId,
  Player,
  PlayerPos,
  SortBy,
  SortOrder,
  Suit,
  UserId
} from 'src/@types';
import { CARDS_IN_DECK, CARDS_PER_SUIT, HAND_SIZE } from './constants';
import { ref } from 'firebase/database';
import { rtdb } from 'src/firestore.config';

// REALTIME DATABASE REFS
export const getActivePlayerRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/players/${player}/activePlayer`);

export const getPlayerRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/players/${player}`);

export const getPlayersRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/players/`);

export const getPlayerCards = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/playerCards/${player}`);

export const getPlayerCardsPlayedRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/playerCards/${player}/played`);

export const getInHandRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/playerCards/${player}/inHand`);

export const getDeckRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/deckCut`);

export const getCribRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/crib`);

export const getTurnRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/turnTotals/`);

export const getCardsPlayedRef = (gameId: GameId) =>
  ref(rtdb, `games/${gameId}/turnTotals/cardsPlayed`);

export const getCardTotalRef = (gameId: GameId) =>
  ref(rtdb, `games/${gameId}/turnTotals/cardTotal`);

export const getScoreRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/score`);

export const getPlayerScoreRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/score/${player}`);

// PLAYERS

export function getPlayerOpponent(
  players: {
    player1: Player;
    player2: Player;
  },
  userId: UserId
) {
  const player = players.player1.id === userId ? PlayerPos.P_ONE : PlayerPos.P_TWO;
  const opponent = player === PlayerPos.P_ONE ? PlayerPos.P_TWO : PlayerPos.P_ONE;

  return { player, opponent };
}

export function findPlayerPos(
  players: { player1: Player; player2: Player },
  uid?: UserId
): PlayerPos | null {
  if (!players.player1.id.length || players.player1.id === uid) return PlayerPos.P_ONE;
  if (!players.player2.id.length || players.player2.id === uid) return PlayerPos.P_TWO;
  return null;
}

// DEAL CARDS

export function createDeck(): CardType[] {
  const newDeck: CardType[] = [];

  const suits: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Clubs, Suit.Diamonds];
  let faceValue = 1;

  for (let i = 0; i < CARDS_IN_DECK; i++) {
    if (i !== 0 && !(i % CARDS_PER_SUIT)) {
      suits.shift();
      faceValue = 1;
    }

    const name: CardName = Object.values(CardName)[faceValue - 1];
    const playValue: number = faceValue <= 10 ? faceValue : 10;
    const card = {
      id: i,
      suit: suits[0],
      name,
      faceValue,
      playValue
    };

    newDeck.push(card);
    faceValue++;
  }
  return newDeck;
}

export function shuffleDeck(deck: CardType[]) {
  // Fisher–Yates Shuffle
  let unshuffled = deck.length;
  let t, cardIndex;

  while (unshuffled) {
    // select a random card from the unshuffled part of the array
    cardIndex = Math.floor(Math.random() * unshuffled--);

    // place the random card at the back of the unshuffled cards
    t = deck[unshuffled];
    deck[unshuffled] = deck[cardIndex];
    deck[cardIndex] = t;
  }

  return deck;
}

// FIXME: the deck should only be created once? and kept in state?
// useDeck?
export function getShuffledDeck() {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  return shuffledDeck;
}

export function dealHands(): {
  hands: { player1: CardsIndex; player2: CardsIndex };
  cut: CardType;
} {
  const hands = {
    player1: {} as CardsIndex,
    player2: {} as CardsIndex
  };

  const shuffledDeck = getShuffledDeck();

  for (let i = 0; i < HAND_SIZE * 2; i++) {
    i % 2
      ? (hands.player2[shuffledDeck[i].id] = shuffledDeck[i])
      : (hands.player1[shuffledDeck[i].id] = shuffledDeck[i]);
  }

  const cut = shuffledDeck[HAND_SIZE * 2];

  return { hands, cut };
}

// SORTING

export function sortHand(
  cards: CardType[],
  order: SortOrder = SortOrder.LOW_TO_HIGH,
  sortBy: SortBy = SortBy.FACE_VALUE
): CardType[] {
  cards.sort(sortBy === SortBy.FACE_VALUE ? cardSortByValue : cardSortBySuit);

  function cardSortByValue(a: CardType, b: CardType) {
    return a.faceValue - b.faceValue;
  }

  function cardSortBySuit(a: CardType, b: CardType) {
    let suitOrder;
    if (a.suit === Suit.Hearts && a.suit === b.suit) suitOrder = 0;
    else if (a.suit === Suit.Hearts) suitOrder = -1;
    else if (b.suit === Suit.Hearts) suitOrder = 1;
    else if (a.suit === Suit.Spades && a.suit === b.suit) suitOrder = 0;
    else if (a.suit === Suit.Spades) suitOrder = -1;
    else if (b.suit === Suit.Spades) suitOrder = 1;
    else if (a.suit === Suit.Diamonds && a.suit === b.suit) suitOrder = 0;
    else if (a.suit === Suit.Diamonds) suitOrder = -1;
    else if (b.suit === Suit.Diamonds) suitOrder = 1;
    else if (a.suit === Suit.Clubs && a.suit === b.suit) suitOrder = 0;
    else if (a.suit === Suit.Clubs) suitOrder = -1;
    else if (b.suit === Suit.Clubs) suitOrder = 1;

    return order === SortOrder.LOW_TO_HIGH
      ? suitOrder || a.playValue - b.playValue
      : suitOrder || b.playValue - a.playValue;
  }

  return cards;
}

// PEGGING

function maxValuePlayable(cardTotal: number): number {
  return 31 - cardTotal;
}

function cardsPlayable(maxCardValue: number): number[] {
  const playable: number[] = [];
  for (let i = 0; i < Math.min(maxCardValue, 10); i++) {
    playable.push(i);
  }

  return playable;
}

function calcPairs(
  maxCardValue: number,
  cardsPlayed: CardType[]
): { isPair: boolean; cardPlayValue: number; points: number } {
  const pairs = {
    isPair: false,
    cardPlayValue: 0,
    points: 0
  };

  const lastCard = cardsPlayed.slice(-1)[0];
  if (lastCard.playValue > maxCardValue) return pairs;

  const secondLastCard = cardsPlayed.slice(-2, -1)[0];
  // TODO: will this return undefined if no array value
  const thridLastCard = cardsPlayed.slice(-3, -2)[0];
  // TODO: can this just be cardsPlayed[-3]

  for (let i = -1; i >= -3; i--) {
    const card = i === -1 ? cardsPlayed.slice(i)[0] : cardsPlayed.slice(i, i + 1)[0];
    if (pairs.cardPlayValue === 0 && card.playValue > maxCardValue) continue;
    //TODO: check should this break
    else if (pairs.cardPlayValue === 0) {
      pairs.isPair = true;
      pairs.cardPlayValue = card.playValue;
      pairs.points = 2;
    } else if (pairs.cardPlayValue === card.playValue) {
      pairs.points = pairs.points + 2;
    }
  }

  return pairs;
}

export function isPegPairs(cardFaceValue: number, cardsPlayed: CardsIndex = {}): number {
  const cardsPlayedFaceValues = getCardFaceValues(cardsPlayed);
  if (cardFaceValue !== cardsPlayedFaceValues.at(-1)) return 0;

  const { pointsIndex } = cardsPlayedFaceValues.reduceRight<{
    pairValue: number;
    isPair: boolean;
    pointsIndex: number;
  }>(
    (pairAcc, cardFv) => {
      if (!pairAcc.isPair) return pairAcc;
      return cardFv === pairAcc.pairValue
        ? { ...pairAcc, pointsIndex: ++pairAcc.pointsIndex }
        : { ...pairAcc, isPair: false };
    },
    {
      pairValue: cardFaceValue,
      isPair: true,
      pointsIndex: 1
    }
  );

  return pointsIndex * (pointsIndex - 1);
}

function calcFifteen(cardTotal: number): number | null {
  if (cardTotal >= 15 || cardTotal < 5) return null;
  return 15 - cardTotal;
}

export function isPegFifteen(cardPlayValue: number, cardTotal: number): number {
  return cardPlayValue + cardTotal === 15 ? 2 : 0;
}

export function isPegGo(cardPlayValue: number, cardTotal: number) {
  return isPegThirtyOne(cardPlayValue, cardTotal) || 1;
}

export function isPegThirtyOne(cardPlayValue: number, cardTotal: number): number {
  return cardPlayValue + cardTotal === 31 ? 2 : 0;
}

export function getCardFaceValues(cards: CardsIndex) {
  return Object.values(cards).map((card) => card.faceValue);
}

export function getCardPlayValues(cards: CardsIndex) {
  return Object.values(cards).map((card) => card.playValue);
}

export function getCardValues(cards: CardsIndex, key?: CardKey) {
  return key ? Object.values(cards).map((card) => card[key]) : Object.values(cards);
}

export function isPegRun(cardFaceValue: number, cardsPlayed: CardsIndex = {}) {
  const cardsPlayedFaceValues = getCardValues(cardsPlayed, CardKey.FACE) as number[];
  if (cardsPlayedFaceValues.length < 2) return 0;

  // if a cardValue === faceValue has already been played it breaks the run
  const runStart = cardsPlayedFaceValues.lastIndexOf(cardFaceValue);
  const validPlayed =
    runStart !== -1
      ? cardsPlayedFaceValues.slice(runStart + 1).concat(cardFaceValue)
      : cardsPlayedFaceValues.concat(cardFaceValue);
  console.log('validPlayed', validPlayed);

  const validateRun = validPlayed.reduceRight(
    (runAcc: { points: number; prevCardValues: number[] }, cardFv: number) => {
      const runCards = [...runAcc.prevCardValues, cardFv];
      const updatedAcc = { ...runAcc, prevCardValues: runCards };

      if (runAcc.prevCardValues.length < 2) return updatedAcc;

      const sortedCards = [...runCards].sort((a: number, b: number) => a - b);
      const isRunIncrement = sortedCards.filter((value, i, arr) =>
        arr[i + 1] ? value === arr[i + 1] - 1 : true
      );

      return isRunIncrement.length === sortedCards.length && isRunIncrement.includes(cardFaceValue)
        ? { points: runCards.length, prevCardValues: sortedCards }
        : updatedAcc;
    },
    { points: 0, prevCardValues: [] }
  );

  return validateRun.points;
}

function isRunIncrement(cardsFaceValues: number[]): boolean {
  const sortedCards = [...cardsFaceValues].sort((a: number, b: number) => a - b);
  const isRunIncrement = sortedCards.filter((value, i, arr) =>
    arr[i + 1] ? value === arr[i + 1] - 1 : true
  );
  return isRunIncrement.length === sortedCards.length;
}

// SCORING
export function scorePairs(cardFaceValues: number[], cutFaceValue: number): number {
  // FIXME: refactor to separate function; all used in scoreRuns
  const values = [...cardFaceValues, cutFaceValue];
  const uniqueSorted = [...new Set(values)].sort((a, b) => a - b);

  if (values.length === uniqueSorted.length) return 0;

  const points = uniqueSorted.reduce((pointsTotal, cardFv) => {
    const paired = values.filter((value) => value === cardFv);
    const points = paired.length * (paired.length - 1);
    return pointsTotal + points;
  }, 0);
  // .forEach((numArr) => (numArr.length ? (points = points * numArr.length) : null));

  return points;
}

export function scoreFifteens(cardPlayValues: number[], cutPlayValue: number): number {
  const fifteens = cardPlayValues
    .reduce(
      (sums, cardValue) => {
        return [...sums, ...sums.map((sum) => sum + cardValue), cardValue];
      },
      [cutPlayValue]
    )
    .filter((sum) => sum === 15).length;
  return fifteens * 2;
}

export function scoreRuns(cardFaceValues: number[], cutFaceValue: number): number {
  const values = [...cardFaceValues, cutFaceValue];
  const uniqueSorted = [...new Set(values)].sort((a, b) => a - b);

  const run = uniqueSorted.reduce(
    (
      runAcc: { isRun: boolean; values: number[] },
      cardFv: number
    ): { isRun: boolean; values: number[] } => {
      const prevValue = runAcc.values.at(-1);
      const isIncrement = prevValue && cardFv === prevValue + 1;
      if (!prevValue) return { isRun: false, values: [cardFv] };

      if (isIncrement) {
        const updatedValues = [...runAcc.values, cardFv];
        const isRun = updatedValues.length >= 3;
        return { isRun, values: updatedValues };
      }

      if (!isIncrement && !runAcc.isRun) {
        const updatedValues = [cardFv];
        return { isRun: false, values: updatedValues };
      } else return runAcc;
    },
    { isRun: false, values: [] }
  );

  if (!run.isRun) return 0;
  let points = run.values.length;
  const pairedCards = run.values
    .map((runCardValue) => values.filter((value) => value === runCardValue))
    .forEach((numArr) => (numArr.length ? (points = points * numArr.length) : null));

  return points;
}

export function scoreFlush(cardSuits: Suit[], cutSuit: Suit): number {
  let points = 0;
  const isFlush = [...new Set(cardSuits)].length === 1;
  if (isFlush) points = 4;
  if (isFlush && cardSuits[0] === cutSuit) points++;
  return points;
}
