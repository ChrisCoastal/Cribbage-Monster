import anime from 'animejs';
import React, { FC, useEffect, useState } from 'react';
import useGameContext from 'src/hooks/useGameContext';

type PlayerTallyScoreProps = {
  initialScore: number;
  addScore: number;
};

const PlayerTallyScore: FC<PlayerTallyScoreProps> = ({ initialScore, addScore }) => {
  const [score, setScore] = useState<number>(initialScore);
  const { gameState } = useGameContext();

  useEffect(() => {
    if (score > initialScore + addScore) return;
    if (score === initialScore + addScore) {
      anime({
        targets: '.animate-text-grow',
        scale: [{ value: 1, duration: 0 }, 2, 1.4],
        // loop: 1,
        // duration: 2000,
        easing: 'spring(1, 80, 10, 0)'
      });
    }
    const timeout = setTimeout(() => {
      setScore(score + 1);
    }, 120);
    return () => clearTimeout(timeout);
  }, [score]);

  return <div className="animate-text-grow text-2xl">{score} / 121</div>;
};

export default PlayerTallyScore;
