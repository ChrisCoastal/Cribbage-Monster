import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';
import ToolTip from 'src/components/UI/ToolTip';

import useGameContext from 'src/hooks/useGameContext';
import { getPlayerOpponent } from 'src/utils/helpers';

type BoardPegHoleProps = {
  track: PlayerPos | PlayerPos[];
  isPeg: boolean;
  className?: string;
};

const BoardPegHole: FC<BoardPegHoleProps> = ({ track, isPeg, className }) => {
  const { gameState } = useGameContext();
  function pegHoleColor() {
    if (track === PlayerPos.P_ONE && isPeg)
      return 'bg-red-500 ring-red-500 animate-move-peg ring-offset-1 ring-offset-stone-800 ring-1';
    if (track === PlayerPos.P_TWO && isPeg)
      return 'bg-emerald-400 ring-emerald-400 animate-move-peg ring-offset-1 ring-offset-stone-800 ring-1';

    return 'bg-white ';
  }

  function renderPeg() {
    // const peg = 'ring ring-offset-1 ring-offset-stone-800 ring-1';
    const pegColor = pegHoleColor();
    return `${pegColor}`;
  }

  const peg = renderPeg();
  const playerPeg =
    track === PlayerPos.P_ONE
      ? `${gameState.players.player1.displayName} ${gameState.score.player1.cur} / 121`
      : `${gameState.players.player2.displayName}  ${gameState.score.player2.cur} / 121`;
  return (
    <li className={`${className} ${peg} h-1 w-1 justify-self-center rounded-full`}>
      {isPeg ? <ToolTip text={`${playerPeg}`} /> : null}
    </li>
  );
};

export default BoardPegHole;
