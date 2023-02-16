import React, { useRef, useState } from 'react';
import DashView from 'src/assets/dash-view.jpg';
import GameView from 'src/assets/game-view.jpg';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
import downArrow1 from 'src/assets/arrow-down-1.svg';
import downArrow2 from 'src/assets/arrow-down-2.svg';

const ProgressSection = () => {
  const [dashDetails, setDashDetails] = useState(false);
  const lightRef = useRef<HTMLDivElement>(null);

  const isIntersect = useIntersectionObserver(lightRef, { threshold: 0.3 });
  const animate = isIntersect
    ? 'opacity-1 translate-y-0 translate-x-0'
    : 'opacity-0 translate-y-36 -translate-x-24';

  const detailsVisible = dashDetails ? 'opacity-100' : 'opacity-0';

  return (
    <section className="flex flex-col items-center justify-center ">
      <div className=" w-[80%] grid-rows-3 [perspective:900px] md:mx-16 md:grid md:grid-cols-5 md:grid-rows-3 md:gap-8 xl:w-[64rem]">
        <div
          onMouseEnter={() => setDashDetails(true)}
          onMouseLeave={() => setDashDetails(false)}
          className="relative transition-all duration-500 [transform:rotate3d(0,_-1,_0.1,_30deg)_translate(-8%)] hover:[transform:rotate3d(0,_-1,_0.1,_20deg)_translate(-5%)] md:col-span-3 md:col-start-3 md:row-span-2 md:row-start-1">
          <img src={DashView} alt="player dashboard page" />
          <div
            className={`${detailsVisible} absolute -top-12 -left-48 flex rotate-3 gap-1 font-annie text-2xl tracking-wider text-stone-50 transition-all duration-500`}>
            earn unique avatars and badges!
            <img src={downArrow1} width="36px" className=" translate-y-2" />
          </div>
          <div
            className={`${detailsVisible} absolute left-48 -top-14 flex rotate-6 gap-1 font-annie text-xl tracking-wider text-stone-50 transition-all duration-500`}>
            track progress and rankings
            <img src={downArrow2} width="36px" className=" translate-y-3" />
          </div>
          <div
            className={`${detailsVisible} absolute left-24 -bottom-12 flex rotate-3 gap-1 font-annie text-xl tracking-wider text-stone-50 transition-all duration-500`}>
            <img src={downArrow1} width="36px" className="-translate-y-3 rotate-180" />
            join tournaments and leagues
          </div>
        </div>
        <div className="relative my-auto flex aspect-square flex-col items-center justify-center self-start rounded-full p-16 md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-1">
          <h3 className="relative z-30 mb-2 text-4xl font-bold text-stone-900 xl:mb-8">
            Light up the Shadows!
          </h3>
          <p className="text-md relative z-30 font-medium text-stone-900 xl:text-xl">
            Get insight into your play with game analysis, stat tracking, strategy guides, and more.
          </p>
          <div
            ref={lightRef}
            className={`${animate} absolute top-0 left-0 z-10 aspect-square h-full w-full max-w-[98vw] rounded-full bg-[radial-gradient(circle,_rgba(245,245,244,1)_64%,_rgba(28,25,25,0)_70%)] transition-all duration-[1200ms] sm:w-full `}></div>
        </div>
      </div>

      <div className="mx-8 grid grid-cols-[2fr,_1fr] sm:mx-16">
        <div>
          <img src={GameView} alt="player dashboard page" />
        </div>
        <div className="flex aspect-square flex-col items-center justify-center self-start rounded-full bg-stone-100 p-16">
          <h3 className="mb-8 text-4xl font-bold text-stone-900">Light up the Shadows</h3>
          <p className="text-xl font-medium text-stone-900">
            Get insight into your play with game analysis, stat tracking, strategy guides, and more
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
