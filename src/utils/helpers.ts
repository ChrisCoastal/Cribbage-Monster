import {
  CardKey,
  CardName,
  CardsIndex,
  CardType,
  GameId,
  IsActive,
  Player,
  PlayerPos,
  ScoreType,
  SortBy,
  SortOrder,
  Suit,
  TallyPoints,
  TurnType,
  UserId
} from 'src/@types';
import { CARDS_IN_DECK, CARDS_PER_SUIT, HAND_SIZE } from './constants';
import { ref } from 'firebase/database';
import { rtdb } from 'src/firestore.config';

// REALTIME DATABASE REFS
// game scores
export const getGameTalliesRef = (gameId: GameId) => ref(rtdb, `gameTallies/${gameId}`);

// game list
export const getGamesList = () => ref(rtdb, `gamesList`);

// game
export const getGameRef = (gameId: GameId) => ref(rtdb, `games/${gameId}`);

export const getActivePlayerRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/players/${player}/activePlayer`);

export const getPlayersRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/players`);

export const getPlayerRef = (gameId: GameId, player?: PlayerPos) =>
  ref(rtdb, `games/${gameId}/players/${player}`);

export const getDealerRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/dealer`);

export const getPlayerCards = (gameId: GameId, player?: PlayerPos) =>
  ref(rtdb, `games/${gameId}/playerCards/${player}`);

export const getPlayerCardsPlayedRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/playerCards/${player}/played`);

export const getInHandRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/playerCards/${player}/inHand`);

export const getDeckRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/deckCut`);

export const getCribRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/crib`);

export const getTurnRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/turnTotals`);

export const getCardsPlayedRef = (gameId: GameId) =>
  ref(rtdb, `games/${gameId}/turnTotals/cardsPlayed`);

export const getCardTotalRef = (gameId: GameId) =>
  ref(rtdb, `games/${gameId}/turnTotals/cardTotal`);

