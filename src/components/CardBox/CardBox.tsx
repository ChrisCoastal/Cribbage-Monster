import React, { FC } from 'react';
import { CardOverlap } from 'src/@types';
import useGameContext from 'src/hooks/useGameContext';

type CardBoxProps = {
  // cards: CardType[];
  maxCards: number;
  size: {
    height: string;
    width: string;
  };
  overlap: CardOverlap;
  placement?: string;
  children?: React.ReactNode;
};

const CardBox: FC<CardBoxProps> = ({ maxCards, size, overlap, placement, children }) => {
  const { gameState, dispatchGame } = useGameContext();

  const cardCols = [
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8'
  ];

  return (
    <div className={`${placement}`}>
      <div
        className={`${size.height} ${size.width} ${cardCols[maxCards - overlap]} grid grid-rows-1`}>
        {children}
      </div>
    </div>
  );
};

export default CardBox;
