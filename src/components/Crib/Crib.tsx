import { nanoid } from 'nanoid';
import { FC, useState } from 'react';
import { CardSize, CardType, CardBoxHeight, CardBoxWidth, CardOverlap, Status } from 'src/@types';

import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import CardBox from '../CardBox/CardBox';

type CribProps = {
  cutDeck: { status: Status; card: CardType | null };
  callback: (cutDeck: Status) => void;
};

const Crib: FC<CribProps> = ({ cutDeck, callback }) => {
  const isCut = cutDeck.status === Status.COMPLETED;

  function clickDeckHandler() {
    callback(Status.COMPLETED);
  }

  const renderCrib = (
    <PlayingCard
      // key={nanoid()}
      isFaceUp={isCut}
      cardSize={CardSize.MD}
      cardIndex={0}
      card={isCut ? cutDeck.card! : ({} as CardType)}
      overlap={CardOverlap.TWO_THIRDS}
      handler={clickDeckHandler}
    />
  );

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
  // <div className="relative h-32 w-32">
  //   <span className="absolute top-[14px] h-16 w-12  rounded-sm border border-black bg-red-200"></span>
  //   <span className="absolute top-[12px] left-[2px] h-16 w-12 rounded-sm border border-black bg-red-200"></span>
  //   <span className="absolute top-[10px] left-[4px] h-16 w-12 rounded-sm border border-black bg-red-200"></span>
  //   <span className="absolute top-[8px] left-[6px] h-16 w-12 rounded-sm border border-black bg-red-200"></span>
  //   {isCut && card ? (
  //     <span>{card.id}</span>
  //   ) : (
  //     <span
  //       onClick={cutDeckHandler}
  //       className="absolute top-[6px] left-[8px] flex h-16 w-12 items-center justify-center rounded-sm border border-black bg-red-200">
  //       {canCut && <p>CUT</p>}
  //     </span>
  //   )}
  // </div>
};

export default Crib;
