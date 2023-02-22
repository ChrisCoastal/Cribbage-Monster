import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';

import DashView from 'src/assets/dash-view.jpg';
import GameView from 'src/assets/game-view.jpg';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
import downArrow1 from 'src/assets/arrow-down-1.svg';
import downArrow2 from 'src/assets/arrow-down-2.svg';

import { MEDIA_SIZE } from 'src/utils/constants';
import PlayButton from 'src/components/UI/PlayButton';

const ProgressSection = () => {
  const [dashDetails, setDashDetails] = useState(false);
  const lightRef = useRef<HTMLDivElement>(null);
  const lightRefLeft = useRef<HTMLDivElement>(null);
  const lightRefRight = useRef<HTMLDivElement>(null);

  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);
  // !minMediaSm && setDashDetails(true);

  const isIntersect = useIntersectionObserver(lightRefLeft, { threshold: 0.3 });
  const animateLeft = isIntersect
    ? 'opacity-1 -translate-y-1 scale-[160%] md:scale-[180%]'
    : 'opacity-0 translate-y-36 -translate-x-24 scale-75';
  const animateRight = isIntersect
    ? 'opacity-1 translate-y-4 scale-[160%] md:scale-[180%] md:translate-x-6 animate-flicker'
    : 'opacity-0 translate-y-36 translate-x-24 scale-75';

  const detailsVisible = dashDetails ? 'opacity-100' : 'opacity-0';

  useEffect(() => {
    if (!minMediaSm) {
      setDashDetails(true);
    }
  }, []);

  return (
    <section className="bg-gradient-to-b from-stone-900 to-stone-800 py-40 lg:py-48">
      {/* <div className="mx-8 place-content-center [perspective:900px] lg:mx-0 lg:grid lg:grid-cols-5 lg:grid-rows-1 lg:gap-12 xl:w-[66rem]"> */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center [perspective:1600px] lg:flex-row">
        <div className="relative flex w-full flex-col items-center">
          <div className="my-12 mb-20 grid grid-cols-2 grid-rows-1 items-center justify-center lg:mb-28">
            <h3 className="z-30 col-span-2 col-start-1 row-start-1 text-center text-5xl font-bold text-stone-900 md:text-6xl">
              Light up the <br /> shadows.
            </h3>
            <div className="relative col-start-1 row-start-1 h-36 w-36">
              <div
                ref={lightRefLeft}
                className={`${animateLeft} absolute top-0 left-0 z-10 aspect-square h-full w-full max-w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(245,245,244,0.9)_64%,_rgba(28,25,25,0)_70%)] transition-all duration-[1200ms] sm:w-full `}></div>
            </div>
            <div className="relative col-start-2 row-start-1 h-36 w-36">
              <div
                ref={lightRefRight}
                className={`${animateRight} absolute top-0 left-0 z-10 aspect-square h-full w-full max-w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(245,245,244,0.9)_64%,_rgba(28,25,25,0)_70%)] transition-all duration-[1200ms] sm:w-full `}></div>
            </div>
          </div>
          <div className="mx-8 mb-28 mt-8 flex max-w-[29rem] flex-wrap items-stretch justify-center gap-4 lg:m-0">
            <div className="flex flex-col justify-around gap-4 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50 sm:max-w-[14rem]">
              <p className="self-center text-lg">🏆</p>
              <h4 className="text-xl font-bold text-emerald-300">Achievements</h4>
              <p className="text-sm">Unlock badges and other in game collectables as you play.</p>
            </div>
            <div className="flex flex-col justify-around gap-4 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50 sm:max-w-[14rem]">
              <p className="self-center text-lg">📉</p>
              <h4 className="text-xl font-bold text-emerald-300">Stat Tracking</h4>
              <p className="text-sm">Analyze your climb towards the top of the leaderboard.</p>
            </div>
            <div className="flex flex-col justify-around gap-4 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50 sm:max-w-[14rem]">
              <p className="self-center text-lg">💰</p>
              <h4 className="text-xl font-bold text-emerald-300">Prizes</h4>
              <p className="text-sm">Leap into serious league competition for monster prizes.</p>
            </div>
            <div className="flex flex-col justify-around gap-4 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50 sm:max-w-[14rem]">
              <p className="self-center text-lg">🎉</p>
              <h4 className="text-xl font-bold text-emerald-300">Monster Fun</h4>
              <p className="text-sm">Meet and play online with other cribbage fanatics anytime.</p>
            </div>
          </div>
        </div>
        <div
          onMouseEnter={() => setDashDetails(true)}
          onMouseLeave={() => setDashDetails(false)}
          className="relative mt-8 max-w-[44rem] transition-all duration-500 md:[transform:rotate3d(0,_-1,_0.1,_30deg)_translate(-12%)] md:hover:[transform:rotate3d(0,_-1,_0.1,_20deg)_translate(-10%)] lg:mx-0">
          <span className="relative">
            <img
              src={DashView}
              alt="player dashboard page"
              className="md:translate-x-8 lg:translate-x-0"
            />
            <div
              className={`${detailsVisible} absolute -top-16 left-4 flex -rotate-12 justify-end gap-1 text-right font-annie text-xl leading-none tracking-wider text-stone-50 transition-all duration-500 lg:-top-20 lg:text-2xl`}>
              <img src={downArrow1} width="48px" className="scale-x-[-1] lg:-translate-y-1" />
              earn unique avatars <br />
              and badges
            </div>
            <div
              className={`${detailsVisible} absolute right-6 -top-14 flex rotate-6 gap-1 text-right font-annie text-xl leading-none tracking-wider text-stone-50 transition-all duration-500`}>
              track progress <br /> and rankings
              <img src={downArrow2} width="36px" className=" translate-y-3" />
            </div>
            <div
              className={`${detailsVisible} absolute left-24 -bottom-16 flex rotate-3 gap-1 font-annie text-xl tracking-wider text-stone-50 transition-all duration-500`}>
              <img src={downArrow1} width="36px" className="-translate-y-3 rotate-180" />
              join tournaments and leagues
            </div>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
