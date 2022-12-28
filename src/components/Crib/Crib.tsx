import { nanoid } from 'nanoid';
import { FC } from 'react';
import { CardSize, CardBoxHeight, CardBoxWidth, CardOverlap, CardsIndex } from 'src/@types';

import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import CardBox from '../CardBox/CardBox';

type CribProps = {
  cribCards: CardsIndex;
};

const Crib: FC<CribProps> = ({ cribCards }) => {
  const renderCrib = Object.values(cribCards).map((card) => (
    <PlayingCard
      key={nanoid()}
      isFaceUp={false}
      cardSize={CardSize.MD}
      cardIndex={0}
      card={card}
      overlap={CardOverlap.TWO_THIRDS}
      handler={() => null}
    />
  ));

  return (
    <>
      <CardBox
        size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_ONE }}
        maxCards={0}
        overlap={CardOverlap.NONE}>
        {renderCrib}
      </CardBox>
    </>
  );
};

export default Crib;
