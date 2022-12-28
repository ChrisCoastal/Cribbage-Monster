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
  // const { isOver, setNodeRef } = useDroppable({
  //   id: nanoid(),
  //   disabled: !gameState.activePlayer
  // });

  // const style = isOver ? 'bg-neutral-800' : undefined;

  // const cardPos = [
  //   'bg-red-200 col-start-1 col-end-4 row-start-1',
  //   'bg-blue-200 col-start-2 col-end-5 row-start-1',
  //   'bg-green-200 col-start-3 col-end-6 row-start-1',
  //   'bg-orange-200 col-start-4 col-end-7 row-start-1',
  //   'bg-purple-200 col-start-5 col-end-8 row-start-1',
  //   'bg-yellow-200 col-start-6 col-end-9 row-start-1'
  // ];

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
