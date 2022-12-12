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

  const cardRotation = ['-rotate-3', 'rotate-3']; // ${cardRotation[cardIndex % 2]}
  const cardRotationHand = [
    'rotate-[-8deg] translate-y-2 hover:translate-y-0',
    'rotate-[-4deg] translate-y-1 hover:-translate-y-1',
    'rotate-[-2deg] hover:-translate-y-2',
    'rotate-[2deg] hover:-translate-y-2',
    'rotate-[4deg] translate-y-1 hover:-translate-y-1',
    'rotate-[8deg] translate-y-2 hover:translate-y-0'
  ];

  return isFaceUp ? (
    <div
      onClick={() => (handler ? handler(card) : null)}
      className={`${cardSize} ${cardPos[cardIndex]} ${cardRotationHand[cardIndex]} grid-columns-3 grid grid-rows-3 items-center rounded-[4%] border border-solid border-black transition-all duration-300`}>
      <div className="col-start-1 flex flex-col justify-self-center text-sm">
        <span>{card.faceValue}</span>
        <span>{card.suit.slice(0, 2)}</span>
      </div>
      <div className="col-start-3 row-start-3 flex flex-col justify-self-center text-sm">
        <div className="col-start-1 flex flex-col text-sm">
          <span>{card.faceValue}</span>
          <span>{card.suit.slice(0, 2)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${cardSize} ${cardPos} absolute top-[12px] left-[2px] rounded-[4%] border border-black bg-red-200`}
      onClick={() => (handler ? handler(card) : null)}></div>
  );
};

export default PlayingCard;