import React, { FC } from 'react';
import { BoardSectionType } from 'src/@types';

type BoardSectionProps = {
  rotate?: boolean;
};

const BoardSectionTopBend: FC<BoardSectionProps> = ({ rotate }) => {
  function renderPegHoles() {}

  return (
    <div className={`${rotate && 'rotate-180'} relative`}>
      <ul>
        <li className="absolute left-[10%] bottom-[8%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute left-[23%] bottom-[40%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute left-[53%] bottom-[60%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute left-[84%] bottom-[40%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute left-[98%] bottom-[8%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
      </ul>
      <ul>
        <li className="absolute left-[34%] bottom-[8%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute left-[40%] bottom-[25%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute left-[53%] bottom-[34%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute left-[66%] bottom-[25%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute left-[72%] bottom-[8%] h-1 w-1 justify-self-center rounded-full bg-white"></li>
      </ul>
    </div>
  );
};

export default BoardSectionTopBend;
