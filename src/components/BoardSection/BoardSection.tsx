import React, { FC } from 'react';
import { PlayerPos, ScoreType } from 'src/@types';
import BoardPegHole from 'src/components/BoardPegHole/BoardPegHole';

type BoardSectionProps = {
  sectionIndex: number;
  score: {
    player1: ScoreType;
    player2: ScoreType;
  };
  rotate?: boolean;
  numPegHoles?: number;
  customStyles?: string;
};

const BoardSection: FC<BoardSectionProps> = ({
  sectionIndex,
  score,
  rotate = false,
  numPegHoles = 5,
  customStyles
}) => {
  function renderPegHoles(playerTrack: PlayerPos) {
    const pegHoles = [];
    for (let i = 1; i <= numPegHoles; i++) {
      const holeIndex = sectionIndex * numPegHoles + i;
      const peg = score[playerTrack].cur === holeIndex || score[playerTrack].prev === holeIndex;

      pegHoles.unshift(<BoardPegHole key={holeIndex} track={playerTrack} isPeg={peg} />);
    }
    return pegHoles;
  }

  return (
    <div className={`${customStyles} ${rotate && 'rotate-180'} flex justify-around border-t-[1px]`}>
      <ul className="grid grid-cols-1 grid-rows-5 gap-1 py-1">{renderPegHoles(PlayerPos.P_ONE)}</ul>
      <ul className="grid grid-cols-1 grid-rows-5 gap-1 py-1">{renderPegHoles(PlayerPos.P_TWO)}</ul>
    </div>
  );
};

export default BoardSection;
