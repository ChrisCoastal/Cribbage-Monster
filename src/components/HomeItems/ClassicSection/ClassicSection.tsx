import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';

import DashView from 'src/assets/dash-view.jpg';
import GameView from 'src/assets/game-view-partial.jpg';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
import downArrow1 from 'src/assets/arrow-down-1.svg';
import downArrow2 from 'src/assets/arrow-down-2.svg';
import mobileApp from 'src/assets/mobile-app.png';

import { MEDIA_SIZE } from 'src/utils/constants';

const ClassicSection = () => {
  const [dashDetails, setDashDetails] = useState(false);
  const lightRef = useRef<HTMLDivElement>(null);

  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);
  // !minMediaSm && setDashDetails(true);

  const isIntersect = useIntersectionObserver(lightRef);
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
    <section className="mb-36 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h3 className="text-5xl font-bold text-stone-50 sm:text-6xl">Classic game.</h3>
        <h3 className="mb-4 text-center text-5xl font-bold text-stone-50 sm:text-6xl">
          Scary good fun.
        </h3>
      </div>
      <div className="mx-4 mb-12 overflow-hidden rounded-xl">
        <img src={GameView} alt="Game View" />
        {/* <img src={mobileApp} alt="Game View" /> */}
      </div>
      <div className="flex w-[60rem] justify-between gap-12 text-stone-50">
        {/* <div className="flex-1 rounded-lg bg-stone-800 p-8">
          Free to play online with friends or monsters unknown. Make fifteens, runs, and sets to
          strike fear into your opponents.
        </div>
        <div className="flex-1 rounded-lg bg-stone-800 p-8">Not</div> */}
      </div>
    </section>
  );
};

export default ClassicSection;
