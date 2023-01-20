import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';

type BoardPegHoleProps = {
  track: PlayerPos | PlayerPos[];
  isPeg: boolean;
  className?: string;
};

const BoardPegHole: FC<BoardPegHoleProps> = ({ track, isPeg, className }) => {
  function renderPeg() {
    const peg = 'ring ring-offset-1 ring-offset-stone-800 ring-1';
    const pegColor =
      track === PlayerPos.P_ONE
        ? 'bg-red-500 ring-red-500  animate-move-peg'
        : 'bg-emerald-400 ring-emerald-400 animate-move-peg';
    return `${peg} ${pegColor}`;
  }

  const peg = isPeg && renderPeg();
  return (
    <li className={`${className} ${peg} h-1 w-1 justify-self-center rounded-full bg-white`}></li>
  );
};

export default BoardPegHole;
