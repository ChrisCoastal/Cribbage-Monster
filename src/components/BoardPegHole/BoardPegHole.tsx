import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';
import ToolTip from 'src/components/UI/ToolTip';

import useGameContext from 'src/hooks/useGameContext';
import { getPlayerOpponent } from 'src/utils/helpers';

type BoardPegHoleProps = {
  track: PlayerPos | '121';
  isPeg: boolean;
  className?: string;
};

const BoardPegHole: FC<BoardPegHoleProps> = ({ track, isPeg, className }) => {
  const { gameState } = useGameContext();

  function renderPeg() {
    const pegBase = 'animate-move-peg ring-offset-1 ring-offset-stone-800 ring-1';
    const player1Color = 'bg-purple-500 ring-purple-500';
    const player2Color = 'bg-emerald-500 ring-emerald-500';
    // const player2Color = gameState.players.player2.color;
    if (track === PlayerPos.P_ONE && isPeg) return `${player1Color} ${pegBase}`;
    if (track === PlayerPos.P_TWO && isPeg) return `${player2Color} ${pegBase}`;
    if (track === '121' && isPeg) return `${player2Color} ${pegBase}`;
    return 'bg-white ';
  }

  const peg = renderPeg();
  const tooltip =
    track === PlayerPos.P_ONE
      ? `${gameState.players.player1.displayName} ${gameState.score.player1.cur} / 121`
      : `${gameState.players.player2.displayName}  ${gameState.score.player2.cur} / 121`;

  return (
    <li className={`${className} ${peg} h-1 w-1 justify-self-center rounded-full`}>
      {isPeg ? <ToolTip text={`${tooltip}`} /> : null}
    </li>
  );
};

export default BoardPegHole;
