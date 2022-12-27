import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';

import useGameContext from 'src/hooks/useGameContext';

type ScoreProps = {
  curScore: number;
  displayName: string;
};

const Score: FC<ScoreProps> = ({ curScore, displayName }) => {
  const { gameState } = useGameContext();

  function getScore() {
    return curScore;
  }

  return (
    <div className="flex w-full flex-col items-center rounded-md border border-solid border-black p-2">
      <h3>{displayName}</h3>
      <p>
        <span className="animate-text-grow">{curScore}</span>/121
      </p>
    </div>
  );
};

export default Score;
