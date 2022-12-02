import React, { FC } from 'react';
import { CardType } from 'src/@types';

type PlayingCardProps = {
  cardSize: string;
  isFaceUp: boolean;
  card: CardType;
  cardPos?: string;
  handler?: (card: CardType) => void;
};

const PlayingCard: FC<PlayingCardProps> = ({ cardSize, isFaceUp, card, cardPos, handler }) => {
  return isFaceUp ? (
    <div
      onClick={() => (handler ? handler(card) : null)}
      className={`${cardPos} grid grid-rows-3 grid-columns-3 border-solid border-black border rounded-md`}>
      <div className="flex flex-col col-start-1 text-sm">
        <span>{card.faceValue}</span>
        <span>{card.suit.slice(0, 2)}</span>
      </div>
      <div className="flex flex-col col-start-3 row-start-3 text-sm">
        <div className="flex flex-col col-start-1 text-sm">
          <span>{card.faceValue}</span>
          <span>{card.suit.slice(0, 2)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${cardSize} ${cardPos} absolute top-[12px] left-[2px] bg-red-200 border-black border rounded-[10%]`}
      onClick={() => (handler ? handler(card) : null)}></div>
  );
};

export default PlayingCard;
