import { CardName, CardType, Suit } from 'src/@types';
import { CARDS_IN_DECK, CARDS_PER_SUIT } from './constants';

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
    const card = {
      id: i,
      suit: suits[0],
      name,
      faceValue
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

// TODO: does this need to be coordinated with firebase?
// export function dealCards(shuffledDeck: CardType[]): {
//   playerHand: CardType[];
//   opponentHand: CardType[];
// } {
//   const hands = {
//     playerHand: [],
//     opponenthand: []
//   };

//   shuff

//   return {};
// }

//TODO:
// isPairs
//
