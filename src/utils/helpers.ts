import {
  CardName,
  Cards,
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

export const getCardsPlayedRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/playerCards/${player}/played`);

export const getInHandRef = (gameId: GameId, player: PlayerPos) =>
  ref(rtdb, `games/${gameId}/playerCards/${player}/inHand`);

export const getDealerRef = (gameId: GameId, dealer: PlayerPos) =>
  ref(rtdb, `games/${gameId}/players/${dealer}`);

export const getCribRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/crib`);

export const getActivePlayerRef = (gameId: GameId) => ref(rtdb, `games/${gameId}/activePlayer`);

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

// TODO: does this need to be coordinated with firebase?
// yes, it needs to be kept aligned
export function dealHands(): {
  player1: Cards;
  player2: Cards;
} {
  const hands = {
    player1: {} as Cards,
    player2: {} as Cards
  };

  const shuffledDeck = getShuffledDeck();

  for (let i = 0; i < HAND_SIZE * 2; i++) {
    i % 2
      ? (hands.player2[shuffledDeck[i].id] = shuffledDeck[i])
      : (hands.player1[shuffledDeck[i].id] = shuffledDeck[i]);
  }

  return hands;
}

// SORTING

export function sortHand(
  cards: CardType[],
  order: SortOrder = SortOrder.LOW_TO_HIGH,
  sortBy: SortBy = SortBy.FACE_VALUE
): CardType[] {
  // const sortedCards: CardType[] = JSON.parse(JSON.stringify(cards));
  // sortedCards.sort(sortBy === SortBy.FACE_VALUE ? cardSortByValue : cardSortBySuit);
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

// SCORING

//TODO:
// isPairs
//

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

function isPairs(cardsPlayed: CardType[]): {
  cardValues: number[];
  isPair: boolean;
  points: number;
} {
  const cardFaceValues = getCardFaceValues(cardsPlayed);
  const pairPoints = [0, 2, 6, 12];
  const pair = cardFaceValues.reduceRight<{
    cardValues: number[];
    isPair: boolean;
    pairBroken: boolean;
    points: number;
  }>(
    (prevCards, curCard, i) => {
      if (prevCards.pairBroken) return prevCards;
      if (!prevCards.cardValues.length) {
        return { ...prevCards, cardValues: [curCard] };
      }

      if (prevCards.cardValues.at(-1) === curCard) {
        const cardValues: number[] = [...prevCards.cardValues, curCard];
        return {
          cardValues,
          isPair: true,
          pairBroken: false,
          points: pairPoints[cardValues.length - 1]
        };
      }
      if (prevCards.cardValues.at(-1) !== curCard) return { ...prevCards, pairBroken: true };
      return prevCards;
    },
    {
      cardValues: [],
      isPair: false,
      pairBroken: false,
      points: 0
    }
  );

  return pair;
}

function calcFifteen(cardTotal: number): number | null {
  if (cardTotal >= 15 || cardTotal < 5) return null;
  return 15 - cardTotal;
}

function isFifteen(cardTotal: number): boolean {
  return cardTotal === 15;
}

function getCardFaceValues(cards: CardType[]) {
  return cards.map((card) => card.faceValue);
}

function getCardPlayValues(cards: CardType[]) {
  return cards.map((card) => card.playValue);
}

// need to kep track of the length of the valid run
// card to make run

type Run = {
  difference: number;
  prevFaceValue: number;
  validCards: number[];
  runLength: number;
};

function isRun(cardsPlayed: CardType[]): number[] {
  const makeRun: number[] = [];
  if (cardsPlayed.length < 2) return makeRun;

  const sortedPlayed = cardsPlayed
    .slice()
    .sort((a: CardType, b: CardType) => a.playValue - b.playValue);
  const lowRunFaceValue = sortedPlayed[0].faceValue - 1;
  const highRunFaceValue = sortedPlayed[-1].faceValue + 1;
  const runValid = sortedPlayed.reduceRight<Run>(
    (isRun, card, i) => {
      if (isRun.difference > 2) return isRun;
      if (!isRun.prevFaceValue)
        return { difference: -1, prevFaceValue: card.faceValue, validCards: [], runLength: 1 };
      // this still doesn't work b/c there could be both a valid inner card and outer
      else if (card.faceValue - isRun.prevFaceValue === 1)
        return {
          difference: Math.max(isRun.difference, 1),
          prevFaceValue: card.faceValue,
          validCards: isRun.validCards,
          runLength: isRun.runLength++
        };
      else if (card.faceValue - isRun.prevFaceValue === 2)
        return {
          difference: Math.max(isRun.difference, 2),
          prevFaceValue: card.faceValue,
          validCards: [card.faceValue - 1],
          runLength: isRun.difference === 2 ? isRun.runLength : isRun.runLength++
        };
      else if (card.faceValue - isRun.prevFaceValue > 2)
        return {
          difference: 3,
          prevFaceValue: card.faceValue,
          validCards: isRun.validCards,
          runLength: isRun.runLength
        };
      return isRun;
    },
    {
      difference: -1,
      prevFaceValue: -1,
      validCards: [],
      runLength: 0
    }
  );

  return makeRun;
}
