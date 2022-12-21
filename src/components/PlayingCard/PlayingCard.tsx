import React, { FC } from 'react';
import { CardOverlap, CardSize, CardType, IsActive, UserId } from 'src/@types';
import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import { getPlayerOpponent } from 'src/utils/helpers';

type PlayingCardProps = {
  cardSize: string;
  isFaceUp: boolean;
  card: CardType;
  cardIndex: number;
  overlap: CardOverlap;
  valid?: boolean;
  handler?: (card: CardType) => void;
};

const PlayingCard: FC<PlayingCardProps> = ({
  cardSize,
  isFaceUp,
  card,
  cardIndex,
  overlap,
  valid,
  handler
}) => {
  const { userAuth } = useAuthContext();
  const { gameState } = useGameContext();
  const { player } = getPlayerOpponent(gameState.players, userAuth!.uid!);
  const activePlayer = gameState.players[player].activePlayer === IsActive.ACTIVE;

  const cardPos =
    overlap === CardOverlap.HALF
      ? [
          'col-start-1 col-end-3 row-start-1 z-[20]',
          'col-start-2 col-end-4 row-start-1 z-[22]',
          'col-start-3 col-end-5 row-start-1 z-[24]',
          'col-start-4 col-end-6 row-start-1 z-[26]',
          'col-start-5 col-end-7 row-start-1 z-[28]',
          'col-start-6 col-end-8 row-start-1 z-[30]'
        ]
      : [
          'col-start-1 col-end-4 row-start-1 z-[20]',
          'col-start-2 col-end-5 row-start-1 z-[22]',
          'col-start-3 col-end-6 row-start-1 z-[24]',
          'col-start-4 col-end-7 row-start-1 z-[26]',
          'col-start-5 col-end-8 row-start-1 z-[28]',
          'col-start-6 col-end-9 row-start-1 z-[30]'
        ];

  const cardRotation = ['-rotate-3', 'rotate-3']; // ${cardRotation[cardIndex % 2]}
  const cardRotationHand = [
    'rotate-[-8deg] translate-y-2',
    'rotate-[-4deg] translate-y-1',
    'rotate-[-2deg]',
    'rotate-[2deg]',
    'rotate-[4deg] translate-y-1',
    'rotate-[8deg] translate-y-2'
  ];
  const cardHover = [
    'hover:translate-y-0',
    'hover:-translate-y-1',
    'hover:-translate-y-2',
    'hover:-translate-y-2',
    'hover:-translate-y-1',
    'hover:translate-y-0'
  ];

  const conditionalStyles = `${cardSize} ${cardPos[cardIndex]} ${
    cardSize === CardSize.LG ? cardRotationHand[cardIndex] : cardRotation[cardIndex % 2]
  } ${activePlayer && valid && cardHover[cardIndex]}`;

  return isFaceUp ? (
    <div
      onClick={() => (handler ? handler(card) : null)}
      className={`${conditionalStyles} grid-columns-3 grid grid-rows-3 items-center rounded-[4%] border border-solid border-black bg-white transition-all duration-300`}>
      <div className="col-start-1 flex flex-col justify-self-center text-sm">
        <span className="pointer-events-none">{card.faceValue}</span>
        <span className="pointer-events-none">{card.suit.slice(0, 2)}</span>
      </div>
      <div className="col-start-3 row-start-3 flex flex-col justify-self-center text-sm">
        <div className="col-start-1 flex flex-col text-sm">
          <span className="pointer-events-none">{card.faceValue}</span>
          <span className="pointer-events-none">{card.suit.slice(0, 2)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${cardSize} ${cardPos[cardIndex]} grid-columns-3 grid grid-rows-3 items-center rounded-[4%] border border-solid border-black bg-white transition-all duration-300`}
      onClick={() => (handler ? handler(card) : null)}></div>
  );
};

export default PlayingCard;
