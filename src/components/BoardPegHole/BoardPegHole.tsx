import React, { FC } from 'react';

type BoardPegHoleProps = {
  customStyles?: string;
};

const BoardPegHole: FC<BoardPegHoleProps> = (customStyles) => {
  return <li className={`${customStyles} h-1 w-1 justify-self-center rounded-full bg-white`}></li>;
};

export default BoardPegHole;
