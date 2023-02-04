import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';

type BoardPegHoleProps = {
  track: PlayerPos | PlayerPos[];
  isPeg: boolean;
  className?: string;
};

const BoardPegHole: FC<BoardPegHoleProps> = ({ track, isPeg, className }) => {
  function pegHoleColor() {
    if (track === PlayerPos.P_ONE && isPeg)
      return 'bg-red-500 ring-red-500 animate-move-peg ring ring-offset-1 ring-offset-stone-800 ring-1';
    if (track === PlayerPos.P_TWO && isPeg)
      return 'bg-emerald-400 ring-emerald-400 animate-move-peg ring ring-offset-1 ring-offset-stone-800 ring-1';

    return 'bg-white ';
  }

  function renderPeg() {
    // const peg = 'ring ring-offset-1 ring-offset-stone-800 ring-1';
    const pegColor = pegHoleColor();
    return `${pegColor}`;
  }

  const peg = renderPeg();
  return <li className={`${className} ${peg} h-1 w-1 justify-self-center rounded-full`}></li>;
};

export default BoardPegHole;
