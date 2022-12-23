import React, { FC } from 'react';
import { PlayerPos, Tally, TallyPoints } from 'src/@types';

type HandTallyProps = {
  dealer: PlayerPos;
  player: Tally;
  opponent: Tally;
  crib: TallyPoints;
};

const HandTally: FC<HandTallyProps> = ({ dealer, player, opponent, crib }) => {
  function renderScore(playerTally: Tally) {
    return (
      <>
        <div className="rounded-lg bg-red-500">
          <h3>{playerTally.displayName}</h3>
        </div>
        <div>
          <ul>
            <li>fifteens for {playerTally.score.fifteens}</li>
            <li>runs for {playerTally.score.runs}</li>
            <li>pairs for {playerTally.score.pairs}</li>
            <li>flush for {playerTally.score.flush}</li>
            <li>suited jack for {playerTally.score.jack}</li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="flex">
        <div>{renderScore(player)}</div>
        {renderScore(opponent)}
      </div>
    </div>
  );
};

export default HandTally;
