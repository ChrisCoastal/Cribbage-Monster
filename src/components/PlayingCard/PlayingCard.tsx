import React, { FC } from 'react';
import { CardOverlap, CardSize, CardType, IsActive, UserId } from 'src/@types';
import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import { getPlayerOpponent } from 'src/utils/helpers';
import SuitIcon from '../UI/icons/SuitIcon/SuitIcon';

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
  // const style = { 'var(--color)': yourColor } as React.CSSProperties;
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

  const cardRotation = ['-rotate-3', 'rotate-3 -translate-y-1']; // ${cardRotation[cardIndex % 2]}
  const cardRotationHand = [
    'rotate-[-8deg] translate-y-2',
    'rotate-[-4deg] translate-y-1',
    'rotate-[-2deg]',
    'rotate-[2deg]',
    'rotate-[4deg] translate-y-1',
    'rotate-[8deg] translate-y-2'
  ];
  const cardRotationOpponentHand = [
    'rotate-[28deg] -translate-y-[0.2rem]',
    'rotate-[16deg] -translate-y-[0.1rem]',
    'rotate-[4deg]',
    'rotate-[-4deg]',
    'rotate-[-16deg] -translate-y-[0.1rem]',
    'rotate-[-28deg] -translate-y-[0.2rem]'
  ];
  const cardHover = [
    'hover:translate-y-0',
    'hover:-translate-y-1',
    'hover:-translate-y-2',
    'hover:-translate-y-2',
    'hover:-translate-y-1',
    'hover:translate-y-0'
  ];

  const corners =
    cardSize === CardSize.LG
      ? 'rounded-[4%] p-2'
      : cardSize === CardSize.MD
      ? 'rounded-[8%] p-1'
      : 'rounded-[10%]';

  const sizeVars =
    cardSize === CardSize.LG
      ? `${cardRotationHand[cardIndex]}`
      : cardSize === CardSize.MD
      ? `${overlap === CardOverlap.HALF && cardRotation[cardIndex % 2]}`
      : `${cardRotationOpponentHand[cardIndex]}`;

  const conditionalStyles = `${cardSize} ${cardPos[cardIndex]} ${
    activePlayer && valid && cardHover[cardIndex]
  } `;

  const iconSize = cardSize === CardSize.LG ? '1.8rem' : '1rem';
  const cardMarking = (
    <>
      <span className="pointer-events-none font-bold">{card.name}</span>
      <span className="pointer-events-none">
        <SuitIcon suit={card.suit} height={iconSize} width={iconSize} />
      </span>
    </>
  );

  const cardBack = cardSize === CardSize.MD ? 'bg-cardback-md' : 'bg-cardback-sm';
  const cardBackBorder = cardSize === CardSize.MD ? 'p-[3px]' : 'p-[2px]';

  return isFaceUp ? (
    <div
      onClick={() => (handler ? handler(card) : null)}
      className={`${conditionalStyles} ${sizeVars} ${corners} border border-solid border-neutral-100 bg-white transition-all duration-300`}>
      <div
        className={`${corners} grid-columns-3 shadow-[-4px_4px_8px_rgba(0,0,0,0.05) grid max-h-full max-w-full grid-rows-3 items-center border border-solid border-neutral-500 bg-white`}>
        <div className="col-start-1 mt-2 flex-col gap-1 justify-self-center text-sm">
          {cardMarking}
        </div>
        <div className="col-start-3 row-start-3 flex flex-col justify-self-center text-sm">
          <div className="col-start-1 mb-2 rotate-180 flex-col gap-1 justify-self-center text-sm">
            {cardMarking}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${cardSize} ${cardPos[cardIndex]} ${sizeVars} ${cardBackBorder} ${corners} border border-solid border-neutral-100 bg-white transition-all duration-300`}
      onClick={() => (handler ? handler(card) : null)}>
      <div className={`${cardBack} h-full w-full bg-repeat`}></div>
    </div>
  );
};

export default PlayingCard;
