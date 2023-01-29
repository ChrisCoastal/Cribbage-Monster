import React from 'react';
import { CardBoxHeight, CardBoxWidth, CardOverlap, CardType, CardSize, Suit } from 'src/@types';

import { dealHands, getCardValues } from 'src/utils/helpers';
import Card from 'src/components/UI/Card';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import SuitIcon from 'src/components/UI/icons/SuitIcon/SuitIcon';
import HeroText from 'src/components/HeroText/HeroText';
import Button from 'src/components/UI/Button';
import Board from 'src/components/Board/Board';
import BoardSection from 'src/components/BoardSection/BoardSection';
import cardImg from 'src/assets/card.png';
import githubLogo from 'src/assets/logo/github-mark-white.png';
import Dot from 'src/components/UI/icons/Dot/Dot';

import useAuthContext from 'src/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import ZSection from 'src/components/HomeItems/ZSection/ZSection';
import Carousel from 'src/components/UI/Carousel';
import DashCarousel from 'src/components/DashboardItems/DashCarousel/DashCarousel';

const HomePage = () => {
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();

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

  // function cardClickHandler(card: CardType) {
  //   console.log(card);
  // }

  // function renderCards(
  //   cards: CardType[] = [],
  //   faceUp: boolean,
  //   cardSize: CardSize,
  //   overlap: CardOverlap,
  //   playerHand = false
  // ) {
  //   return cards.map((card, i) => (
  //     <div
  //       key={i}
  //       onClick={() => console.log('clicked')}
  //       className={`rounded-lg border border-solid border-stone-100 bg-white transition-all duration-300`}>
  //       <div
  //         className={`grid-columns-3 shadow-[-4px_4px_8px_rgba(0,0,0,0.05) grid max-h-full max-w-full grid-rows-3 items-center border border-solid border-stone-500 bg-white`}>
  //         <div className="col-start-1 mt-2 flex-col gap-1 justify-self-center text-sm">
  //           <>
  //             <span className="pointer-events-none text-4xl font-bold text-stone-900">
  //               {card.name}
  //             </span>
  //             <span className="pointer-events-none">
  //               <SuitIcon suit={card.suit} height="60" width="60" />
  //             </span>
  //           </>
  //         </div>
  //         <div className="col-start-3 row-start-3 flex flex-col justify-self-center text-sm">
  //           <div className="col-start-1 mb-2 rotate-180 flex-col gap-1 justify-self-center text-sm">
  //             <>
  //               <span className="pointer-events-none text-4xl font-bold text-stone-900">
  //                 {card.name}
  //               </span>
  //               <span className="pointer-events-none">
  //                 <SuitIcon suit={card.suit} height="60" width="60" />
  //               </span>
  //             </>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   ));
  // }

  // const renderedCards = renderCards(cards, true, CardSize.LG, CardOverlap.NONE, true);

  const questionMark = <span className="text-9xl font-bold tracking-wide text-stone-200">?</span>;

  const playHandler = () => {
    if (userAuth?.uid) navigate(`/dashboard/${userAuth?.uid}`);
    if (!userAuth?.uid) navigate(`/login`);
  };

  return (
    <div className="bg-stone-900">
      <div className="relative mb-16 flex h-screen max-h-[56rem] w-full flex-col justify-center overflow-hidden bg-cardbacks object-scale-down lg:mb-24">
        <div className="pointer-events-none absolute h-full w-full bg-gradient-to-br from-stone-900/20 to-stone-900/70"></div>
        {/* <img src={cardImg} alt="card" className=" animate-fade-up-delay-sm" /> */}
        <section className="relative z-10 mx-[10%] flex flex-col gap-20 sm:mx-24 sm:gap-28 lg:mx-20 lg:flex-row lg:justify-center">
          <div className="h-[120px] w-[324px] lg:h-[200px] lg:w-[540px]">
            <HeroText
              height="200"
              width="540"
              color="rgb(231 229 228)"
              className={`-translate-x-20 scale-[.6] sm:-translate-x-9 sm:scale-90 lg:scale-100`}
              aria-role="h1"
              aria-label="Are you a Monster?"
            />
          </div>
          <Button
            className="self-start justify-self-center lg:self-end"
            buttonSize="md"
            buttonColor="secondary"
            handler={playHandler}>
            PLAY NOW
          </Button>
        </section>
      </div>
      <ZSection />
      <section className="min-h-24 flex items-center justify-between bg-black/20 px-4 py-8 text-xs text-stone-50 sm:px-8 sm:text-sm">
        <div className=" w-40 sm:w-auto">
          <p className="mb-1">Inspired by generations of ♥︎♥︎♥︎ for cribbage.</p>
        </div>
        <a
          className="flex items-center gap-2"
          href="https://github.com/ChrisCoastal"
          target="_blank"
          rel="noreferrer">
          <img src={githubLogo} alt="GitHub logo" className="h-6 w-6" />
          <p>ChrisCoastal</p>
        </a>
      </section>
    </div>
  );
};

export default HomePage;
