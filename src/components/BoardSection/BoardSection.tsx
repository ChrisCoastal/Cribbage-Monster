import React, { FC } from 'react';
import { BoardSectionType } from 'src/@types';

type BoardSectionProps = {
  section?: BoardSectionType;
};

const BoardSection: FC<BoardSectionProps> = ({ section = BoardSectionType.STRAIGHT }) => {
  function renderPegHoles() {}

  return (
    <div className="flex justify-around border-t-[1px]">
      <ul className="grid grid-cols-1 grid-rows-5 gap-1 py-1">
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
      </ul>
      <ul className="grid grid-cols-1 grid-rows-5 gap-1 py-1">
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
      </ul>
    </div>
  );
};

export default BoardSection;
