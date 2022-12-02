import React, { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import { CardType } from 'src/@types';

type PlayedCardBoxProps = {
  cards: CardType[];
};

const PlayedCardBox: FC<PlayedCardBoxProps> = ({ cards }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: nanoid()
    disabled:
  });
  return <div>PlayedCard</div>;
};

export default PlayedCardBox;
