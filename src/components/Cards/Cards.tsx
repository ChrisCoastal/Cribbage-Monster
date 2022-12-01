import { useRef } from 'react';
import { CardType } from 'src/@types';
import { getShuffledDeck } from 'src/utils/helpers';
import { CARD_FACES } from 'src/utils/constants';

const Cards = () => {
  const deck = useRef<CardType[]>(getShuffledDeck());

  const hand = deck.current.slice(0, 6);

  function cardClickHandler() {
    //
  }

  const handUI = (
    <div className="flex gap-1">
      {hand.map((card, i) => (
        <div
          key={i}
          onClick={cardClickHandler}
          className="grid grid-rows-[1fr_3fr_1fr] grid-columns-[1fr_2fr_1fr] w-28 h-48 bg-slate-300">
          <div className="flex flex-col col-start-1 text-sm">
            <span>{card.name}</span>
            <span>{card.suit.slice(0, 2)}</span>
          </div>
          <div className="flex flex-col col-start-3 row-start-3 text-sm">
            <div className="flex flex-col col-start-1 text-sm">
              <span>{card.name}</span>
              <span>{card.suit.slice(0, 2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  return <div>{handUI}</div>;
};

export default Cards;
