import React from 'react';
import GameView from 'src/assets/game-view.jpg';

const LearnSection = () => {
  return (
    <section>
      {' '}
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

export default LearnSection;
