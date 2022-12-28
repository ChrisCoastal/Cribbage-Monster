import React, { FC } from 'react';
import { PlayerPos } from 'src/@types';

type BoardPegHoleProps = {
  holeIndex: number;
  track: PlayerPos | PlayerPos[];
  isPeg: boolean;
  customStyles?: string;
};

const BoardPegHole: FC<BoardPegHoleProps> = ({ holeIndex, track, isPeg, customStyles }) => {
  const renderPeg = isPeg && 'bg-red-500';
  return (
    <li
      className={`${customStyles} ${renderPeg} h-1 w-1 justify-self-center rounded-full bg-white`}></li>
  );
};

export default BoardPegHole;
