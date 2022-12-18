import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';

import useGameContext from 'src/hooks/useGameContext';

type ScoreProps = {
  curScore: number;
  prevScore: number;
  displayName: string;
};

const Score: FC<ScoreProps> = ({ curScore, prevScore, displayName }) => {
  const { gameState } = useGameContext();

  return (
    <div className="border border-solid border-black p-2">
      <h3>{displayName}</h3>
      <p>Score: {curScore}/121</p>
    </div>
  );
};

export default Score;
