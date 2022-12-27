import React, { FC } from 'react';
import { render } from 'react-dom';
import { BoardSectionType } from 'src/@types';

type BoardSectionProps = {
  numPegHoles?: number;
  customStyles?: string;
};

const BoardSection: FC<BoardSectionProps> = ({ numPegHoles = 5, customStyles }) => {
  function renderPegHoles(numPegHoles: number) {
    const pegHoles = [];
    for (let i = 0; i < numPegHoles; i++) {
      pegHoles.push(
        <li key={i} className="h-1 w-1 justify-self-center rounded-full bg-white"></li>
      );
    }
    return pegHoles;
  }

  return (
    <div className={`${customStyles} flex justify-around border-t-[1px]`}>
      <ul className="grid grid-cols-1 grid-rows-5 gap-1 py-1">{renderPegHoles(numPegHoles)}</ul>
      <ul className="grid grid-cols-1 grid-rows-5 gap-1 py-1">{renderPegHoles(numPegHoles)}</ul>
    </div>
  );
};

export default BoardSection;
