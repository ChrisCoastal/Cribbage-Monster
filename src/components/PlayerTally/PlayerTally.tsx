import React, { FC, ReactNode } from 'react';
import {
  CardBoxHeight,
  CardBoxWidth,
  CardOverlap,
  CardsIndex,
  CardSize,
  CardType
} from 'src/@types';

import Avatar from 'src/components/Avatar/Avatar';
import CardBox from 'src/components/CardBox/CardBox';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import { getCardValues } from 'src/utils/helpers';

type PlayerTallyProps = {
  cards: CardsIndex;
  cut: CardType;
  children?: ReactNode;
};

const PlayerTally: FC<PlayerTallyProps> = ({ cards, cut, children }) => {
  const cardValues = getCardValues(cards) as CardType[];

  function renderCards(
    cards: CardType[] = [],
    faceUp: boolean,
    cardSize: CardSize,
    overlap: CardOverlap,
    playerHand: boolean = false
  ) {
    return cards.map((card, i) => (
      <PlayingCard
        key={card.id}
        isFaceUp={faceUp}
        cardSize={cardSize}
        cardIndex={i}
        card={card}
        overlap={overlap}
      />
    ));
  }

  const playerCards = renderCards(cardValues, true, CardSize.MD, CardOverlap.HALF);
  const cutCard = (
    <PlayingCard
      isFaceUp={true}
      cardSize={CardSize.MD}
      cardIndex={0}
      card={cut}
      overlap={CardOverlap.NONE}
    />
  );

  return (
    <>
      <div className="flex-col rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 p-4 text-neutral-800">
        <div className="flex items-center gap-2">
          <Avatar />
          <h3 className="text-lg font-bold">chris</h3>
        </div>
        <div className="flex gap-4 py-4">
          <CardBox
            maxCards={4}
            size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_FOUR_HALF }}
            overlap={CardOverlap.HALF}>
            {playerCards}
          </CardBox>
          <CardBox
            maxCards={0}
            size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_ONE }}
            overlap={CardOverlap.NONE}>
            {cutCard}
          </CardBox>
        </div>
        <div>
          <ul className="grid grid-cols-2 justify-items-start gap-x-8 py-2 text-sm">{children}</ul>
          <div className="text-center text-3xl font-bold">{`TOTAL: 100`}</div>
        </div>
      </div>
    </>
  );
};

export default PlayerTally;
