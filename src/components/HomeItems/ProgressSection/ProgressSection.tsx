import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';

import DashView from 'src/assets/dash-view.jpg';
import GameView from 'src/assets/game-view.jpg';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
import downArrow1 from 'src/assets/arrow-down-1.svg';
import downArrow2 from 'src/assets/arrow-down-2.svg';

import { MEDIA_SIZE } from 'src/utils/constants';

const ProgressSection = () => {
  const [dashDetails, setDashDetails] = useState(false);
  const lightRef = useRef<HTMLDivElement>(null);

  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);
  // !minMediaSm && setDashDetails(true);

  const isIntersect = useIntersectionObserver(lightRef, { threshold: 0.3 });
  const animate = isIntersect
    ? 'opacity-1 translate-y-0 translate-x-0'
    : 'opacity-0 translate-y-36 -translate-x-24';

  const detailsVisible = dashDetails ? 'opacity-100' : 'opacity-0';

  useEffect(() => {
    if (!minMediaSm) {
      setDashDetails(true);
    }
  }, []);

  return (
    <section className=" mb-48 flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 to-stone-800 py-56">
      <div className="mx-16 w-[80%] place-content-center [perspective:900px] lg:mx-0 lg:grid lg:grid-cols-5 lg:grid-rows-1 lg:gap-8 xl:w-[66rem]">
        <div className="relative my-auto mx-auto mb-28 flex aspect-square flex-col items-center justify-center rounded-full p-16 sm:max-w-[400px] lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mb-0">
          <h3 className="relative z-30 ml-4 mb-2 text-4xl font-bold text-stone-900 lg:text-3xl xl:mb-4 xl:text-4xl">
            Light up the shadows!
          </h3>
          <p className="text-md relative z-30 ml-4 font-medium text-stone-900 xl:text-xl xl:leading-tight">
            Get insight into your play with game analysis, stat tracking, strategy guides, and more.
          </p>
          <div
            ref={lightRef}
            className={`${animate} absolute top-0 left-0 z-10 aspect-square h-full w-full max-w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(245,245,244,1)_64%,_rgba(28,25,25,0)_70%)] transition-all duration-[1200ms] sm:w-full `}></div>
        </div>
        <div
          onMouseEnter={() => setDashDetails(true)}
          onMouseLeave={() => setDashDetails(false)}
          className="relative transition-all duration-500 [transform:rotate3d(0,_-1,_0.1,_20deg)_translate(-5%)] hover:[transform:rotate3d(0,_-1,_0.1,_20deg)_translate(-5%)] sm:[transform:rotate3d(0,_-1,_0.1,_30deg)_translate(-8%)] lg:col-span-3 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:mb-0">
          <img src={DashView} alt="player dashboard page" />
          <div
            className={`${detailsVisible} absolute -top-24 -left-24 flex w-48 rotate-3 gap-1 text-right font-annie text-2xl leading-tight tracking-wider text-stone-50 transition-all duration-500 lg:-top-12 lg:-left-48 lg:w-auto`}>
            earn unique avatars and badges!
            <img src={downArrow1} width="36px" className="translate-y-10 lg:translate-y-2" />
          </div>
          <div
            className={`${detailsVisible} absolute left-48 -top-14 flex rotate-6 gap-1 text-right font-annie text-xl leading-none tracking-wider text-stone-50 transition-all duration-500 md:left-80`}>
            track progress and rankings
            <img src={downArrow2} width="36px" className=" translate-y-3" />
          </div>
          <div
            className={`${detailsVisible} absolute left-24 -bottom-16 flex rotate-3 gap-1 font-annie text-xl tracking-wider text-stone-50 transition-all duration-500 sm:-bottom-12`}>
            <img src={downArrow1} width="36px" className="-translate-y-3 rotate-180" />
            join tournaments and leagues
          </div>
        </div>
        {/* <div className="relative my-auto mx-auto flex aspect-square max-w-[400px] flex-col items-center justify-center self-start rounded-full p-16 md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-1">
          <h3 className="relative z-30 mb-2 text-4xl font-bold text-stone-900 lg:text-3xl xl:mb-4 xl:text-4xl">
            Light up the shadows!
          </h3>
          <p className="relative z-30 text-lg font-medium text-stone-900 sm:text-base xl:text-lg">
            Get insight into your play with game analysis, stat tracking, strategy guides, and more.
          </p>
          <div
            ref={lightRef}
            className={`${animate}max-w-[400px] absolute top-0 left-0 z-10 aspect-square h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(245,245,244,1)_64%,_rgba(28,25,25,0)_70%)] transition-all duration-[1200ms] sm:w-full `}></div>
        </div> */}
      </div>
    </section>
  );
};

export default ProgressSection;
