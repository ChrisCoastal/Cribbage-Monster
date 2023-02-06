import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';

import useGameContext from 'src/hooks/useGameContext';
import { getPlayerOpponent } from 'src/utils/helpers';

type ScoreProps = {
  player: {
    displayName: string;
    curScore: number;
  };
  opponent: {
    displayName: string;
    curScore: number;
  };
};

const Score: FC<ScoreProps> = ({ player, opponent }) => {
  return (
    <div className="rounded-md border border-solid border-white p-2 text-stone-50">
      <div className="flex items-center gap-2 ">
        <h3 className="text-sm">{opponent.displayName}</h3>
        <p className="text-sm">
          <span>{opponent.curScore}</span>/121
        </p>
      </div>
      <div className="flex items-center gap-2 ">
        <h3 className="text-sm">{player.displayName}</h3>
        <p className="text-sm">
          <span>{player.curScore}</span>/121
        </p>
      </div>
    </div>
  );
};

export default Score;
