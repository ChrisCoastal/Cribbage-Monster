import React, { FC } from 'react';
import { PlayerPos, ScoreType } from 'src/@types';

import BoardPegHole from 'src/components/BoardPegHole/BoardPegHole';

type BoardSectionProps = {
  sectionIndex: number;
  score: {
    player1: ScoreType;
    player2: ScoreType;
  };
  moveDirection?: 'up' | 'down';
  numPegHoles?: number;
  rotate?: boolean;
  customStyles?: string;
};

const BoardSectionTopBend: FC<BoardSectionProps> = ({
  sectionIndex,
  score,
  rotate = false,
  numPegHoles = 5,
  customStyles
}) => {
  const track1Bend = [
    'absolute left-[10%] bottom-[8%]',
    'absolute left-[23%] bottom-[40%]',
    'absolute left-[53%] bottom-[60%]',
    'absolute left-[84%] bottom-[40%]',
    'absolute left-[98%] bottom-[8%]'
  ];
  const track2Bend = [
    'absolute left-[34%] bottom-[8%]',
    'absolute left-[40%] bottom-[25%]',
    'absolute left-[53%] bottom-[34%]',
    'absolute left-[66%] bottom-[25%]',
    'absolute left-[72%] bottom-[8%]'
  ];

  function getPosition(playerTrack: PlayerPos, index: number) {
    if (playerTrack === PlayerPos.P_ONE)
      return !rotate ? track1Bend[index - 1] : track2Bend.at(-1 * index);
    if (playerTrack === PlayerPos.P_TWO)
      return !rotate ? track2Bend[index - 1] : track1Bend.at(-1 * index);
  }

  function renderPegHoles(playerTrack: PlayerPos) {
    const pegHoles = [];
    for (let i = 1; i <= numPegHoles; i++) {
      const holeIndex = sectionIndex * 5 + i;
      const peg = score[playerTrack].cur === holeIndex || score[playerTrack].prev === holeIndex;
      const position = getPosition(playerTrack, i);
      pegHoles.push(
        <BoardPegHole key={holeIndex} track={playerTrack} isPeg={peg} customStyles={position} />
      );
    }
    return pegHoles;
  }

  return (
    <div className={`${customStyles} ${rotate && 'rotate-180'} relative`}>
      <ul>{renderPegHoles(rotate ? PlayerPos.P_ONE : PlayerPos.P_TWO)}</ul>
      <ul>{renderPegHoles(rotate ? PlayerPos.P_TWO : PlayerPos.P_ONE)}</ul>
      {/* <ul>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
      </ul>
      <ul>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
        <li className="absolute  h-1 w-1 justify-self-center rounded-full bg-white"></li>
      </ul> */}
    </div>
  );
};

export default BoardSectionTopBend;
