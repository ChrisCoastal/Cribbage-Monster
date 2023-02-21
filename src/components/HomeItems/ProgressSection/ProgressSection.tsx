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
    <section className="bg-gradient-to-b from-stone-900 to-stone-800 pb-48 pt-48">
      {/* <div className="mx-8 place-content-center [perspective:900px] lg:mx-0 lg:grid lg:grid-cols-5 lg:grid-rows-1 lg:gap-12 xl:w-[66rem]"> */}
      <div className="mx-auto flex max-w-7xl flex-col justify-center [perspective:900px] lg:flex-row lg:gap-12">
        <div className="relative mb-48 flex flex-col items-center">
          <div className="my-12 mb-20 grid grid-cols-2 grid-rows-1 items-center justify-center">
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
          <div className="flex">
            <p className="relative z-30 flex-1 self-start text-xl font-medium text-stone-50/90 xl:text-xl xl:leading-tight">
              Get insight into your card play with game analysis, stat tracking, strategy guides,
              and more.
            </p>
            <PlayButton />
          </div>
          {/* <div className="relative my-auto mx-auto mb-28 flex items-center justify-center rounded-full sm:max-w-[400px] lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mb-0"> */}
        </div>
        <div
          onMouseEnter={() => setDashDetails(true)}
          onMouseLeave={() => setDashDetails(false)}
          className="relative mx-8 transition-all duration-500 [transform:rotate3d(0,_-1,_0.1,_20deg)_translate(-4%)] hover:[transform:rotate3d(0,_-1,_0.1,_20deg)_translate(-4%)] sm:[transform:rotate3d(0,_-1,_0.1,_30deg)_translate(-12%)] sm:hover:[transform:rotate3d(0,_-1,_0.1,_20deg)_translate(-8%)] md:mx-36 lg:mx-8">
          <span className="relative">
            <img src={DashView} alt="player dashboard page" className="" />
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
