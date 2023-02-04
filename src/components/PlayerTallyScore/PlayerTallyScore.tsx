import anime from 'animejs';
import React, { FC, useEffect, useState } from 'react';
import { ScoreType } from 'src/@types';

type PlayerTallyScoreProps = {
  score: ScoreType;
};

const PlayerTallyScore: FC<PlayerTallyScoreProps> = ({ score }) => {
  const [renderScore, setRenderScore] = useState<number>(score.prev);

  useEffect(() => {
    if (renderScore > score.cur) return;
    if (renderScore === score.cur) {
      anime({
        targets: '.animate-text-grow',
        scale: [{ value: 1, duration: 0 }, 2, 1.4],
        // loop: 1,
        // duration: 2000,
        easing: 'spring(1, 80, 10, 0)'
      });
    }
    const timeout = setTimeout(() => {
      setRenderScore((prev) => prev + 1);
    }, 120);
    return () => clearTimeout(timeout);
  }, [renderScore, score.cur]);

  return <div className="animate-text-grow text-2xl">{renderScore} / 121</div>;
};

export default PlayerTallyScore;
