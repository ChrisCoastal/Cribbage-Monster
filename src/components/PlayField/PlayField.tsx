import { CardBoxSize, CardName, CardSize, Suit } from 'src/@types';

import Avatar from 'src/components/Avatar/Avatar';
import Board from 'src/components/Board/Board';
import Cards from 'src/components/Cards/Cards';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import Deck from 'src/components/Deck/Deck';
import CardBox from '../CardBox/CardBox';

const PlayField = () => {
  return (
    <div className="relative grid items-center justify-items-center grid-cols-[1fr,_1fr,_2fr,_2fr] grid-rows-[auto,_1fr,_1fr,_1fr,_2fr] gap-2 py-12 px-4 h-screen">
      <Avatar />
      <Deck />
      <Board />
      <CardBox
        size={CardBoxSize.SM}
        numCards={0}
        placement="col-start-2 row-start-2 col-span-2"></CardBox>
      <CardBox size={CardBoxSize.SM} numCards={0} placement="col-start-2 row-start-4 col-span-2">
        <PlayingCard
          cardSize={CardSize.SM}
          isFaceUp={true}
          card={{ id: 0, suit: Suit.Spades, name: CardName.Ace, faceValue: 1 }}></PlayingCard>
      </CardBox>
      <Cards cardHeight=" h-40" isFaceUp={true} />
      <div className="absolute left-0 w-2/3 h-full rounded-t-full bg-teal-700 translate-x-1/4 -z-40"></div>
    </div>
  );
};

export default PlayField;
