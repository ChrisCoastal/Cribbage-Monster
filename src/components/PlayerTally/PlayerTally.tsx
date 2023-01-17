import React, { FC, ReactNode } from 'react';
import {
  CardBoxHeight,
  CardBoxWidth,
  CardOverlap,
  CardsIndex,
  CardSize,
  CardType,
  AvatarSize
} from 'src/@types';

import Avatar from 'src/components/Avatar/Avatar';
import CardBox from 'src/components/CardBox/CardBox';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import { getCardValues } from 'src/utils/helpers';
import Card from 'src/components/UI/Card';

type PlayerTallyProps = {
  displayName: string;
  avatar: string;
  cards: CardsIndex;
  cut: CardType;
  scores: ReactNode;
  total: ReactNode;
  children?: ReactNode;
};

const PlayerTally: FC<PlayerTallyProps> = ({ displayName, avatar, cards, cut, scores, total }) => {
  const cardValues = getCardValues(cards) as CardType[];

  function renderCards(
    cards: CardType[] = [],
    faceUp: boolean,
    cardSize: CardSize,
    overlap: CardOverlap
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
      <Card>
        <div className="flex items-center gap-2">
          <Avatar className={AvatarSize.SM} avatar={avatar} />
          <h3 className="text-lg font-bold">{displayName}</h3>
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
          <ul className="grid grid-cols-2 justify-items-start gap-x-8 py-2 text-sm">{scores}</ul>
          <ul className="flex items-center text-3xl font-bold">{total}</ul>
        </div>
      </Card>
    </>
  );
};

export default PlayerTally;
