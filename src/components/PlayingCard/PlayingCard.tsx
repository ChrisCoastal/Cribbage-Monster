import React, { FC } from 'react';
import { CardType } from 'src/@types';

type PlayingCardProps = {
  cardSize: string;
  isFaceUp: boolean;
  card: CardType;
  cardIndex: number;
  // cardPos?: string;
  handler?: (card: CardType) => void;
};

const PlayingCard: FC<PlayingCardProps> = ({ cardSize, isFaceUp, card, cardIndex, handler }) => {
  const cardPos = [
    'bg-red-200 col-start-1 col-end-4 row-start-1',
    'bg-blue-200 col-start-2 col-end-5 row-start-1',
    'bg-green-200 col-start-3 col-end-6 row-start-1',
    'bg-orange-200 col-start-4 col-end-7 row-start-1',
    'bg-purple-200 col-start-5 col-end-8 row-start-1',
    'bg-yellow-200 col-start-6 col-end-9 row-start-1'
  ];

  return isFaceUp ? (
    <div
      onClick={() => (handler ? handler(card) : null)}
      className={`${cardSize} ${cardPos[cardIndex]} grid grid-rows-3 grid-columns-3 items-center border-solid border-black border rounded-[4%]`}>
      <div className="flex flex-col col-start-1 justify-self-center text-sm">
        <span>{card.faceValue}</span>
        <span>{card.suit.slice(0, 2)}</span>
      </div>
      <div className="flex flex-col col-start-3 row-start-3 justify-self-center text-sm">
        <div className="flex flex-col col-start-1 text-sm">
          <span>{card.faceValue}</span>
          <span>{card.suit.slice(0, 2)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${cardSize} ${cardPos} absolute top-[12px] left-[2px] bg-red-200 border-black border rounded-[4%]`}
      onClick={() => (handler ? handler(card) : null)}></div>
  );
};

export default PlayingCard;
