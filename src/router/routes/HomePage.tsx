import React from 'react';
import { CardBoxHeight, CardBoxWidth, CardOverlap, CardType, CardSize, Suit } from 'src/@types';

import { dealHands, getCardValues } from 'src/utils/helpers';
import Card from 'src/components/UI/Card';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import SuitIcon from 'src/components/UI/icons/SuitIcon/SuitIcon';
import Tail from 'src/components/UI/icons/Tail/Tail';
import Button from 'src/components/UI/Button';
import Board from 'src/components/Board/Board';
import BoardSection from 'src/components/BoardSection/BoardSection';
import hero2 from 'src/assets/hero-2.jpg';
import cardImg from 'src/assets/card.png';

const HomePage = () => {
  const cards: CardType[] = [
    // write an object literal for 6 cards using a CardType
    {
      id: 1,
      suit: Suit.Hearts,
      name: '5',
      playValue: 5,
      faceValue: 5
    },
    {
      id: 1,
      suit: Suit.Clubs,
      name: '5',
      playValue: 5,
      faceValue: 5
    },
    {
      id: 1,
      suit: Suit.Diamonds,
      name: '5',
      playValue: 5,
      faceValue: 5
    },
    {
      id: 1,
      suit: Suit.Spades,
      name: 'J',
      playValue: 10,
      faceValue: 11
    }
  ];

  function cardClickHandler(card: CardType) {
    console.log(card);
  }

  function renderCards(
    cards: CardType[] = [],
    faceUp: boolean,
    cardSize: CardSize,
    overlap: CardOverlap,
    playerHand = false
  ) {
    return cards.map((card, i) => (
      <div
        key={i}
        onClick={() => console.log('clicked')}
        className={`rounded-lg border border-solid border-stone-100 bg-white transition-all duration-300`}>
        <div
          className={`grid-columns-3 shadow-[-4px_4px_8px_rgba(0,0,0,0.05) grid max-h-full max-w-full grid-rows-3 items-center border border-solid border-stone-500 bg-white`}>
          <div className="col-start-1 mt-2 flex-col gap-1 justify-self-center text-sm">
            <>
              <span className="pointer-events-none text-4xl font-bold text-stone-900">
                {card.name}
              </span>
              <span className="pointer-events-none">
                <SuitIcon suit={card.suit} height="60" width="60" />
              </span>
            </>
          </div>
          <div className="col-start-3 row-start-3 flex flex-col justify-self-center text-sm">
            <div className="col-start-1 mb-2 rotate-180 flex-col gap-1 justify-self-center text-sm">
              <>
                <span className="pointer-events-none text-4xl font-bold text-stone-900">
                  {card.name}
                </span>
                <span className="pointer-events-none">
                  <SuitIcon suit={card.suit} height="60" width="60" />
                </span>
              </>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  const renderedCards = renderCards(cards, true, CardSize.LG, CardOverlap.NONE, true);

  const questionMark = <span className="text-9xl font-bold tracking-wide text-stone-200">?</span>;

  return (
    <div>
      <div className="flex h-screen w-full flex-col justify-center overflow-hidden bg-cardbacks object-scale-down">
        {/* <img src={cardImg} alt="card" className=" animate-fade-up-delay-sm" /> */}
        <section className="mx-20 flex justify-around">
          <div>
            <h2 className="relative whitespace-pre-line text-9xl font-bold tracking-wide text-stone-200">
              {`Are you a
              Monster?
              `}
              <span className="absolute right-0">
                <Tail height="400" width="400" color="rgb(231 229 228)"></Tail>
              </span>
            </h2>
          </div>

          <Button className="self-end justify-self-center">Play now!</Button>
        </section>
      </div>
      <div>
        <div>collect badges</div>
        <div>climb the leaderboard</div>
        <div>watch out!</div>
      </div>
    </div>
  );
};

export default HomePage;
