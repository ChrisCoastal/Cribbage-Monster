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
        targets: '.animate-text',
        scale: [{ value: 1, duration: 0 }, 2, 1.4],
        easing: 'spring(1, 80, 10, 0)'
      });
    }
    if (renderScore < score.cur) {
      const timeout = setTimeout(
        () => {
          setRenderScore((prev) => prev + 1);
        },
        renderScore === score.prev ? 500 : 120
      );
      return () => clearTimeout(timeout);
    }
  }, [renderScore, score.cur, score.prev]);

  return <div className="animate-text text-2xl">{renderScore} / 121</div>;
};

export default PlayerTallyScore;
