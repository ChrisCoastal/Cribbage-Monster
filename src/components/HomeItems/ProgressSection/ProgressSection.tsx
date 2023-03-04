import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';

import dashView from 'src/assets/screenshots/dash-view.jpg';
import downArrow1 from 'src/assets/arrows/arrow-down-1.svg';
import downArrow2 from 'src/assets/arrows/arrow-down-2.svg';

import { MEDIA_SIZE } from 'src/utils/constants';

const ProgressSection = () => {
  const [dashDetails, setDashDetails] = useState(false);
  const lightRef = useRef<HTMLDivElement>(null);

  const minMediaSm = useMediaQuery(MEDIA_SIZE.md);
  const isIntersect = useIntersectionObserver(lightRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  });

  const animateLeftLight = isIntersect
    ? 'opacity-1 -translate-y-1'
    : 'opacity-0 translate-y-36 -translate-x-24 scale-75';
  const animateRightLight = isIntersect
    ? 'opacity-1 translate-y-3 translate-x-4 animate-flicker'
    : 'opacity-0 translate-y-36 translate-x-24 scale-75';
  const detailsVisible = dashDetails ? 'opacity-100' : 'opacity-0';

  useEffect(() => {
    if (!minMediaSm) {
      setDashDetails(true);
    }
  }, []);

  return (
    <section className="bg-gradient-to-b from-stone-900 to-stone-800 py-40 lg:py-48" ref={lightRef}>
      <div className="mx-auto flex max-w-[82rem] scale-90 flex-col items-center justify-center gap-8 [perspective:1600px] lg:flex-row xl:scale-100">
        <div className="relative flex flex-1 flex-col items-center">
          <div className="my-12 mb-20 grid grid-cols-2 grid-rows-1 items-center justify-center lg:mb-28">
            <h3 className="z-30 col-span-2 col-start-1 row-start-1 whitespace-nowrap text-center text-6xl font-bold text-stone-900">
              Light up the <br /> shadows.
            </h3>
            <div className="relative col-start-1 row-start-1 h-36 w-36">
              <div
                style={{
                  height: '0',
                  width: '100%',
                  paddingBottom: '100%',
                  scale: '1.8'
                }}
                className={`${animateLeftLight} absolute top-0 left-0 z-10 aspect-square h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(245,245,244,0.9)_64%,_rgba(245,245,244,0.01)_70%)] transition-all duration-[1200ms] sm:w-full `}></div>
            </div>
            <div className="relative col-start-2 row-start-1 h-36 w-36">
              <div
                style={{ height: '0', width: '100%', paddingBottom: '100%', scale: '1.8' }}
                className={`${animateRightLight} absolute top-0 left-0 z-10 aspect-square h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(245,245,244,0.9)_64%,_rgba(245,245,244,0.01)_70%)] transition-all duration-[1200ms] sm:w-full `}></div>
            </div>
          </div>
          <div className="mx-8 mb-28 mt-8 flex max-w-[29rem] flex-col flex-wrap items-stretch justify-center gap-4 sm:flex-row lg:m-0">
            <div className="flex flex-1 flex-col justify-around gap-3 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50 sm:max-w-[14rem]">
              <p className="self-center text-4xl">🏆</p>
              <h4 className="text-xl font-bold text-emerald-300">Achievements</h4>
              <p className="text-sm">Unlock badges and in game collectables.</p>
            </div>
            <div className="flex flex-1 flex-col justify-around gap-3 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50 sm:max-w-[14rem]">
              <p className="self-center text-4xl">📉</p>
              <h4 className="text-xl font-bold text-emerald-300">Stat Tracking</h4>
              <p className="text-sm">Analyze your climb towards the top.</p>
            </div>
            <div className="flex flex-1 flex-col justify-around gap-3 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50 sm:max-w-[14rem]">
              <p className="self-center text-4xl">💰</p>
              <h4 className="text-xl font-bold text-emerald-300">Prizes</h4>
              <p className="text-sm">League competition with big prizes.</p>
            </div>
            <div className="flex flex-1 flex-col justify-around gap-3 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50 sm:max-w-[14rem]">
              <p className="self-center text-4xl">🎉</p>
              <h4 className="text-xl font-bold text-emerald-300">Monster Fun</h4>
              <p className="text-sm">Play online with other monsters anytime.</p>
            </div>
          </div>
        </div>
        <div
          onMouseEnter={() => setDashDetails(true)}
          onMouseLeave={() => setDashDetails(false)}
          className="relative mt-8 max-w-[44rem] flex-1 transition-all duration-500 md:[transform:rotate3d(0,_-1,_0.1,_30deg)_translate(-12%)] md:hover:[transform:rotate3d(0,_-1,_0.1,_20deg)_translate(-10%)]">
          <div className="relative">
            <img
              src={dashView}
              alt="player dashboard page"
              className="md:translate-x-8 lg:translate-x-0"
            />
            <div
              className={`${detailsVisible} absolute -top-16 left-4 flex -rotate-12 justify-end gap-1 text-right font-annie text-xl leading-none tracking-wider text-stone-50 transition-all duration-500 sm:text-2xl lg:-top-20`}>
              <img src={downArrow1} width="48px" className="scale-x-[-1] lg:-translate-y-1" />
              earn unique avatars <br />
              and badges
            </div>
            <div
              className={`${detailsVisible} absolute right-2 -top-14 flex rotate-6 gap-1 text-right font-annie text-xl leading-none tracking-wider text-stone-50 transition-all duration-500 sm:right-6`}>
              track progress <br /> and rankings
              <img src={downArrow2} width="36px" className=" translate-y-3" />
            </div>
            <div
              className={`${detailsVisible} absolute left-24 -bottom-16 flex rotate-3 gap-1 font-annie text-xl tracking-wider text-stone-50 transition-all duration-500 sm:text-2xl`}>
              <img src={downArrow1} width="36px" className="-translate-y-3 rotate-180" />
              join tournaments and leagues
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
