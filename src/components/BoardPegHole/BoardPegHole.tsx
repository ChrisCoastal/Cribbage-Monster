import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';

type BoardPegHoleProps = {
  track: PlayerPos | PlayerPos[];
  isPeg: boolean;
  customStyles?: string;
};

const BoardPegHole: FC<BoardPegHoleProps> = ({ track, isPeg, customStyles }) => {
  function renderPeg() {
    const peg = 'outline outline-2';
    const pegColor =
      track === PlayerPos.P_ONE
        ? 'bg-red-500 outline-red-500'
        : 'bg-emerald-400 outline-emerald-400';
    return `${peg} ${pegColor}`;
  }

  const peg = isPeg && renderPeg();
  return (
    <li
      className={`${customStyles} ${peg} h-1 w-1 justify-self-center rounded-full bg-white `}></li>
  );
};

export default BoardPegHole;
