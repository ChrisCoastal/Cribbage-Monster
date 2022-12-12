import { FC, useRef } from 'react';
import { CardBoxHeight, CardBoxWidth, CardType, CardSize } from 'src/@types';
import { getShuffledDeck } from 'src/utils/helpers';
import CardBox from '../CardBox/CardBox';
import PlayingCard from '../PlayingCard/PlayingCard';

type CardsProps = {
  cardHeight: string;
  isFaceUp: boolean;
};

const Cards: FC<CardsProps> = ({ cardHeight, isFaceUp }) => {
  const deck = useRef<CardType[]>(getShuffledDeck());

  const hand = deck.current.slice(0, 6);

  function cardClickHandler(card: CardType) {
    console.log(card);
  }

  // const cardPosition = [
  //   'z-[20] left-0',
  //   'z-[21] left-8',
  //   'z-[22] left-16',
  //   'z-[23] left-24',
  //   'z-[24] left-32',
  //   'z-[25] left-40'
  // ];
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

  const handUI = hand.map((card, i) => (
    <PlayingCard
      key={i}
      isFaceUp={true}
      cardSize={CardSize.LG}
      cardIndex={i}
      card={card}
      handler={cardClickHandler}
    />
  ));

  //     return isFaceUp ? (
  //       <div
  //         key={i}
  //         onClick={() => cardClickHandler(card)}
  //         className={`grid-columns-3 grid grid-rows-3 items-center rounded-[4%] border border-solid border-black ${
  //           cardPos[i]
  //         } ${cardRotation[i % 2]}`}>
  //         <div className="col-start-1 row-start-1 flex flex-col justify-self-center text-sm">
  //           <span>{card.faceValue}</span>
  //           <span>{card.suit.slice(0, 2)}</span>
  //         </div>
  //         <div className="col-start-3 row-start-3 flex flex-col justify-self-center text-sm">
  //           <div className="col-start-1 flex flex-col text-sm">
  //             <span>{card.faceValue}</span>
  //             <span>{card.suit.slice(0, 2)}</span>
  //           </div>
  //         </div>
  //       </div>
  //     ) : (
  //       <div
  //         key={i}
  //         onClick={() => cardClickHandler(card)}
  //         className={`rounded-[4%] border border-solid border-black ${cardPos[i]}`}></div>
  //     );

  return (
    // <div className="col-start-1 row-start-5 col-span-4 w-full">
    //   <div className="border border-black h-fit">{handUI}</div>
    // </div>
    <CardBox
      size={{ height: CardBoxHeight.LG, width: CardBoxWidth.LG_SIX }}
      maxCards={6}
      placement="self-center place-self-center">
      {handUI}
    </CardBox>
  );
};

export default Cards;
