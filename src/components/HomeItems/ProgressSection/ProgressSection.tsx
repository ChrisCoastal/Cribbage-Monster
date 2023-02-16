import React, { useRef } from 'react';
import DashView from 'src/assets/dash-view.jpg';
import GameView from 'src/assets/game-view.jpg';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';

const ProgressSection = () => {
  const lightRef = useRef<HTMLDivElement>(null);

  const isIntersect = useIntersectionObserver(lightRef, { threshold: 0.8 });
  const animate = isIntersect
    ? 'opacity-1 translate-y-0 translate-x-0'
    : 'opacity-0 translate-y-36 -translate-x-24';

  return (
    <section className="flex flex-col items-center justify-center ">
      <div className="mx-8 grid grid-cols-1 [perspective:900px] sm:mx-16 sm:w-[64rem] sm:grid-cols-5 sm:gap-8">
        <div className="relative col-span-2 my-auto flex aspect-square flex-col items-center justify-center self-start rounded-full p-16 sm:col-start-1">
          <h3 className="relative z-30 text-4xl font-bold text-stone-900 sm:mb-8">
            Light up the Shadows!
          </h3>
          <p className="text-md relative z-30 font-medium text-stone-900 sm:text-xl">
            Get insight into your play with game analysis, stat tracking, strategy guides, and more.
          </p>
          <div
            ref={lightRef}
            className={`${animate} absolute top-0 left-0 z-10 h-full w-full max-w-[98vw] rounded-full bg-stone-100 transition-all duration-[1200ms] sm:w-full `}>
            <div className="absolute aspect-square w-full max-w-[98vw] rounded-full bg-clip-content shadow-[inset_0_0_0.6rem_0.8rem_rgb(28_25_23)] [height:102%] [top:-1%] [left:-1%]"></div>
          </div>
        </div>
        <div className="col-span-3 col-start-1 shadow-[inset_0_0_0.4rem_0.8rem_rgb(28_25_23)] transition-all duration-500 [transform:rotate3d(0,_-2,_0.1,_30deg)] hover:[transform:rotate3d(0,_-2,_0.1,_20deg)] sm:col-start-3">
          <img src={DashView} alt="player dashboard page" />
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
