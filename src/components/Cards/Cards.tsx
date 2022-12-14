import { FC, useRef } from 'react';
import { CardBoxHeight, CardBoxWidth, CardType, CardSize, GameReducerTypes } from 'src/@types';
import { getShuffledDeck } from 'src/utils/helpers';
import CardBox from '../CardBox/CardBox';
import PlayingCard from '../PlayingCard/PlayingCard';

import useGameContext from 'src/hooks/useGameContext';

type CardsProps = {
  cardHeight: string;
  isFaceUp: boolean;
  cards: CardType[];
};

const Cards: FC<CardsProps> = ({ cardHeight, isFaceUp, cards }) => {
  const deck = useRef<CardType[]>(getShuffledDeck());
  const { gameState, dispatchGame } = useGameContext();

  const hand = deck.current.slice(0, 6);

  function cardClickHandler(card: CardType) {
    console.log(card);
    dispatchGame({ type: GameReducerTypes.PLAY_CARD, payload: card });
  }

  const cardPos = [
    'bg-red-200 col-start-1 col-end-4 row-start-1',
    'bg-blue-200 col-start-2 col-end-5 row-start-1',
    'bg-green-200 col-start-3 col-end-6 row-start-1',
    'bg-orange-200 col-start-4 col-end-7 row-start-1',
    'bg-purple-200 col-start-5 col-end-8 row-start-1',
    'bg-yellow-200 col-start-6 col-end-9 row-start-1'
  ];

  const cardCols = [
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8'
  ];

  const cardRotation = ['-rotate-3', 'rotate-3'];

  const handUI = cards.map((card, i) => (
    <PlayingCard
      key={i}
      isFaceUp={true}
      cardSize={CardSize.LG}
      cardIndex={i}
      card={card}
      handler={cardClickHandler}
    />
  ));

  return (
    <CardBox
      size={{ height: CardBoxHeight.LG, width: CardBoxWidth.LG_SIX }}
      maxCards={6}
      placement="self-center place-self-center"
    >
      {handUI}
    </CardBox>
  );
};

export default Cards;
