import { FC } from 'react';
import { CardSize, CardBoxHeight, CardBoxWidth, CardOverlap, CardsIndex } from 'src/@types';

import { nanoid } from 'nanoid';

import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import CardBox from 'src/components/CardBox/CardBox';

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

  const placeholder = (
    <div className="col-span-3 rounded-[8%] border border-solid border-stone-50/60 text-sm font-extralight tracking-wide text-stone-50"></div>
  );

  return (
    <>
      <CardBox
        size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_ONE }}
        maxCards={0}
        overlap={CardOverlap.NONE}>
        {renderCrib.length ? renderCrib : placeholder}
      </CardBox>
    </>
  );
};

export default Crib;
