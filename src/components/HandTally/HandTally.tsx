import React, { FC } from 'react';
import { TallyPoints } from 'src/@types';

type HandTallyProps = {
  playerScore: TallyPoints;
  opponnentScore: TallyPoints;
  cribScore: TallyPoints;
};

const HandTally: FC<HandTallyProps> = ({ playerScore, opponnentScore, cribScore }) => {
  return <div>HandTally</div>;
};

export default HandTally;