export const getTallyRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/tally`);

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

export function getPone(dealer: PlayerPos): PlayerPos {
  return dealer === PlayerPos.P_ONE ? PlayerPos.P_TWO : PlayerPos.P_ONE;
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

  const cardNames: CardName[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Clubs, Suit.Diamonds];
  let faceValue = 1;

  for (let i = 0; i < CARDS_IN_DECK; i++) {
    if (i !== 0 && !(i % CARDS_PER_SUIT)) {
      suits.shift();
      faceValue = 1;
    }

    const name: CardName = cardNames[faceValue - 1];
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

// PLAYER STATUS

export function isPlayerActive(player: Player): boolean {
  return player.activePlayer === IsActive.ACTIVE;
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

export function filterCard(cards: CardsIndex, cardId: number): CardType[] {
  const cardIds = getCardValues(cards) as CardType[];
  return cardIds.filter((card) => card.id !== cardId);
}

export function getCardValues(cards: CardsIndex, key?: CardKey) {
  return key ? Object.values(cards).map((card) => card[key]) : Object.values(cards);
}

export function updateCardTotal(cardPlayValue: number, cardTotal: number): number {
  return cardPlayValue + cardTotal;
}

export function isCardValid(cardPlayValue: number, cardTotal: number): boolean {
  return cardPlayValue + cardTotal <= 31;
}

// PEGGING
export function isPegPoints(
  card: CardType,
  turnTotals: TurnType,
  playerHand: CardsIndex,
  opponentHand: CardsIndex
) {
  const updatedCardTotal = updateCardTotal(card.playValue, turnTotals.cardTotal);
  const opponentGo = expectGo(opponentHand, updatedCardTotal);
  const playerGo = expectGo(playerHand, updatedCardTotal, card);

  const pairs = isPegPairs(card.faceValue, turnTotals.cardsPlayed);
  const fifteen = isPegFifteen(card.playValue, turnTotals.cardTotal);
  const run = isPegRun(card.faceValue, turnTotals.cardsPlayed);
  const go = opponentGo && playerGo ? isPegGo(card.playValue, turnTotals.cardTotal) : 0;
  const points = pairs + fifteen + run + go;

  return points;
}

export function expectGo(hand: CardsIndex, cardTotal: number, cardPlayed?: CardType): boolean {
  // played card still in state, must be filtered from array
  const validCards = Object.values(hand).filter(
    (card) => card.id !== cardPlayed?.id && isCardValid(card.playValue, cardTotal)
  );

  return !validCards.length;
}

export function isPegJack(cardFaceValue: number): number {
  return cardFaceValue === 11 ? 2 : 0;
}

export function isPegPairs(cardFaceValue: number, cardsPlayed: CardsIndex = {}): number {
  const cardFaceValues = getCardValues(cardsPlayed, CardKey.FACE) as number[];
  if (cardFaceValue !== cardFaceValues.at(-1)) return 0;

  const { pointsIndex } = cardFaceValues.reduceRight<{
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

export function isPegFifteen(cardPlayValue: number, cardTotal: number): number {
  return cardPlayValue + cardTotal === 15 ? 2 : 0;
}

export function isPegGo(cardPlayValue: number, cardTotal: number) {
  return isPegThirtyOne(cardPlayValue, cardTotal) || 1;
}

export function isPegThirtyOne(cardPlayValue: number, cardTotal: number): number {
  return cardPlayValue + cardTotal === 31 ? 2 : 0;
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

// SCORING
export function isWinner(
  score: { player1: ScoreType; player2: ScoreType },
  dealer: PlayerPos
): PlayerPos | null {
  const pone = getPone(dealer);
  // pone counts first
  if (score[pone].cur >= 121) return pone;
  if (score[dealer].cur >= 121) return dealer;
  return null;
}

export function isScorePoints(hand: CardsIndex, cutCard: CardType, isCrib?: 'crib'): TallyPoints {
  const pairs = scorePairs(hand, cutCard);
  const fifteens = scoreFifteens(hand, cutCard);
  const runs = scoreRuns(hand, cutCard);
  const flush = scoreFlush(hand, cutCard, isCrib);
  const jack = scoreSuitedJack(hand, cutCard);
  const totalPoints = pairs + fifteens + runs + flush + jack;

  return { pairs, fifteens, runs, flush, jack, totalPoints };
}

export function scorePairs(cards: CardsIndex, cutCard: CardType): number {
  // TODO: refactor to separate function; all used in scoreRuns
  const cardFaceValues = getCardValues(cards, CardKey.FACE) as number[];
  const values = [...cardFaceValues, cutCard.faceValue];
  const uniqueSorted = [...new Set(values)].sort((a, b) => a - b);

  if (values.length === uniqueSorted.length) return 0;

  const points = uniqueSorted.reduce((pointsTotal, cardFv) => {
    const paired = values.filter((value) => value === cardFv);
    const points = paired.length * (paired.length - 1);
    return pointsTotal + points;
  }, 0);

  return points;
}

export function scoreFifteens(cards: CardsIndex, cutCard: CardType): number {
  const cardPlayValues = getCardValues(cards, CardKey.PLAY) as number[];
  const fifteens = cardPlayValues
    .reduce(
      (sums, cardValue) => {
        return [...sums, ...sums.map((sum) => sum + cardValue), cardValue];
      },
      [cutCard.playValue]
    )
    .filter((sum) => sum === 15).length;
  return fifteens * 2;
}

export function scoreRuns(cards: CardsIndex, cutCard: CardType): number {
  const cardFaceValues = getCardValues(cards, CardKey.FACE) as number[];
  const values = [...cardFaceValues, cutCard.faceValue];
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

export function scoreFlush(cards: CardsIndex, cutCard: CardType, isCrib?: 'crib'): number {
  const cardSuits = getCardValues(cards, CardKey.SUIT) as string[];
  let points = 0;
  const isFlush = [...new Set(cardSuits)].length === 1;
  const matchCut = isFlush && cardSuits[0] === cutCard.suit;
  if (!isCrib && isFlush) points = 4;
  if (!isCrib && matchCut) points++;
  else if (isCrib && matchCut) points = 5;
  return points;
}

export function scoreSuitedJack(cards: CardsIndex, cutCard: CardType): number {
  const cardValues = getCardValues(cards) as CardType[];
  return cardValues.filter((card) => card.name === 'J' && card.suit === cutCard.suit).length;
}
