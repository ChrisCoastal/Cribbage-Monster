import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';

import DashView from 'src/assets/dash-view.jpg';
import GameView from 'src/assets/game-view.jpg';

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
    <section className="mb-36 flex flex-col items-center justify-center">
      <h3 className="mb-4 text-3xl font-bold text-stone-50 sm:text-5xl lg:text-5xl">
        Classic game.
      </h3>
      <h3 className="mb-4 text-3xl font-bold text-stone-50 sm:text-5xl lg:text-5xl">
        Scary good competition.
      </h3>
      <p className="text-stone-50">Don&apos;t hide under the bed.</p>
      <div className="mx-4 overflow-hidden rounded-xl">
        <img src={GameView} alt="Game View" />
        {/* <img src={mobileApp} alt="Game View" /> */}
      </div>
    </section>
  );
};

export default ClassicSection;
