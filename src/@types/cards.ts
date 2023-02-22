export enum Suit {
  Spades = 'SPADES',
  Hearts = 'HEARTS',
  Clubs = 'CLUBS',
  Diamonds = 'DIAMONDS'
}

export type CardName = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export type CardType = {
  id: number;
  suit: Suit;
  name: CardName;
  faceValue: number;
  playValue: number;
};

export type Deck = CardType[];
