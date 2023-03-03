import React from 'react';
import GameView from 'src/assets/screenshots/game-view-partial.jpg';

const ClassicSection = () => {
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
      </div>
      <div className="flex w-[60rem] justify-between gap-12 text-stone-50"></div>
    </section>
  );
};

export default ClassicSection;
