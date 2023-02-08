import { FC } from 'react';
import { CardSize, CardType, CardBoxHeight, CardBoxWidth, CardOverlap, Status } from 'src/@types';

import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import CardBox from 'src/components/CardBox/CardBox';
import Button from '../UI/Button';

type DeckProps = {
  cutDeck: { status: Status; card: CardType | null };
  isPone: boolean;
  callback: (cutDeck: Status) => void;
};

const Deck: FC<DeckProps> = ({ cutDeck, isPone, callback }) => {
  const isCut = cutDeck.status === Status.COMPLETED;

  function clickDeckHandler() {
    callback(Status.COMPLETED);
  }

  const renderDeck = (
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
    <div className="relative">
      {cutDeck.status === Status.VALID && isPone && (
        <Button
          className="absolute top-1/4 left-1/2 z-30 flex h-10 w-10 -translate-x-1/2 animate-radiate items-center justify-center text-sm font-bold text-stone-50"
          buttonSize="circle"
          buttonColor="secondary"
          handler={clickDeckHandler}>
          CUT
        </Button>
      )}
      <CardBox
        size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_ONE }}
        maxCards={0}
        overlap={CardOverlap.NONE}>
        {renderDeck}
      </CardBox>
    </div>
  );
};

export default Deck;
