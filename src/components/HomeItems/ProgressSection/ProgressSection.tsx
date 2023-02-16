import React, { useRef } from 'react';
import DashView from 'src/assets/dash-view.png';
import GameView from 'src/assets/game-view.png';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';

const ProgressSection = () => {
  const lightRef = useRef<HTMLDivElement>(null);

  const isIntersect = useIntersectionObserver(lightRef, { threshold: 0.8 });
  const animate = isIntersect
    ? 'opacity-1 translate-y-0 translate-x-0'
    : 'opacity-0 translate-y-36 -translate-x-24';

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="mx-8 grid w-[64rem] grid-cols-[2fr,_3fr] gap-8 sm:mx-16">
        <div className="relative flex aspect-square flex-col items-center justify-center self-start rounded-full p-16">
          <h3 className="relative z-30 mb-8 text-4xl font-bold text-stone-900">
            Light up the Shadows
          </h3>
          <p className="relative z-30 text-xl font-medium text-stone-900">
            Get insight into your play with game analysis, stat tracking, strategy guides, and more
          </p>
          <div
            ref={lightRef}
            className={`${animate} absolute top-0 left-0 z-10 h-full w-full rounded-full bg-stone-100 transition-all duration-[1400ms] `}>
            <div className="absolute aspect-square rounded-full bg-clip-content shadow-[inset_0_0_0.6rem_0.8rem_rgb(28_25_23)] [height:102%] [top:-1%] [left:-1%]"></div>
          </div>
        </div>
        <div>
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
